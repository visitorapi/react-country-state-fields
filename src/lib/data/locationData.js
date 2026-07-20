import { Country, State, City } from "country-state-city";

/**
 * Normalizes country-state-city's shape ({ isoCode, name, ... }) into this
 * package's existing public shape ({ code, label, ... }) so the swap from
 * the old hand-maintained countries.json is not a breaking change for
 * consumers reading `.code`/`.label` off country/state/city objects.
 */
const mapCountry = (c) => ({
    code: c.isoCode,
    label: c.name,
    phone: c.phonecode,
    flag: c.flag,
});

const mapState = (s) => ({
    code: s.isoCode,
    label: s.name,
});

// Cities in this dataset have no distinct ISO code, so the city name is
// used as both `code` and `label`.
const mapCity = (c) => ({
    code: c.name,
    label: c.name,
});

export const getAllCountries = () => Country.getAllCountries().map(mapCountry);

export const getStatesOfCountry = (countryCode) => {
    if (!countryCode) return [];
    return State.getStatesOfCountry(countryCode).map(mapState);
};

export const getCitiesOfState = (countryCode, stateCode) => {
    if (!countryCode || !stateCode) return [];
    return City.getCitiesOfState(countryCode, stateCode).map(mapCity);
};

export const getCitiesOfCountry = (countryCode) => {
    if (!countryCode) return [];
    return (City.getCitiesOfCountry(countryCode) || []).map(mapCity);
};

/**
 * Returns the mapped country object with its states eagerly attached so
 * <StateField> can cascade without another lookup. For countries with no
 * states (e.g. Singapore, Monaco), cities are attached directly onto the
 * country instead, so <CityField> can still cascade from country alone.
 */
export const getCountryByCode = (isoCode) => {
    if (!isoCode) return null;
    const raw = Country.getCountryByCode(isoCode.toUpperCase());
    if (!raw) return null;
    const country = mapCountry(raw);
    const states = getStatesOfCountry(country.code);
    if (states.length > 0) {
        return { ...country, states };
    }
    return { ...country, cities: getCitiesOfCountry(country.code) };
};

/**
 * Returns the mapped state object with its cities eagerly attached so
 * <CityField> can cascade without another lookup.
 */
export const getStateByCodeAndCountry = (stateCode, countryCode) => {
    if (!stateCode || !countryCode) return null;
    const raw = State.getStateByCodeAndCountry(stateCode.toUpperCase(), countryCode.toUpperCase());
    if (!raw) return null;
    const state = mapState(raw);
    return { ...state, cities: getCitiesOfState(countryCode, state.code) };
};
