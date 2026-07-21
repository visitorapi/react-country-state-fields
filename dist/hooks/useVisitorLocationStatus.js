"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useVisitorLocationStatus = void 0;
var _react = require("react");
var _VisitorAPI = require("../components/VisitorAPI");
/**
 * Headless hook for the auto-detect request's loading/error state, so a
 * custom UI can show a spinner or an error message without needing the
 * MUI-based field components.
 */
const useVisitorLocationStatus = () => {
  const _useContext = (0, _react.useContext)(_VisitorAPI.VisitorAPIContext),
    loading = _useContext.loading,
    error = _useContext.error;
  return {
    loading,
    error
  };
};
exports.useVisitorLocationStatus = useVisitorLocationStatus;