"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisitorAPIContext = exports.VisitorAPIComponents = void 0;
var _react = _interopRequireWildcard(require("react"));
var _visitorapi = _interopRequireDefault(require("visitorapi"));
var _locationData = require("../data/locationData");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
const VisitorAPIContext = exports.VisitorAPIContext = /*#__PURE__*/_react.default.createContext();
const VisitorAPIComponents = _ref => {
  let projectId = _ref.projectId,
    handleCountryChange = _ref.handleCountryChange,
    handleStateChange = _ref.handleStateChange,
    handleCityChange = _ref.handleCityChange,
    defaultCountryCode = _ref.defaultCountryCode,
    defaultStateCode = _ref.defaultStateCode,
    defaultCityCode = _ref.defaultCityCode,
    children = _ref.children;
  const _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    countryObj = _useState2[0],
    setCountryObjState = _useState2[1];
  const _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    stateObj = _useState4[0],
    setStateObjState = _useState4[1];
  const _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    cityObj = _useState6[0],
    setCityObjState = _useState6[1];
  const _useState7 = (0, _react.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    loading = _useState8[0],
    setLoading = _useState8[1];
  const _useState9 = (0, _react.useState)(null),
    _useState0 = _slicedToArray(_useState9, 2),
    error = _useState0[0],
    setError = _useState0[1];

  // Tracks whether the user has manually changed a field (via a <CountryField>/
  // <StateField>/<CityField> onChange, which goes through the wrapped setters
  // below), so a late-resolving geolocation response doesn't clobber it.
  const userEditedRef = (0, _react.useRef)({
    country: false,
    state: false,
    city: false
  });
  (0, _react.useEffect)(() => {
    if (defaultCountryCode) {
      const c = (0, _locationData.getCountryByCode)(defaultCountryCode);
      setCountryObjState(c);
      if (defaultStateCode) {
        const s = (0, _locationData.getStateByCodeAndCountry)(defaultStateCode, defaultCountryCode);
        setStateObjState(s);
        if (defaultCityCode) {
          const cities = s && s.cities ? s.cities : [];
          const matchedCity = (0, _locationData.findCityByName)(cities, defaultCityCode);
          setCityObjState(matchedCity || {
            code: defaultCityCode,
            label: defaultCityCode
          });
        }
      }
      return;
    }
    if (typeof projectId === 'undefined' || projectId.trim() === '') {
      return;
    }
    setLoading(true);
    setError(null);
    (0, _visitorapi.default)(projectId).then(data => {
      if (userEditedRef.current.country) {
        return;
      }
      const c = (0, _locationData.getCountryByCode)(data.countryCode);
      setCountryObjState(c);
      if (userEditedRef.current.state) {
        return;
      }
      const s = data.region ? (0, _locationData.getStateByCodeAndCountry)(data.region, data.countryCode) || {
        code: data.region,
        label: data.region
      } : null;
      setStateObjState(s);
      if (userEditedRef.current.city) {
        return;
      }
      if (data.city) {
        const cities = s && s.cities ? s.cities : [];
        const matchedCity = (0, _locationData.findCityByName)(cities, data.city);
        setCityObjState(matchedCity || {
          code: data.city,
          label: data.city
        });
      }
    }).catch(err => {
      setError(err);
    }).finally(() => {
      setLoading(false);
    });
  }, [projectId, defaultCountryCode, defaultStateCode, defaultCityCode]);
  (0, _react.useEffect)(() => {
    handleCountryChange(countryObj);
  }, [countryObj, handleCountryChange]);
  (0, _react.useEffect)(() => {
    handleStateChange(stateObj);
  }, [stateObj, handleStateChange]);
  (0, _react.useEffect)(() => {
    if (handleCityChange) {
      handleCityChange(cityObj);
    }
  }, [cityObj, handleCityChange]);
  const setCountryObj = (0, _react.useCallback)(value => {
    userEditedRef.current.country = true;
    setCountryObjState(value);
  }, []);
  const setStateObj = (0, _react.useCallback)(value => {
    userEditedRef.current.state = true;
    setStateObjState(value);
  }, []);
  const setCityObj = (0, _react.useCallback)(value => {
    userEditedRef.current.city = true;
    setCityObjState(value);
  }, []);
  return /*#__PURE__*/_react.default.createElement(VisitorAPIContext.Provider, {
    value: {
      countryObj,
      setCountryObj,
      stateObj,
      setStateObj,
      cityObj,
      setCityObj,
      loading,
      error
    }
  }, children);
};
exports.VisitorAPIComponents = VisitorAPIComponents;