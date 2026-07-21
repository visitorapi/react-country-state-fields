import React from "react";
import { Autocomplete, TextField, Box } from "@mui/material";
import { useStateField } from "../hooks/useStateField";

const StateField = ({
    label = "",
    sx,
    className,
    variant,
    fullWidth,
    size,
}) => {
    const { value, options, onChange } = useStateField();

    return (
        <>
            {options ? (
                <Autocomplete
                    value={value}
                    options={options}
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
                        autoComplete: 'state',
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

export default StateField;
