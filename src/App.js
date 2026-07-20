import './App.css';
import { CountryField, StateField, CityField, VisitorAPIComponents } from './lib';
import { Container, Stack, Grid } from '@mui/material';
import React, { useState } from 'react';

function App() {
  const [country, setCountry] = useState({});
  const [state, setState] = useState({});
  const [city, setCity] = useState({});

  return (
    <div className="App">
      <Grid container spacing={3}>
        <Grid container item xs={12}>
          <Container maxWidth="sm">
            <p></p>
            <Stack spacing={5}>
              <VisitorAPIComponents
                projectId=""
                handleCountryChange={(countryObj) => setCountry(countryObj)}
                handleStateChange={(stateObj) => setState(stateObj)}
                handleCityChange={(cityObj) => setCity(cityObj)}
              >
                <CountryField label="Country/Territory"></CountryField>
                <StateField label="State/Province"></StateField>
                <CityField label="City"></CityField>
                <CountryField
                  label="Country/Territory (no flag, custom style)"
                  showFlag={false}
                  className="styled-country-field"
                  sx={{ backgroundColor: '#fafafa', borderRadius: 1 }}
                  variant="filled"
                  fullWidth
                ></CountryField>
              </VisitorAPIComponents>
            </Stack>
            <p></p>
            <p>Selected Country Code is: {country !== null && country.code}</p>
            <p>Selected State Code is: {state !== null && state.code}</p>
            <p>Selected City is: {city !== null && city.code}</p>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
