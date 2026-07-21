"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _material = require("@mui/material");
var _useCountryField2 = require("../hooks/useCountryField");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const defaultRenderFlag = option => /*#__PURE__*/_react.default.createElement("img", {
  loading: "lazy",
  width: "20",
  src: "https://flagcdn.com/w20/".concat(option.code.toLowerCase(), ".png"),
  srcSet: "https://flagcdn.com/w40/".concat(option.code.toLowerCase(), ".png 2x"),
  alt: ""
});
const CountryField = _ref => {
  let _ref$label = _ref.label,
    label = _ref$label === void 0 ? "" : _ref$label,
    sx = _ref.sx,
    className = _ref.className,
    variant = _ref.variant,
    fullWidth = _ref.fullWidth,
    size = _ref.size,
    _ref$showFlag = _ref.showFlag,
    showFlag = _ref$showFlag === void 0 ? true : _ref$showFlag,
    renderFlag = _ref.renderFlag;
  const _useCountryField = (0, _useCountryField2.useCountryField)(),
    value = _useCountryField.value,
    options = _useCountryField.options,
    _onChange = _useCountryField.onChange;
  return /*#__PURE__*/_react.default.createElement(_material.Autocomplete, {
    value: value,
    options: options,
    autoHighlight: true,
    sx: sx,
    className: className,
    fullWidth: fullWidth,
    size: size,
    getOptionLabel: option => option.label,
    isOptionEqualToValue: (option, val) => option.code === val.code,
    renderOption: (props, option) => /*#__PURE__*/_react.default.createElement(_material.Box, _extends({
      component: "li",
      sx: showFlag ? {
        '& > img': {
          mr: 2,
          flexShrink: 0
        }
      } : undefined
    }, props), showFlag && (renderFlag ? renderFlag(option) : defaultRenderFlag(option)), option.label),
    renderInput: params => /*#__PURE__*/_react.default.createElement(_material.TextField, _extends({}, params, {
      label: label,
      variant: variant,
      inputProps: _objectSpread(_objectSpread({}, params.inputProps), {}, {
        autoComplete: 'country'
      })
    })),
    onChange: (event, newValue) => {
      _onChange(newValue);
    }
  });
};
var _default = exports.default = CountryField;