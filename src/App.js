import './App.css';
import { CountryField, StateField, CityField, VisitorAPIComponents } from './lib';
import { useCountryField, useStateField, useCityField } from './lib/headless';
import { Container, Stack, Grid } from '@mui/material';
import React, { useState } from 'react';

// A completely custom, non-MUI UI built on the headless hooks, plain <select>
// elements styled with inline CSS, no @mui/material import anywhere in this
// component. Demonstrates the /headless entry point works end-to-end and
// shares cascading state with the MUI fields above it via the same
// <VisitorAPIComponents> provider.
function HeadlessFields() {
  const country = useCountryField();
  const state = useStateField();
  const city = useCityField();

  const selectStyle = {
    display: 'block',
    width: '100%',
    padding: '8px',
    marginBottom: '12px',
    fontFamily: 'sans-serif',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  return (
    <div style={{ border: '2px dashed #999', padding: '16px', borderRadius: '8px' }}>
      <p style={{ fontFamily: 'sans-serif', fontWeight: 'bold', marginTop: 0 }}>
        Headless (no MUI) — plain &lt;select&gt; driven by useCountryField/useStateField/useCityField
      </p>

      <select
        style={selectStyle}
        value={country.value?.code ?? ''}
        onChange={(e) => country.onChange(e.target.value)}
      >
        <option value="">Select a country</option>
        {country.options.map((c) => (
          <option key={c.code} value={c.code}>{c.label}</option>
        ))}
      </select>

      {state.options ? (
        <select
          style={selectStyle}
          value={state.value?.code ?? ''}
          onChange={(e) => state.onChange(e.target.value)}
        >
          <option value="">Select a state</option>
          {state.options.map((s) => (
            <option key={s.code} value={s.code}>{s.label}</option>
          ))}
        </select>
      ) : (
        <input
          style={selectStyle}
          placeholder="State"
          value={state.value?.code ?? ''}
          onChange={(e) => state.onChange(e.target.value)}
        />
      )}

      {city.options && city.options.length > 0 ? (
        <select
          style={selectStyle}
          value={city.value?.code ?? ''}
          onChange={(e) => city.onChange(e.target.value)}
        >
          <option value="">Select a city</option>
          {city.options.map((c) => (
            <option key={c.code} value={c.code}>{c.label}</option>
          ))}
        </select>
      ) : (
        <input
          style={selectStyle}
          placeholder="City"
          value={city.value?.code ?? ''}
          onChange={(e) => city.onChange(e.target.value)}
        />
      )}
    </div>
  );
}

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
                <HeadlessFields />
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
