import { useContext } from "react";
import { VisitorAPIContext } from "../components/VisitorAPI";

/**
 * Headless hook for the auto-detect request's loading/error state, so a
 * custom UI can show a spinner or an error message without needing the
 * MUI-based field components.
 */
export const useVisitorLocationStatus = () => {
    const { loading, error } = useContext(VisitorAPIContext);
    return { loading, error };
};
