import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StateField from "./StateField";
import { getCountryByCode } from "../data/locationData";
import { renderWithContext, makeContextValue } from "./testUtils";

describe("StateField", () => {
    test("renders an Autocomplete when the country has states", async () => {
        const us = getCountryByCode("US");
        renderWithContext(<StateField label="State" />, makeContextValue({ countryObj: us }));
        expect(screen.getByLabelText("State")).toBeInTheDocument();
    });

    test("selecting a state enriches it with cities and resets city", async () => {
        const us = getCountryByCode("US");
        const setStateObj = jest.fn();
        const setCityObj = jest.fn();
        const user = userEvent.setup();

        renderWithContext(
            <StateField label="State" />,
            makeContextValue({ countryObj: us, setStateObj, setCityObj })
        );

        const input = screen.getByLabelText("State");
        await user.click(input);
        await user.type(input, "California");
        const option = await screen.findByText("California");
        await user.click(option);

        expect(setStateObj).toHaveBeenCalledWith(
            expect.objectContaining({ code: "CA", label: "California", cities: expect.any(Array) })
        );
        expect(setCityObj).toHaveBeenCalledWith(null);
    });

    test("falls back to a free-text field when the country has no states", () => {
        const setStateObj = jest.fn();
        renderWithContext(
            <StateField label="State" />,
            makeContextValue({ countryObj: { code: "AW", label: "Aruba" }, setStateObj })
        );

        const input = screen.getByLabelText("State");
        fireEvent.change(input, { target: { value: "Oranjestad" } });
        expect(setStateObj).toHaveBeenCalledWith({ code: "Oranjestad", label: "Oranjestad" });
    });

    test("falls back to free text when there is no country selected yet", () => {
        renderWithContext(<StateField label="State" />, makeContextValue());
        expect(screen.getByLabelText("State")).toBeInTheDocument();
    });
});
