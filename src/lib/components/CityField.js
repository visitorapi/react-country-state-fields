import React, { useContext, useState, useEffect } from "react";
import { Autocomplete, TextField, Box } from "@mui/material";
import { findCityByName } from "../data/locationData";
import { VisitorAPIContext } from "./VisitorAPI";

/**
 * Resolves which city list this field should offer, mirroring <StateField>'s
 * cascade: prefer the selected state's cities; for countries with no states
 * at all (e.g. Singapore, Monaco), fall back to the country's own city list.
 */
const resolveCities = (countryObj, stateObj) => {
    if (stateObj && stateObj.cities) {
        return stateObj.cities;
    }
    if (countryObj && !countryObj.states && countryObj.cities) {
        return countryObj.cities;
    }
    return null;
};

const CityField = ({
    label = "",
    sx,
    className,
    variant,
    fullWidth,
    size,
}) => {
    const { countryObj, stateObj, cityObj, setCityObj } = useContext(VisitorAPIContext);
    const [value, setValue] = useState(null);
    const cities = resolveCities(countryObj, stateObj);

    useEffect(() => {
        if (cities && cityObj && cityObj.code) {
            // Case-insensitive: VisitorAPI's own geolocation data doesn't
            // always match this dataset's city-name casing exactly (e.g.
            // "sydney" vs the canonical "Sydney").
            const v = findCityByName(cities, cityObj.code);
            setValue(v || null);
        } else if (cityObj && cityObj.code) {
            setValue(cityObj);
        } else {
            setValue(null);
        }
    }, [cities, cityObj]);

    return (
        <>
            {(cities && cities.length > 0) ? (
                <Autocomplete
                    value={value}
                    options={cities}
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
                                autoComplete: 'address-level2',
                            }}
                        />
                    )}
                    onChange={(event, newValue) => {
                        if (newValue) {
                            setCityObj(newValue);
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
                        autoComplete: 'address-level2',
                    }}
                    value={(value === null) ? "" : value.code}
                    onChange={(event) => {
                        setCityObj({ code: event.target.value, label: event.target.value });
                    }}
                />
            )}
        </>
    );
};

export default CityField;
