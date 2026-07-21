import { renderHook, act, waitFor } from "@testing-library/react";
import { useCityField } from "./useCityField";
import { getStateByCodeAndCountry } from "../data/locationData";
import { makeContextValue, makeContextWrapper } from "../components/testUtils";

describe("useCityField", () => {
    test("options cascades from the selected state's cities", () => {
        const california = getStateByCodeAndCountry("CA", "US");
        const { result } = renderHook(() => useCityField(), {
            wrapper: makeContextWrapper(makeContextValue({ stateObj: california })),
        });
        expect(result.current.options.length).toBeGreaterThan(0);
    });

    test("a `cities` config option overrides the auto-cascaded list", () => {
        const california = getStateByCodeAndCountry("CA", "US");
        const customCities = [{ code: "Service Area 1", label: "Service Area 1" }];
        const { result } = renderHook(() => useCityField({ cities: customCities }), {
            wrapper: makeContextWrapper(makeContextValue({ stateObj: california })),
        });
        expect(result.current.options).toBe(customCities);
    });

    test("onChange with a string case-insensitively matches an existing option", () => {
        const california = getStateByCodeAndCountry("CA", "US");
        const setCityObj = jest.fn();
        const { result } = renderHook(() => useCityField(), {
            wrapper: makeContextWrapper(makeContextValue({ stateObj: california, setCityObj })),
        });

        act(() => {
            result.current.onChange("sacramento");
        });

        expect(setCityObj).toHaveBeenCalledWith(expect.objectContaining({ code: "Sacramento", label: "Sacramento" }));
    });

    test("onChange with a string not in options falls back to the raw value", () => {
        const california = getStateByCodeAndCountry("CA", "US");
        const setCityObj = jest.fn();
        const { result } = renderHook(() => useCityField(), {
            wrapper: makeContextWrapper(makeContextValue({ stateObj: california, setCityObj })),
        });

        act(() => {
            result.current.onChange("A Tiny Hamlet Not In The Dataset");
        });

        expect(setCityObj).toHaveBeenCalledWith({
            code: "A Tiny Hamlet Not In The Dataset",
            label: "A Tiny Hamlet Not In The Dataset",
        });
    });

    test("onChange with an option object is set directly", () => {
        const setCityObj = jest.fn();
        const { result } = renderHook(() => useCityField(), {
            wrapper: makeContextWrapper(makeContextValue({ setCityObj })),
        });

        act(() => {
            result.current.onChange({ code: "Sydney", label: "Sydney" });
        });

        expect(setCityObj).toHaveBeenCalledWith({ code: "Sydney", label: "Sydney" });
    });

    test("onChange ignores null/undefined", () => {
        const setCityObj = jest.fn();
        const { result } = renderHook(() => useCityField(), {
            wrapper: makeContextWrapper(makeContextValue({ setCityObj })),
        });

        act(() => {
            result.current.onChange(null);
        });

        expect(setCityObj).not.toHaveBeenCalled();
    });

    test("value syncs from context cityObj, case-insensitively matched against options", async () => {
        const california = getStateByCodeAndCountry("CA", "US");
        const { result } = renderHook(() => useCityField(), {
            wrapper: makeContextWrapper(makeContextValue({ stateObj: california, cityObj: { code: "sacramento", label: "sacramento" } })),
        });

        // lowercase "sacramento" should resolve to the dataset's canonical "Sacramento"
        await waitFor(() => expect(result.current.value).toEqual(expect.objectContaining({ code: "Sacramento" })));
    });

    test("value falls back to the raw cityObj (freeSolo default) when there's no match at all", async () => {
        const california = getStateByCodeAndCountry("CA", "US");
        const { result } = renderHook(() => useCityField(), {
            wrapper: makeContextWrapper(makeContextValue({ stateObj: california, cityObj: { code: "sydney", label: "sydney" } })),
        });

        // "sydney" isn't a California city at all, freeSolo default keeps it rather than discarding
        await waitFor(() => expect(result.current.value).toEqual({ code: "sydney", label: "sydney" }));
    });

    test("freeSolo={false} returns null for a value with no match, instead of the raw value", async () => {
        const california = getStateByCodeAndCountry("CA", "US");
        const { result } = renderHook(() => useCityField({ freeSolo: false }), {
            wrapper: makeContextWrapper(makeContextValue({ stateObj: california, cityObj: { code: "Nowhereville", label: "Nowhereville" } })),
        });

        await waitFor(() => expect(result.current.value).toBeNull());
    });
});
