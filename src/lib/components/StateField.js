import React, { useContext, useState, useEffect } from "react";
import { Autocomplete, TextField, Box } from "@mui/material";
import { getStateByCodeAndCountry } from "../data/locationData";
import { VisitorAPIContext } from "./VisitorAPI";

const StateField = ({
    label = "",
    sx,
    className,
    variant,
    fullWidth,
    size,
}) => {
    const { countryObj, stateObj, setStateObj, setCityObj } = useContext(VisitorAPIContext);
    const [value, setValue] = useState(null);

    useEffect(() => {
        if (countryObj && countryObj.states && stateObj && stateObj.code) {
            const v = countryObj.states.find((obj) => obj.code === stateObj.code);
            setValue(typeof v === 'undefined' ? null : v);
        } else if (stateObj && stateObj.code) {
            setValue(stateObj);
        } else {
            setValue(null);
        }
    }, [countryObj, stateObj]);

    return (
        <>
            {(countryObj && countryObj.states) ? (
                <Autocomplete
                    value={value}
                    options={countryObj.states}
                    autoHighlight
                    sx={sx}
                    className={className}
                    fullWidth={fullWidth}
                    size={size}
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(option, val) => option.code === val.code}
                    renderOption={(props, option) => (
                        <Box component="li" {...props}>
                            {option.label}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            variant={variant}
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'state',
                            }}
                        />
                    )}
                    onChange={(event, newValue) => {
                        if (newValue) {
                            const enriched = countryObj
                                ? getStateByCodeAndCountry(newValue.code, countryObj.code)
                                : newValue;
                            setStateObj(enriched || newValue);
                            if (setCityObj) {
                                setCityObj(null);
                            }
                        }
                    }}
                />
            ) : (
                <TextField
                    label={label}
                    sx={sx}
                    className={className}
                    variant={variant}
                    fullWidth={fullWidth}
                    size={size}
                    inputProps={{
                        autoComplete: 'state',
                    }}
                    value={(value === null) ? "" : value.code}
                    onChange={(event) => {
                        setStateObj({ code: event.target.value, label: event.target.value });
                        if (setCityObj) {
                            setCityObj(null);
                        }
                    }}
                />
            )}
        </>
    );
};

export default StateField;
