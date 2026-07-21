import { renderHook } from "@testing-library/react";
import { useVisitorLocationStatus } from "./useVisitorLocationStatus";
import { makeContextValue, makeContextWrapper } from "../components/testUtils";

describe("useVisitorLocationStatus", () => {
    test("returns loading/error from context", () => {
        const { result } = renderHook(() => useVisitorLocationStatus(), {
            wrapper: makeContextWrapper(makeContextValue({ loading: true, error: null })),
        });
        expect(result.current).toEqual({ loading: true, error: null });
    });

    test("returns an error when the context has one", () => {
        const err = new Error("network down");
        const { result } = renderHook(() => useVisitorLocationStatus(), {
            wrapper: makeContextWrapper(makeContextValue({ loading: false, error: err })),
        });
        expect(result.current).toEqual({ loading: false, error: err });
    });
});
