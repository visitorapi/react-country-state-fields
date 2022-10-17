import React, { useContext, useEffect, useState } from "react";
import {Autocomplete, TextField, Box} from "@mui/material";
import countryJson from "./countries.json";
import { VisitorAPIContext } from "./VisitorAPI";

const CountryField = ({label = ""}) => {
    const countries = countryJson.countries;
    const {countryObj, setCountryObj, setStateObj} = useContext(VisitorAPIContext);
    const [value, setValue] = useState(null);

    useEffect(() => {
        if(countryObj && countryObj.code){
            const v = countries.find(obj =>{
                return obj.code === countryObj.code
            });
            if(typeof(v) === 'undefined'){
                setValue(null);
            }else{
                setValue(v);
            }
        }else{
            setValue(null);
        }
    }, [countryObj, countries]);

    return (
        <Autocomplete value={value}
        options={countries}
        autoHighlight
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <img
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    alt=""
                />
                {option.label}
            </Box>
        )}
        renderInput={(params) => (
            <TextField
                {...params}
                label={label}
                inputProps={{
                    ...params.inputProps,
                    autoComplete: 'country',
                }}
            />
        )}
        onChange={(event, newValue) => {
            if(newValue){
                setCountryObj(newValue);
                setStateObj(null);
            }
        }}></Autocomplete>
    )
}

export default CountryField;
