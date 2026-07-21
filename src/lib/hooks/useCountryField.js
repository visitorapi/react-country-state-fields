import { useContext, useState, useEffect, useCallback } from "react";
import { getAllCountries, getCountryByCode } from "../data/locationData";
import { VisitorAPIContext } from "../components/VisitorAPI";

const countries = getAllCountries();

/**
 * Headless hook for a country field: no rendering, just the resolved value,
 * the full country option list, and a normalized onChange. Build any UI on
 * top of this (a plain <select>, a custom combobox, etc), or use the
 * pre-built MUI <CountryField> if that's already a fit.
 *
 * onChange accepts either a country code string or an option object
 * ({ code, label, ... }), so it works the same whether it's wired to a
 * plain <select>'s onChange or an Autocomplete's onChange.
 */
export const useCountryField = () => {
    const { countryObj, setCountryObj, setStateObj, setCityObj } = useContext(VisitorAPIContext);
    const [value, setValue] = useState(null);

    useEffect(() => {
        if (countryObj && countryObj.code) {
            const v = countries.find((obj) => obj.code === countryObj.code);
            setValue(typeof v === 'undefined' ? null : v);
        } else {
            setValue(null);
        }
    }, [countryObj]);

    const onChange = useCallback((input) => {
        if (input === null || input === undefined) {
            return;
        }
        const code = typeof input === 'string' ? input : input.code;
        setCountryObj(getCountryByCode(code));
        setStateObj(null);
        if (setCityObj) {
            setCityObj(null);
        }
    }, [setCountryObj, setStateObj, setCityObj]);

    return { value, options: countries, onChange };
};
