import './App.css';
import { CountryField, StateField, VisitorAPIComponents } from './lib';
import { Container, Stack, Grid } from '@mui/material';
import React, { useState } from 'react';

function App() {
  const [country, setCountry] = useState({});
  const [state, setState] = useState({});

  return (
    <div className="App">
      <Grid container spacing={3}>V
        <Grid container item xs={12}>
          <Container maxWidth="sm">
            <p></p>
            <Stack spacing={5}>
              <VisitorAPIComponents projectId="" handleCountryChange={(countryObj) => setCountry(countryObj)} handleStateChange={(stateObj) => setState(stateObj)}>
                <CountryField label="Country/Territory"></CountryField>
                <StateField label="State/Province"></StateField>
              </VisitorAPIComponents>
            </Stack>
            <p></p>
            <p>Selected Country Code is: {country !== null && country.code}</p>
            <p>Selected State Code is: {state !== null && state.code}</p>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;