import React, { useEffect, useState } from "react";
import { default as api } from "visitorapi";
import countryJson from "./countries.json";

export const VisitorAPIContext = React.createContext();

export const VisitorAPIComponents = ({projectId, handleCountryChange, handleStateChange, children}) => {
    const [countryObj, setCountryObj] = useState(null); // country object in the json file
    const [stateObj, setStateObj] = useState(null); // state object in the json file
    const countries = countryJson.countries;

    useEffect(() => {
        /**
         * Get the country object that matches the country code
         * @param {string} countryCode 
         * @returns 
         */
        const getCountryObj = (countryCode) => {
            const v = countries.find(obj =>{
                return obj.code === countryCode
            });
            if(typeof(v) === 'undefined'){
                return null
            }else{
                return v
            }
        }

        /**
         * Get the state object that matches the state code in the country object, if the country doesn't have a state list, return null
         * @param {object} countryObj 
         * @param {string} stateCode 
         * @returns 
         */
        const getStateObj = (countryObj, stateCode) => {
            if(countryObj.states){
                const v = countryObj.states.find(obj => {
                    return obj.code === stateCode.toUpperCase()
                });
                if(typeof(v) === 'undefined'){
                    return null
                }else{
                    return v
                }
            }else{
                return {code: stateCode, label: stateCode}
            }
        }

        if(typeof(projectId) !== 'undefined' && projectId.trim() !== ''){
            api(projectId).then(data => {
                const c = getCountryObj(data.countryCode)
                setStateObj(getStateObj(c, data.region));
                setCountryObj(c);
            }).catch(error => {
                // error, do nothing
            })
        }
    },[projectId, countries]);

    useEffect(() => {
        handleCountryChange(countryObj);
    }, [countryObj, handleCountryChange]);

    useEffect(() => {
        handleStateChange(stateObj);
    }, [stateObj, handleStateChange])

    return (
        <VisitorAPIContext.Provider value={{
            countryObj, setCountryObj, stateObj, setStateObj
        }}>
            {children}
        </VisitorAPIContext.Provider>
    );
}