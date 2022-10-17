"use strict";

require("core-js/modules/es.object.assign.js");
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
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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
var _default = CountryField;
exports.default = _default;