"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _VisitorAPI = require("./VisitorAPI");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * Resolves which city list this field should offer, mirroring <StateField>'s
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
const CityField = _ref => {
  let _ref$label = _ref.label,
    label = _ref$label === void 0 ? "" : _ref$label,
    sx = _ref.sx,
    className = _ref.className,
    variant = _ref.variant,
    fullWidth = _ref.fullWidth,
    size = _ref.size;
  const _useContext = (0, _react.useContext)(_VisitorAPI.VisitorAPIContext),
    countryObj = _useContext.countryObj,
    stateObj = _useContext.stateObj,
    cityObj = _useContext.cityObj,
    setCityObj = _useContext.setCityObj;
  const _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    value = _useState2[0],
    setValue = _useState2[1];
  const cities = resolveCities(countryObj, stateObj);
  (0, _react.useEffect)(() => {
    if (cities && cityObj && cityObj.code) {
      const v = cities.find(obj => obj.code === cityObj.code);
      setValue(typeof v === 'undefined' ? null : v);
    } else if (cityObj && cityObj.code) {
      setValue(cityObj);
    } else {
      setValue(null);
    }
  }, [cities, cityObj]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, cities && cities.length > 0 ? /*#__PURE__*/_react.default.createElement(_material.Autocomplete, {
    value: value,
    options: cities,
    autoHighlight: true,
    sx: sx,
    className: className,
    fullWidth: fullWidth,
    size: size,
    getOptionLabel: option => option.label,
    renderOption: (props, option) => /*#__PURE__*/_react.default.createElement(_material.Box, _extends({
      component: "li"
    }, props), option.label),
    renderInput: params => /*#__PURE__*/_react.default.createElement(_material.TextField, _extends({}, params, {
      label: label,
      variant: variant,
      inputProps: _objectSpread(_objectSpread({}, params.inputProps), {}, {
        autoComplete: 'address-level2'
      })
    })),
    onChange: (event, newValue) => {
      if (newValue) {
        setCityObj(newValue);
      }
    }
  }) : /*#__PURE__*/_react.default.createElement(_material.TextField, {
    label: label,
    sx: sx,
    className: className,
    variant: variant,
    fullWidth: fullWidth,
    size: size,
    inputProps: {
      autoComplete: 'address-level2'
    },
    value: value === null ? "" : value.code,
    onChange: event => {
      setCityObj({
        code: event.target.value,
        label: event.target.value
      });
    }
  }));
};
var _default = exports.default = CityField;