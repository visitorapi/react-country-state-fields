"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCountryField = void 0;
var _react = require("react");
var _locationData = require("../data/locationData");
var _VisitorAPI = require("../components/VisitorAPI");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
const countries = (0, _locationData.getAllCountries)();

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
const useCountryField = () => {
  const _useContext = (0, _react.useContext)(_VisitorAPI.VisitorAPIContext),
    countryObj = _useContext.countryObj,
    setCountryObj = _useContext.setCountryObj,
    setStateObj = _useContext.setStateObj,
    setCityObj = _useContext.setCityObj;
  const _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    value = _useState2[0],
    setValue = _useState2[1];
  (0, _react.useEffect)(() => {
    if (countryObj && countryObj.code) {
      const v = countries.find(obj => obj.code === countryObj.code);
      setValue(typeof v === 'undefined' ? null : v);
    } else {
      setValue(null);
    }
  }, [countryObj]);
  const onChange = (0, _react.useCallback)(input => {
    if (input === null || input === undefined) {
      return;
    }
    const code = typeof input === 'string' ? input : input.code;
    setCountryObj((0, _locationData.getCountryByCode)(code));
    setStateObj(null);
    if (setCityObj) {
      setCityObj(null);
    }
  }, [setCountryObj, setStateObj, setCityObj]);
  return {
    value,
    options: countries,
    onChange
  };
};
exports.useCountryField = useCountryField;