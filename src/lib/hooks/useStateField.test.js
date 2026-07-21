import { renderHook, act, waitFor } from "@testing-library/react";
import { useStateField } from "./useStateField";
import { getCountryByCode } from "../data/locationData";
import { makeContextValue, makeContextWrapper } from "../components/testUtils";

describe("useStateField", () => {
    test("options is null when the country has no state-level data", () => {
        const { result } = renderHook(() => useStateField(), {
            wrapper: makeContextWrapper(makeContextValue({ countryObj: { code: "AW", label: "Aruba" } })),
        });
        expect(result.current.options).toBeNull();
    });

    test("options is the country's states array when present", () => {
        const us = getCountryByCode("US");
        const { result } = renderHook(() => useStateField(), {
            wrapper: makeContextWrapper(makeContextValue({ countryObj: us })),
        });
        expect(result.current.options.length).toBeGreaterThan(40);
    });

    test("onChange with a code string enriches with cities and resets city", () => {
        const us = getCountryByCode("US");
        const setStateObj = jest.fn();
        const setCityObj = jest.fn();
        const { result } = renderHook(() => useStateField(), {
            wrapper: makeContextWrapper(makeContextValue({ countryObj: us, setStateObj, setCityObj })),
        });

        act(() => {
            result.current.onChange("CA");
        });

        expect(setStateObj).toHaveBeenCalledWith(
            expect.objectContaining({ code: "CA", label: "California", cities: expect.any(Array) })
        );
        expect(setCityObj).toHaveBeenCalledWith(null);
    });

    test("onChange falls back to the raw code when there's no country context", () => {
        const setStateObj = jest.fn();
        const { result } = renderHook(() => useStateField(), {
            wrapper: makeContextWrapper(makeContextValue({ setStateObj })),
        });

        act(() => {
            result.current.onChange("Oranjestad");
        });

        expect(setStateObj).toHaveBeenCalledWith({ code: "Oranjestad", label: "Oranjestad" });
    });

    test("onChange ignores null/undefined", () => {
        const setStateObj = jest.fn();
        const { result } = renderHook(() => useStateField(), {
            wrapper: makeContextWrapper(makeContextValue({ setStateObj })),
        });

        act(() => {
            result.current.onChange(undefined);
        });

        expect(setStateObj).not.toHaveBeenCalled();
    });

    test("value syncs from context stateObj, matched against options by code", async () => {
        const us = getCountryByCode("US");
        const { result } = renderHook(() => useStateField(), {
            wrapper: makeContextWrapper(makeContextValue({ countryObj: us, stateObj: { code: "CA", label: "California" } })),
        });

        await waitFor(() => expect(result.current.value).toEqual(expect.objectContaining({ code: "CA" })));
    });
});
