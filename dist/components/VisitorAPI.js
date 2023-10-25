"use strict";

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
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const VisitorAPIContext = /*#__PURE__*/_react.default.createContext();
exports.VisitorAPIContext = VisitorAPIContext;
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