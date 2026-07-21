import { renderHook, act, waitFor } from "@testing-library/react";
import { useCountryField } from "./useCountryField";
import { makeContextValue, makeContextWrapper } from "../components/testUtils";

describe("useCountryField", () => {
    test("returns the full country options list", () => {
        const { result } = renderHook(() => useCountryField(), {
            wrapper: makeContextWrapper(makeContextValue()),
        });
        expect(result.current.options.length).toBeGreaterThan(200);
        expect(result.current.value).toBeNull();
    });

    test("onChange with a code string enriches and sets the country, resetting state/city", async () => {
        const setCountryObj = jest.fn();
        const setStateObj = jest.fn();
        const setCityObj = jest.fn();
        const { result } = renderHook(() => useCountryField(), {
            wrapper: makeContextWrapper(makeContextValue({ setCountryObj, setStateObj, setCityObj })),
        });

        act(() => {
            result.current.onChange("US");
        });

        expect(setCountryObj).toHaveBeenCalledWith(expect.objectContaining({ code: "US", states: expect.any(Array) }));
        expect(setStateObj).toHaveBeenCalledWith(null);
        expect(setCityObj).toHaveBeenCalledWith(null);
    });

    test("onChange with an option object works the same as a code string", () => {
        const setCountryObj = jest.fn();
        const { result } = renderHook(() => useCountryField(), {
            wrapper: makeContextWrapper(makeContextValue({ setCountryObj })),
        });

        act(() => {
            result.current.onChange({ code: "AU", label: "Australia" });
        });

        expect(setCountryObj).toHaveBeenCalledWith(expect.objectContaining({ code: "AU" }));
    });

    test("onChange ignores null/undefined (e.g. an Autocomplete clear)", () => {
        const setCountryObj = jest.fn();
        const { result } = renderHook(() => useCountryField(), {
            wrapper: makeContextWrapper(makeContextValue({ setCountryObj })),
        });

        act(() => {
            result.current.onChange(null);
        });

        expect(setCountryObj).not.toHaveBeenCalled();
    });

    test("value syncs from context countryObj", async () => {
        const { result } = renderHook(() => useCountryField(), {
            wrapper: makeContextWrapper(makeContextValue({ countryObj: { code: "US", label: "United States" } })),
        });

        await waitFor(() => expect(result.current.value).toEqual(expect.objectContaining({ code: "US" })));
    });
});
