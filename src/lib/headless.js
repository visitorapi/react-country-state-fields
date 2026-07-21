// Headless entry point: the context provider and hooks only, no MUI
// components, so consumers building their own UI (Tailwind, Chakra, plain
// HTML, etc) don't need @mui/material installed at all.
//
// import { VisitorAPIComponents, useCountryField, useStateField, useCityField, useVisitorLocationStatus } from 'react-country-state-fields/headless';
import { VisitorAPIContext, VisitorAPIComponents } from "./components/VisitorAPI";
import { useCountryField } from "./hooks/useCountryField";
import { useStateField } from "./hooks/useStateField";
import { useCityField } from "./hooks/useCityField";
import { useVisitorLocationStatus } from "./hooks/useVisitorLocationStatus";

export {
    VisitorAPIContext,
    VisitorAPIComponents,
    useCountryField,
    useStateField,
    useCityField,
    useVisitorLocationStatus,
};
