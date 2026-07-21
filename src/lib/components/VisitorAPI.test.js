import React, { useContext } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VisitorAPIComponents, VisitorAPIContext } from "./VisitorAPI";
import { getStateByCodeAndCountry } from "../data/locationData";

jest.mock("visitorapi", () => jest.fn());
// eslint-disable-next-line import/first
import api from "visitorapi";

const ContextReader = () => {
    const ctx = useContext(VisitorAPIContext);
    return (
        <div>
            <span data-testid="loading">{String(ctx.loading)}</span>
            <span data-testid="error">{ctx.error ? ctx.error.message : ""}</span>
            <button onClick={() => ctx.setCountryObj({ code: "MANUAL", label: "Manual Country" })}>
                set-country
            </button>
        </div>
    );
};

const noop = () => {};

describe("VisitorAPIComponents", () => {
    beforeEach(() => {
        api.mockReset();
    });

    test("resolves default country/state codes synchronously, no API call", () => {
        const handleCountryChange = jest.fn();
        const handleStateChange = jest.fn();
        render(
            <VisitorAPIComponents
                projectId=""
                defaultCountryCode="US"
                defaultStateCode="CA"
                handleCountryChange={handleCountryChange}
                handleStateChange={handleStateChange}
            >
                <ContextReader />
            </VisitorAPIComponents>
        );

        expect(api).not.toHaveBeenCalled();
        expect(handleCountryChange).toHaveBeenCalledWith(expect.objectContaining({ code: "US" }));
        expect(handleStateChange).toHaveBeenCalledWith(expect.objectContaining({ code: "CA" }));
    });

    test("resolves defaultCityCode against the resolved state's city list", () => {
        const california = getStateByCodeAndCountry("CA", "US");
        const realCity = california.cities[0];
        const handleCityChange = jest.fn();

        render(
            <VisitorAPIComponents
                projectId=""
                defaultCountryCode="US"
                defaultStateCode="CA"
                defaultCityCode={realCity.code}
                handleCountryChange={noop}
                handleStateChange={noop}
                handleCityChange={handleCityChange}
            >
                <ContextReader />
            </VisitorAPIComponents>
        );

        expect(handleCityChange).toHaveBeenCalledWith(expect.objectContaining({ code: realCity.code }));
    });

    test("calls the API, sets loading while in flight, and populates country/state/city on success", async () => {
        let resolveApi;
        api.mockReturnValue(new Promise((resolve) => { resolveApi = resolve; }));

        const handleCountryChange = jest.fn();
        const handleStateChange = jest.fn();
        const handleCityChange = jest.fn();

        render(
            <VisitorAPIComponents
                projectId="test-project"
                handleCountryChange={handleCountryChange}
                handleStateChange={handleStateChange}
                handleCityChange={handleCityChange}
            >
                <ContextReader />
            </VisitorAPIComponents>
        );

        expect(api).toHaveBeenCalledWith("test-project");
        expect(screen.getByTestId("loading").textContent).toBe("true");

        resolveApi({ countryCode: "US", region: "CA", city: "Los Angeles" });

        await waitFor(() => expect(screen.getByTestId("loading").textContent).toBe("false"));
        expect(handleCountryChange).toHaveBeenCalledWith(expect.objectContaining({ code: "US" }));
        expect(handleStateChange).toHaveBeenCalledWith(expect.objectContaining({ code: "CA" }));
        expect(handleCityChange).toHaveBeenCalledWith(expect.objectContaining({ code: "Los Angeles" }));
    });

    test("exposes the error on the context when the API call fails, does not throw", async () => {
        api.mockRejectedValue(new Error("network down"));

        render(
            <VisitorAPIComponents
                projectId="test-project"
                handleCountryChange={noop}
                handleStateChange={noop}
            >
                <ContextReader />
            </VisitorAPIComponents>
        );

        await waitFor(() => expect(screen.getByTestId("error").textContent).toBe("network down"));
        expect(screen.getByTestId("loading").textContent).toBe("false");
    });

    test("does not overwrite a field the user already edited when the API response resolves late", async () => {
        let resolveApi;
        api.mockReturnValue(new Promise((resolve) => { resolveApi = resolve; }));

        const handleCountryChange = jest.fn();
        const user = userEvent.setup();

        render(
            <VisitorAPIComponents
                projectId="test-project"
                handleCountryChange={handleCountryChange}
                handleStateChange={noop}
            >
                <ContextReader />
            </VisitorAPIComponents>
        );

        await user.click(screen.getByText("set-country"));
        expect(handleCountryChange).toHaveBeenLastCalledWith(expect.objectContaining({ code: "MANUAL" }));

        resolveApi({ countryCode: "US", region: "CA", city: "Los Angeles" });
        await waitFor(() => expect(screen.getByTestId("loading").textContent).toBe("false"));

        // the late-resolving API response must not have clobbered the manual edit
        expect(handleCountryChange).toHaveBeenLastCalledWith(expect.objectContaining({ code: "MANUAL" }));
        expect(handleCountryChange).not.toHaveBeenCalledWith(expect.objectContaining({ code: "US" }));
    });
});
