import React, { useContext, useState, useEffect } from "react";
import {Autocomplete, TextField, Box} from "@mui/material";
import { VisitorAPIContext } from "./VisitorAPI";


const StateField = ({label = "", }) => {
    const {countryObj, stateObj, setStateObj} = useContext(VisitorAPIContext);
    const [value, setValue] = useState(null);

    useEffect(() => {
        if(countryObj && countryObj.states && stateObj && stateObj.code){
            const v = countryObj.states.find(obj =>{
                return obj.code === stateObj.code
            });
            if(typeof(v) === 'undefined'){
                setValue(null);
            }else{
                setValue(v);
            }
        }else{
            setValue(null);
        }
    }, [countryObj, stateObj]);


    return (
        <>
            {(countryObj && countryObj.states)?(
                <Autocomplete
                    value={value}
                    options={countryObj.states}
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    renderOption={(props, option) => (
                        <Box component="li" {...props}>
                            {option.label}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'state',
                            }}
                        />
                    )}
                    onChange={(event, newValue) => {
                        if(newValue){
                            setStateObj(newValue);
                        }
                    }}
                />
            ):(
                <TextField
                    label={label}
                    inputProps={{
                        autoComplete: 'state',
                    }}
                    onChange={(event) => {
                        setStateObj({code: event.target.value, label: event.target.value});
                    }}
                />
            )}
            
        </>
    )
}

export default StateField;
