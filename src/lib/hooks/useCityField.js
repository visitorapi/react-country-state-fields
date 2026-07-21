import { useContext, useState, useEffect, useCallback } from "react";
import { findCityByName } from "../data/locationData";
import { VisitorAPIContext } from "../components/VisitorAPI";

/**
 * Resolves which city list this field should offer, mirroring the state
 * cascade: prefer the selected state's cities; for countries with no states
 * at all (e.g. Singapore, Monaco), fall back to the country's own city list.
 */
const resolveCities = (countryObj, stateObj) => {
    if (stateObj && stateObj.cities) {
        return stateObj.cities;
    }
    if (countryObj && !countryObj.states && countryObj.cities) {
        return countryObj.cities;
    }
    return null;
};

/**
 * Headless hook for a city field, cascading from the selected state (or
 * country, for countries with no state-level data). `options` is `null`
 * when there's no city data at all for the current selection.
 *
 * @param {object} [config]
 * @param {Array<{code: string, label: string}>} [config.cities] - overrides
 *   the auto-cascaded country-state-city list entirely, for a specific
 *   known set of valid cities (delivery zones, branch locations, etc).
 * @param {boolean} [config.freeSolo=true] - when there's no exact match for
 *   the current value in `options`, still return it (rather than `null`) so
 *   a value typed outside the suggested list isn't discarded.
 *
 * onChange accepts either a city name string or an option object. City
 * names have no canonical case the way ISO country/state codes do, so
 * string input is matched case-insensitively against `options` before
 * falling back to the raw typed value.
 */
export const useCityField = ({ cities: citiesProp, freeSolo = true } = {}) => {
    const { countryObj, stateObj, cityObj, setCityObj } = useContext(VisitorAPIContext);
    const [value, setValue] = useState(null);
    const options = Array.isArray(citiesProp) ? citiesProp : resolveCities(countryObj, stateObj);

    useEffect(() => {
        if (options && cityObj && cityObj.code) {
            const v = findCityByName(options, cityObj.code);
            setValue(v || (freeSolo ? cityObj : null));
        } else if (cityObj && cityObj.code) {
            setValue(cityObj);
        } else {
            setValue(null);
        }
    }, [options, cityObj, freeSolo]);

    const onChange = useCallback((input) => {
        if (input === null || input === undefined) {
            return;
        }
        if (typeof input === 'string') {
            const matched = options ? findCityByName(options, input) : null;
            setCityObj(matched || { code: input, label: input });
        } else {
            setCityObj(input);
        }
    }, [options, setCityObj]);

    return { value, options, freeSolo, onChange };
};
