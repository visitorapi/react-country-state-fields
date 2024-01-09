"use strict";

require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _countries = _interopRequireDefault(require("./countries.json"));
var _VisitorAPI = require("./VisitorAPI");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const CountryField = _ref => {
  let {
    label = ""
  } = _ref;
  const countries = _countries.default.countries;
  const {
    countryObj,
    setCountryObj,
    setStateObj
  } = (0, _react.useContext)(_VisitorAPI.VisitorAPIContext);
  const [value, setValue] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    if (countryObj && countryObj.code) {
      const v = countries.find(obj => {
        return obj.code === countryObj.code;
      });
      if (typeof v === 'undefined') {
        setValue(null);
      } else {
        setValue(v);
      }
    } else {
      setValue(null);
    }
  }, [countryObj, countries]);
  return /*#__PURE__*/_react.default.createElement(_material.Autocomplete, {
    value: value,
    options: countries,
    autoHighlight: true,
    getOptionLabel: option => option.label,
    renderOption: (props, option) => /*#__PURE__*/_react.default.createElement(_material.Box, _extends({
      component: "li",
      sx: {
        '& > img': {
          mr: 2,
          flexShrink: 0
        }
      }
    }, props), /*#__PURE__*/_react.default.createElement("img", {
      loading: "lazy",
      width: "20",
      src: "https://flagcdn.com/w20/".concat(option.code.toLowerCase(), ".png"),
      srcSet: "https://flagcdn.com/w40/".concat(option.code.toLowerCase(), ".png 2x"),
      alt: ""
    }), option.label),
    renderInput: params => /*#__PURE__*/_react.default.createElement(_material.TextField, _extends({}, params, {
      label: label,
      inputProps: _objectSpread(_objectSpread({}, params.inputProps), {}, {
        autoComplete: 'country'
      })
    })),
    onChange: (event, newValue) => {
      if (newValue) {
        setCountryObj(newValue);
        setStateObj(null);
      }
    }
  });
};
var _default = exports.default = CountryField;