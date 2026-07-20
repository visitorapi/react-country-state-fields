import React, { useEffect, useState, useRef, useCallback } from "react";
import { default as api } from "visitorapi";
import { getCountryByCode, getStateByCodeAndCountry, findCityByName } from "../data/locationData";

export const VisitorAPIContext = React.createContext();

export const VisitorAPIComponents = ({
    projectId,
    handleCountryChange,
    handleStateChange,
    handleCityChange,
    defaultCountryCode,
    defaultStateCode,
    defaultCityCode,
    children,
}) => {
    const [countryObj, setCountryObjState] = useState(null);
    const [stateObj, setStateObjState] = useState(null);
    const [cityObj, setCityObjState] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Tracks whether the user has manually changed a field (via a <CountryField>/
    // <StateField>/<CityField> onChange, which goes through the wrapped setters
    // below), so a late-resolving geolocation response doesn't clobber it.
    const userEditedRef = useRef({ country: false, state: false, city: false });

    useEffect(() => {
        if (defaultCountryCode) {
            const c = getCountryByCode(defaultCountryCode);
            setCountryObjState(c);
            if (defaultStateCode) {
                const s = getStateByCodeAndCountry(defaultStateCode, defaultCountryCode);
                setStateObjState(s);
                if (defaultCityCode) {
                    const cities = s && s.cities ? s.cities : [];
                    const matchedCity = findCityByName(cities, defaultCityCode);
                    setCityObjState(matchedCity || { code: defaultCityCode, label: defaultCityCode });
                }
            }
            return;
        }

        if (typeof projectId === 'undefined' || projectId.trim() === '') {
            return;
        }

        setLoading(true);
        setError(null);
        api(projectId)
            .then((data) => {
                if (userEditedRef.current.country) {
                    return;
                }
                const c = getCountryByCode(data.countryCode);
                setCountryObjState(c);

                if (userEditedRef.current.state) {
                    return;
                }
                const s = data.region
                    ? getStateByCodeAndCountry(data.region, data.countryCode) || { code: data.region, label: data.region }
                    : null;
                setStateObjState(s);

                if (userEditedRef.current.city) {
                    return;
                }
                if (data.city) {
                    const cities = s && s.cities ? s.cities : [];
                    const matchedCity = findCityByName(cities, data.city);
                    setCityObjState(matchedCity || { code: data.city, label: data.city });
                }
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [projectId, defaultCountryCode, defaultStateCode, defaultCityCode]);

    useEffect(() => {
        handleCountryChange(countryObj);
    }, [countryObj, handleCountryChange]);

    useEffect(() => {
        handleStateChange(stateObj);
    }, [stateObj, handleStateChange]);

    useEffect(() => {
        if (handleCityChange) {
            handleCityChange(cityObj);
        }
    }, [cityObj, handleCityChange]);

    const setCountryObj = useCallback((value) => {
        userEditedRef.current.country = true;
        setCountryObjState(value);
    }, []);

    const setStateObj = useCallback((value) => {
        userEditedRef.current.state = true;
        setStateObjState(value);
    }, []);

    const setCityObj = useCallback((value) => {
        userEditedRef.current.city = true;
        setCityObjState(value);
    }, []);

    return (
        <VisitorAPIContext.Provider value={{
            countryObj, setCountryObj,
            stateObj, setStateObj,
            cityObj, setCityObj,
            loading, error,
        }}>
            {children}
        </VisitorAPIContext.Provider>
    );
};
