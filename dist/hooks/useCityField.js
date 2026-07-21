"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCityField = void 0;
var _react = require("react");
var _locationData = require("../data/locationData");
var _VisitorAPI = require("../components/VisitorAPI");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
const useCityField = exports.useCityField = function useCityField() {
  let _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    citiesProp = _ref.cities,
    _ref$freeSolo = _ref.freeSolo,
    freeSolo = _ref$freeSolo === void 0 ? true : _ref$freeSolo;
  const _useContext = (0, _react.useContext)(_VisitorAPI.VisitorAPIContext),
    countryObj = _useContext.countryObj,
    stateObj = _useContext.stateObj,
    cityObj = _useContext.cityObj,
    setCityObj = _useContext.setCityObj;
  const _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    value = _useState2[0],
    setValue = _useState2[1];
  const options = Array.isArray(citiesProp) ? citiesProp : resolveCities(countryObj, stateObj);
  (0, _react.useEffect)(() => {
    if (options && cityObj && cityObj.code) {
      const v = (0, _locationData.findCityByName)(options, cityObj.code);
      setValue(v || (freeSolo ? cityObj : null));
    } else if (cityObj && cityObj.code) {
      setValue(cityObj);
    } else {
      setValue(null);
    }
  }, [options, cityObj, freeSolo]);
  const onChange = (0, _react.useCallback)(input => {
    if (input === null || input === undefined) {
      return;
    }
    if (typeof input === 'string') {
      const matched = options ? (0, _locationData.findCityByName)(options, input) : null;
      setCityObj(matched || {
        code: input,
        label: input
      });
    } else {
      setCityObj(input);
    }
  }, [options, setCityObj]);
  return {
    value,
    options,
    freeSolo,
    onChange
  };
};