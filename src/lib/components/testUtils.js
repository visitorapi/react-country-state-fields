import React from "react";
import { render } from "@testing-library/react";
import { VisitorAPIContext } from "./VisitorAPI";

export const renderWithContext = (ui, contextValue) => {
    return render(
        <VisitorAPIContext.Provider value={contextValue}>
            {ui}
        </VisitorAPIContext.Provider>
    );
};

export const makeContextValue = (overrides = {}) => ({
    countryObj: null,
    setCountryObj: jest.fn(),
    stateObj: null,
    setStateObj: jest.fn(),
    cityObj: null,
    setCityObj: jest.fn(),
    loading: false,
    error: null,
    ...overrides,
});

// For renderHook(fn, { wrapper: makeContextWrapper(contextValue) })
export const makeContextWrapper = (contextValue) => ({ children }) => (
    <VisitorAPIContext.Provider value={contextValue}>
        {children}
    </VisitorAPIContext.Provider>
);
