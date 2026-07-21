import {
    getAllCountries,
    getCountryByCode,
    getStateByCodeAndCountry,
    getStatesOfCountry,
    getCitiesOfState,
    getCitiesOfCountry,
} from './locationData';

describe('locationData', () => {
    test('getAllCountries returns 200+ countries with code/label shape', () => {
        const countries = getAllCountries();
        expect(countries.length).toBeGreaterThan(200);
        expect(countries[0]).toHaveProperty('code');
        expect(countries[0]).toHaveProperty('label');
    });

    test('getCountryByCode attaches states for countries that have them', () => {
        const us = getCountryByCode('US');
        expect(us.code).toBe('US');
        expect(us.label).toBe('United States');
        expect(us.states.length).toBeGreaterThan(40);
        expect(us.states[0]).toHaveProperty('code');
        expect(us.states[0]).toHaveProperty('label');
    });

    test('getCountryByCode is case-insensitive', () => {
        expect(getCountryByCode('us').code).toBe('US');
    });

    test('getCountryByCode attaches cities directly for countries with no states', () => {
        const aw = getCountryByCode('AW'); // Aruba: no states in this dataset
        expect(aw.states).toBeUndefined();
        expect(Array.isArray(aw.cities)).toBe(true);
    });

    test('getCountryByCode returns null for unknown code', () => {
        expect(getCountryByCode('ZZ')).toBeNull();
    });

    test('getCountryByCode returns null for empty input', () => {
        expect(getCountryByCode()).toBeNull();
        expect(getCountryByCode('')).toBeNull();
    });

    test('getStateByCodeAndCountry attaches cities', () => {
        const ca = getStateByCodeAndCountry('CA', 'US');
        expect(ca.code).toBe('CA');
        expect(ca.label).toBe('California');
        expect(Array.isArray(ca.cities)).toBe(true);
        expect(ca.cities.length).toBeGreaterThan(0);
    });

    test('getStateByCodeAndCountry returns null for unknown state', () => {
        expect(getStateByCodeAndCountry('ZZ', 'US')).toBeNull();
    });

    test('getStatesOfCountry / getCitiesOfState / getCitiesOfCountry handle missing args gracefully', () => {
        expect(getStatesOfCountry()).toEqual([]);
        expect(getCitiesOfState()).toEqual([]);
        expect(getCitiesOfState('US')).toEqual([]);
        expect(getCitiesOfCountry()).toEqual([]);
    });
});
