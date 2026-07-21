import React from "react";
import { Autocomplete, TextField, Box } from "@mui/material";
import { useCityField } from "../hooks/useCityField";

const CityField = ({
    label = "",
    sx,
    className,
    variant,
    fullWidth,
    size,
    freeSolo = true,
    cities,
}) => {
    const { value, options, onChange } = useCityField({ cities, freeSolo });

    return (
        <>
            {(options && options.length > 0) ? (
                <Autocomplete
                    value={value}
                    options={options}
                    autoHighlight
                    freeSolo={freeSolo}
                    sx={sx}
                    className={className}
                    fullWidth={fullWidth}
                    size={size}
                    getOptionLabel={(option) => (typeof option === 'string' ? option : option.label)}
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
                        onChange(newValue);
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
                        onChange(event.target.value);
                    }}
                />
            )}
        </>
    );
};

export default CityField;
