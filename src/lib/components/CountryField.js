import React from "react";
import { Autocomplete, TextField, Box } from "@mui/material";
import { useCountryField } from "../hooks/useCountryField";

const defaultRenderFlag = (option) => (
    <img
        loading="lazy"
        width="20"
        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
        alt=""
    />
);

const CountryField = ({
    label = "",
    sx,
    className,
    variant,
    fullWidth,
    size,
    showFlag = true,
    renderFlag,
}) => {
    const { value, options, onChange } = useCountryField();

    return (
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
                <Box component="li" sx={showFlag ? { '& > img': { mr: 2, flexShrink: 0 } } : undefined} {...props}>
                    {showFlag && (renderFlag ? renderFlag(option) : defaultRenderFlag(option))}
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
                        autoComplete: 'country',
                    }}
                />
            )}
            onChange={(event, newValue) => {
                onChange(newValue);
            }}
        />
    );
};

export default CountryField;
