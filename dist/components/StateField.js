"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _material = require("@mui/material");
var _useStateField2 = require("../hooks/useStateField");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const StateField = _ref => {
  let _ref$label = _ref.label,
    label = _ref$label === void 0 ? "" : _ref$label,
    sx = _ref.sx,
    className = _ref.className,
    variant = _ref.variant,
    fullWidth = _ref.fullWidth,
    size = _ref.size;
  const _useStateField = (0, _useStateField2.useStateField)(),
    value = _useStateField.value,
    options = _useStateField.options,
    _onChange = _useStateField.onChange;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, options ? /*#__PURE__*/_react.default.createElement(_material.Autocomplete, {
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
      component: "li"
    }, props), option.label),
    renderInput: params => /*#__PURE__*/_react.default.createElement(_material.TextField, _extends({}, params, {
      label: label,
      variant: variant,
      inputProps: _objectSpread(_objectSpread({}, params.inputProps), {}, {
        autoComplete: 'state'
      })
    })),
    onChange: (event, newValue) => {
      _onChange(newValue);
    }
  }) : /*#__PURE__*/_react.default.createElement(_material.TextField, {
    label: label,
    sx: sx,
    className: className,
    variant: variant,
    fullWidth: fullWidth,
    size: size,
    inputProps: {
      autoComplete: 'state'
    },
    value: value === null ? "" : value.code,
    onChange: event => {
      _onChange(event.target.value);
    }
  }));
};
var _default = exports.default = StateField;