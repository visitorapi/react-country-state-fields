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
});
