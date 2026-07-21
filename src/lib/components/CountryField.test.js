import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CountryField from "./CountryField";
import { renderWithContext, makeContextValue } from "./testUtils";

describe("CountryField", () => {
    test("renders with the given label", () => {
        renderWithContext(<CountryField label="Country" />, makeContextValue());
        expect(screen.getByLabelText("Country")).toBeInTheDocument();
    });

    test("selecting a country enriches it with states and resets state/city", async () => {
        const setCountryObj = jest.fn();
        const setStateObj = jest.fn();
        const setCityObj = jest.fn();
        const user = userEvent.setup();

        renderWithContext(
            <CountryField label="Country" />,
            makeContextValue({ setCountryObj, setStateObj, setCityObj })
        );

        const input = screen.getByLabelText("Country");
        await user.click(input);
        await user.type(input, "United States");
        const option = await screen.findByText("United States");
        await user.click(option);

        expect(setCountryObj).toHaveBeenCalledWith(
            expect.objectContaining({ code: "US", label: "United States", states: expect.any(Array) })
        );
        expect(setStateObj).toHaveBeenCalledWith(null);
        expect(setCityObj).toHaveBeenCalledWith(null);
    });

    test("does not throw when setCityObj is not provided by the context (backward compat)", async () => {
        const setCountryObj = jest.fn();
        const setStateObj = jest.fn();
        const user = userEvent.setup();

        renderWithContext(
            <CountryField label="Country" />,
            { countryObj: null, setCountryObj, setStateObj }
        );

        const input = screen.getByLabelText("Country");
        await user.click(input);
        await user.type(input, "Canada");
        const option = await screen.findByText("Canada");
        await user.click(option);

        expect(setCountryObj).toHaveBeenCalled();
    });

    test("showFlag=false renders options without a flag image", async () => {
        const user = userEvent.setup();
        renderWithContext(<CountryField label="Country" showFlag={false} />, makeContextValue());

        const input = screen.getByLabelText("Country");
        await user.click(input);
        await user.type(input, "Australia");
        const option = await screen.findByRole("option", { name: "Australia" });
        expect(option.querySelector("img")).toBeNull();
    });
});
