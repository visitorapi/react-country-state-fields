import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CityField from "./CityField";
import { getStateByCodeAndCountry } from "../data/locationData";
import { renderWithContext, makeContextValue } from "./testUtils";

describe("CityField", () => {
    test("cascades from the selected state's cities", async () => {
        const california = getStateByCodeAndCountry("CA", "US");
        const setCityObj = jest.fn();
        const user = userEvent.setup();

        renderWithContext(
            <CityField label="City" />,
            makeContextValue({ stateObj: california, setCityObj })
        );

        const input = screen.getByLabelText("City");
        await user.click(input);
        await user.type(input, "Sacramento");
        const option = await screen.findByText("Sacramento");
        await user.click(option);

        expect(setCityObj).toHaveBeenCalledWith(
            expect.objectContaining({ code: "Sacramento", label: "Sacramento" })
        );
    });

    test("falls back to the country's cities when the country has no states", () => {
        const countryWithCities = { code: "ZZ", label: "Testland", cities: [{ code: "Test City", label: "Test City" }] };
        renderWithContext(<CityField label="City" />, makeContextValue({ countryObj: countryWithCities }));
        expect(screen.getByLabelText("City")).toBeInTheDocument();
    });

    test("falls back to a free-text field when no city data is available", () => {
        const setCityObj = jest.fn();
        renderWithContext(<CityField label="City" />, makeContextValue({ setCityObj }));

        const input = screen.getByLabelText("City");
        fireEvent.change(input, { target: { value: "Somewhere" } });
        expect(setCityObj).toHaveBeenCalledWith({ code: "Somewhere", label: "Somewhere" });
    });

    test("freeSolo (default): typing a city not in the list and committing still sets it", async () => {
        const california = getStateByCodeAndCountry("CA", "US");
        const setCityObj = jest.fn();
        const user = userEvent.setup();

        renderWithContext(
            <CityField label="City" />,
            makeContextValue({ stateObj: california, setCityObj })
        );

        const input = screen.getByLabelText("City");
        await user.click(input);
        await user.type(input, "A Tiny Hamlet Not In The Dataset{Enter}");

        expect(setCityObj).toHaveBeenCalledWith({
            code: "A Tiny Hamlet Not In The Dataset",
            label: "A Tiny Hamlet Not In The Dataset",
        });
    });

    test("freeSolo={false}: does not commit a value that isn't in the options list", async () => {
        const california = getStateByCodeAndCountry("CA", "US");
        const setCityObj = jest.fn();
        const user = userEvent.setup();

        renderWithContext(
            <CityField label="City" freeSolo={false} />,
            makeContextValue({ stateObj: california, setCityObj })
        );

        const input = screen.getByLabelText("City");
        await user.click(input);
        await user.type(input, "A Tiny Hamlet Not In The Dataset{Enter}");

        expect(setCityObj).not.toHaveBeenCalled();
    });

    test("a `cities` prop overrides the auto-cascaded list entirely", async () => {
        const california = getStateByCodeAndCountry("CA", "US");
        const setCityObj = jest.fn();
        const user = userEvent.setup();
        const customCities = [
            { code: "Service Area 1", label: "Service Area 1" },
            { code: "Service Area 2", label: "Service Area 2" },
        ];

        renderWithContext(
            <CityField label="City" cities={customCities} />,
            makeContextValue({ stateObj: california, setCityObj })
        );

        const input = screen.getByLabelText("City");
        await user.click(input);
        await user.type(input, "Service Area 1");
        const option = await screen.findByText("Service Area 1");
        await user.click(option);

        expect(setCityObj).toHaveBeenCalledWith(
            expect.objectContaining({ code: "Service Area 1", label: "Service Area 1" })
        );
        // a real city from the auto-cascaded California list should not appear
        expect(screen.queryByText("Sacramento")).not.toBeInTheDocument();
    });
});
