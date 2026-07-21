"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStateField = void 0;
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
 * Headless hook for a state field, cascading from the currently selected
 * country. `options` is `null` when the country has no state-level data,
 * consumers should render a free-text input in that case (see `<StateField>`
 * for the reference implementation).
 *
 * onChange accepts either a state code string or an option object.
 */
const useStateField = () => {
  const _useContext = (0, _react.useContext)(_VisitorAPI.VisitorAPIContext),
    countryObj = _useContext.countryObj,
    stateObj = _useContext.stateObj,
    setStateObj = _useContext.setStateObj,
    setCityObj = _useContext.setCityObj;
  const _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    value = _useState2[0],
    setValue = _useState2[1];
  const options = countryObj && countryObj.states ? countryObj.states : null;
  (0, _react.useEffect)(() => {
    if (countryObj && countryObj.states && stateObj && stateObj.code) {
      const v = countryObj.states.find(obj => obj.code === stateObj.code);
      setValue(typeof v === 'undefined' ? null : v);
    } else if (stateObj && stateObj.code) {
      setValue(stateObj);
    } else {
      setValue(null);
    }
  }, [countryObj, stateObj]);
  const onChange = (0, _react.useCallback)(input => {
    if (input === null || input === undefined) {
      return;
    }
    const code = typeof input === 'string' ? input : input.code;
    const enriched = options && countryObj ? (0, _locationData.getStateByCodeAndCountry)(code, countryObj.code) || {
      code,
      label: code
    } : {
      code,
      label: code
    };
    setStateObj(enriched);
    if (setCityObj) {
      setCityObj(null);
    }
  }, [countryObj, options, setStateObj, setCityObj]);
  return {
    value,
    options,
    onChange
  };
};
exports.useStateField = useStateField;