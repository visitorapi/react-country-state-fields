"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisitorAPIContext = exports.VisitorAPIComponents = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.string.trim.js");
var _react = _interopRequireWildcard(require("react"));
var _visitorapi = _interopRequireDefault(require("visitorapi"));
var _countries = _interopRequireDefault(require("./countries.json"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const VisitorAPIContext = exports.VisitorAPIContext = /*#__PURE__*/_react.default.createContext();
const VisitorAPIComponents = _ref => {
  let {
    projectId,
    handleCountryChange,
    handleStateChange,
    defaultCountryCode,
    defaultStateCode,
    children
  } = _ref;
  const [countryObj, setCountryObj] = (0, _react.useState)(null); // country object in the json file
  const [stateObj, setStateObj] = (0, _react.useState)(null); // state object in the json file
  const countries = _countries.default.countries;
  (0, _react.useEffect)(() => {
    /**
     * Get the country object that matches the country code
     * @param {string} countryCode 
     * @returns 
     */
    const getCountryObj = countryCode => {
      const v = countries.find(obj => {
        return obj.code === countryCode;
      });
      if (typeof v === 'undefined') {
        return null;
      } else {
        return v;
      }
    };

    /**
     * Get the state object that matches the state code in the country object, if the country doesn't have a state list, return null
     * @param {object} countryObj 
     * @param {string} stateCode 
     * @returns 
     */
    const getStateObj = (countryObj, stateCode) => {
      if (countryObj.states) {
        const v = countryObj.states.find(obj => {
          return obj.code === stateCode.toUpperCase();
        });
        if (typeof v === 'undefined') {
          return null;
        } else {
          return v;
        }
      } else {
        return {
          code: stateCode,
          label: stateCode
        };
      }
    };
    if (defaultCountryCode) {
      // use default values
      const c = getCountryObj(defaultCountryCode);
      setCountryObj(c);
      if (defaultStateCode) {
        setStateObj(getStateObj(c, defaultStateCode));
      }
    } else {
      if (typeof projectId !== 'undefined' && projectId.trim() !== '') {
        (0, _visitorapi.default)(projectId).then(data => {
          const c = getCountryObj(data.countryCode);
          setStateObj(getStateObj(c, data.region));
          setCountryObj(c);
        }).catch(error => {
          // error, do nothing
        });
      }
    }
  }, [projectId, countries, defaultCountryCode, defaultStateCode]);
  (0, _react.useEffect)(() => {
    handleCountryChange(countryObj);
  }, [countryObj, handleCountryChange]);
  (0, _react.useEffect)(() => {
    handleStateChange(stateObj);
  }, [stateObj, handleStateChange]);
  return /*#__PURE__*/_react.default.createElement(VisitorAPIContext.Provider, {
    value: {
      countryObj,
      setCountryObj,
      stateObj,
      setStateObj
    }
  }, children);
};
exports.VisitorAPIComponents = VisitorAPIComponents;