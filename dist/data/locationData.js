"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStatesOfCountry = exports.getStateByCodeAndCountry = exports.getCountryByCode = exports.getCitiesOfState = exports.getCitiesOfCountry = exports.getAllCountries = void 0;
var _countryStateCity = require("country-state-city");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Normalizes country-state-city's shape ({ isoCode, name, ... }) into this
 * package's existing public shape ({ code, label, ... }) so the swap from
 * the old hand-maintained countries.json is not a breaking change for
 * consumers reading `.code`/`.label` off country/state/city objects.
 */
const mapCountry = c => ({
  code: c.isoCode,
  label: c.name,
  phone: c.phonecode,
  flag: c.flag
});
const mapState = s => ({
  code: s.isoCode,
  label: s.name
});

// Cities in this dataset have no distinct ISO code, so the city name is
// used as both `code` and `label`.
const mapCity = c => ({
  code: c.name,
  label: c.name
});
const getAllCountries = () => _countryStateCity.Country.getAllCountries().map(mapCountry);
exports.getAllCountries = getAllCountries;
const getStatesOfCountry = countryCode => {
  if (!countryCode) return [];
  return _countryStateCity.State.getStatesOfCountry(countryCode).map(mapState);
};
exports.getStatesOfCountry = getStatesOfCountry;
const getCitiesOfState = (countryCode, stateCode) => {
  if (!countryCode || !stateCode) return [];
  return _countryStateCity.City.getCitiesOfState(countryCode, stateCode).map(mapCity);
};
exports.getCitiesOfState = getCitiesOfState;
const getCitiesOfCountry = countryCode => {
  if (!countryCode) return [];
  return (_countryStateCity.City.getCitiesOfCountry(countryCode) || []).map(mapCity);
};

/**
 * Returns the mapped country object with its states eagerly attached so
 * <StateField> can cascade without another lookup. For countries with no
 * states (e.g. Singapore, Monaco), cities are attached directly onto the
 * country instead, so <CityField> can still cascade from country alone.
 */
exports.getCitiesOfCountry = getCitiesOfCountry;
const getCountryByCode = isoCode => {
  if (!isoCode) return null;
  const raw = _countryStateCity.Country.getCountryByCode(isoCode.toUpperCase());
  if (!raw) return null;
  const country = mapCountry(raw);
  const states = getStatesOfCountry(country.code);
  if (states.length > 0) {
    return _objectSpread(_objectSpread({}, country), {}, {
      states
    });
  }
  return _objectSpread(_objectSpread({}, country), {}, {
    cities: getCitiesOfCountry(country.code)
  });
};

/**
 * Returns the mapped state object with its cities eagerly attached so
 * <CityField> can cascade without another lookup.
 */
exports.getCountryByCode = getCountryByCode;
const getStateByCodeAndCountry = (stateCode, countryCode) => {
  if (!stateCode || !countryCode) return null;
  const raw = _countryStateCity.State.getStateByCodeAndCountry(stateCode.toUpperCase(), countryCode.toUpperCase());
  if (!raw) return null;
  const state = mapState(raw);
  return _objectSpread(_objectSpread({}, state), {}, {
    cities: getCitiesOfState(countryCode, state.code)
  });
};
exports.getStateByCodeAndCountry = getStateByCodeAndCountry;