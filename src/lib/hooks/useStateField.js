import { useContext, useState, useEffect, useCallback } from "react";
import { getStateByCodeAndCountry } from "../data/locationData";
import { VisitorAPIContext } from "../components/VisitorAPI";

/**
 * Headless hook for a state field, cascading from the currently selected
 * country. `options` is `null` when the country has no state-level data,
 * consumers should render a free-text input in that case (see `<StateField>`
 * for the reference implementation).
 *
 * onChange accepts either a state code string or an option object.
 */
export const useStateField = () => {
    const { countryObj, stateObj, setStateObj, setCityObj } = useContext(VisitorAPIContext);
    const [value, setValue] = useState(null);
    const options = (countryObj && countryObj.states) ? countryObj.states : null;

    useEffect(() => {
        if (countryObj && countryObj.states && stateObj && stateObj.code) {
            const v = countryObj.states.find((obj) => obj.code === stateObj.code);
            setValue(typeof v === 'undefined' ? null : v);
        } else if (stateObj && stateObj.code) {
            setValue(stateObj);
        } else {
            setValue(null);
        }
    }, [countryObj, stateObj]);

    const onChange = useCallback((input) => {
        if (input === null || input === undefined) {
            return;
        }
        const code = typeof input === 'string' ? input : input.code;
        const enriched = (options && countryObj)
            ? (getStateByCodeAndCountry(code, countryObj.code) || { code, label: code })
            : { code, label: code };
        setStateObj(enriched);
        if (setCityObj) {
            setCityObj(null);
        }
    }, [countryObj, options, setStateObj, setCityObj]);

    return { value, options, onChange };
};
