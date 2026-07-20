# react-country-state-fields

The country, state, and city fields are the most annoying fields to fill because of the long list of options. The VisitorAPI React components are designed to smooth the user experience by prefilling the fields based on the user's IP location.

The component package comes with `<CountryField>`, `<StateField>`, and `<CityField>` components. Country/state/city data is sourced from the [country-state-city](https://www.npmjs.com/package/country-state-city) package: 250 countries, 5,000+ states/provinces, and 150,000+ cities, so `<StateField>` and `<CityField>` cascade correctly for virtually every country, not just a handful. The components are built with Material-UI as shown in the screenshots below.

![`React country and state fields](https://raw.githubusercontent.com/visitorapi/react-country-state-fields/main//assets/react-country-state-fields.gif)

![`<CountryField>` and `<StateField>` components](https://raw.githubusercontent.com/visitorapi/react-country-state-fields/main//assets/country-field-and-state-field.png)

![`<CountryField>` component](https://raw.githubusercontent.com/visitorapi/react-country-state-fields/main//assets/country-field-options.png)

See here for the example repo: [https://github.com/visitorapi/react-country-state-fields-example](https://github.com/visitorapi/react-country-state-fields-example)


# Installation

```
npm i react-country-state-fields
```

`react`, `react-dom`, and `@mui/material` (plus `@emotion/react`/`@emotion/styled`, MUI's peer requirements) are peer dependencies, not bundled dependencies. If your project doesn't already have them installed:

```
npm i react react-dom @mui/material @emotion/react @emotion/styled
```

# Setup a VisitorAPI project

The components require a [VisitorAPI](https://www.visitorapi.com) project as the API endpoint to detect your React application users' IP locations. Go to [VisitorAPI](https://www.visitorapi.com) to create a free plan or a paid-as-you-go plan, depending on the usage you expect. Once a project is created, you will see the project ID which will be needed to enable the auto-detecting feature of the field components.

In the [VisitorAPI](https://www.visitorapi.com) project settings, you will also need to specify the domain names of your Reactjs application to authorise the API calls. VisitorAPI doesn't require any API key as an API designed for front-end use, instead, it uses the domain names to authorise the API calls so that it will be safe for you to call the APIs from the front-end.

# Use the field components

First, you will need to import the `<VisitorAPIComponents>` component which is responsible for auto-detecting the user's IP location and passing the country, state, and city data back to your state. Then you can use the `<CountryField>`, `<StateField>`, and `<CityField>` components to show the fields.

```jsx
import { CountryField, StateField, CityField, VisitorAPIComponents } from 'react-country-state-fields';
import React, { useState } from 'react';

export const MyForm = () => {
  const [country, setCountry] = useState({}); // the selected country
  const [state, setState] = useState({}); // the selected state
  const [city, setCity] = useState({}); // the selected city
  const visitorApiPrjectId = ""; // assign your project ID here

  return(
    <VisitorAPIComponents
      projectId={visitorApiPrjectId}
      handleCountryChange={(countryObj) => setCountry(countryObj)}
      handleStateChange={(stateObj) => setState(stateObj)}
      handleCityChange={(cityObj) => setCity(cityObj)}
    >
      <CountryField label="Country/Territory"></CountryField>
      <StateField label="State/Province"></StateField>
      <CityField label="City"></CityField>
    </VisitorAPIComponents>
  );
}
```

# `<VisitorAPIComponents>`

The `<VisitorAPIComponents>` component is invisible and you can put other form field components in it as children components. It has three purposes:

1. Auto-detecting the user's IP location and setting the default country, state, and city objects
2. Passing the country, state, and city objects back through `handleCountryChange`, `handleStateChange`, and `handleCityChange` functions
3. Exposing `loading` and `error` on context, so you can render a loading or error state while the auto-detect call is in flight

```jsx
<VisitorAPIComponents
  projectId={visitorApiPrjectId}
  handleCountryChange={(countryObj) => setCountry(countryObj)}
  handleStateChange={(stateObj) => setState(stateObj)}
  handleCityChange={(cityObj) => setCity(cityObj)}
>
  // other field components here...
  <CountryField label="Country/Territory"></CountryField>
  <StateField label="State/Province"></StateField>
  <CityField label="City"></CityField>
  // other field and button components here...
</VisitorAPIComponents>
```

## Props

- `projectId` - the [VisitorAPI](https://www.visitorapi.com) project ID from your VisitorAPI project. Without the project ID (and without `defaultCountryCode`), your fields will not be able to auto-detect users' IP locations.
- `handleCountryChange` - the function to handle changes in the `<CountryField>` component so that you can retrieve the selected country. The country object is a JSON in the format `{code: "US", label: "United States"}`. You can use `.code` to get the country code or `.label` to get the country's full name.
- `handleStateChange` - the function to handle changes in the `<StateField>` component so that you can retrieve the selected state. The state object is a JSON in the format `{code: "CA", label: "California"}`.
- `handleCityChange` - the function to handle changes in the `<CityField>` component so that you can retrieve the selected city. The city object is a JSON in the format `{code: "Los Angeles", label: "Los Angeles"}` (cities have no distinct ISO code in the underlying dataset, so the city name is used as both `code` and `label`).
- `defaultCountryCode` / `defaultStateCode` / `defaultCityCode` - set an initial country/state/city without waiting for (or instead of) IP-based auto-detection. `defaultStateCode` requires `defaultCountryCode`; `defaultCityCode` requires `defaultStateCode` (or a country with no state-level data, see `<CityField>` below).
- `loading` (via context, not a prop you pass in) - `true` while the IP auto-detect call is in flight. Read it with `useContext(VisitorAPIContext)`.
- `error` (via context) - the `Error` from a failed auto-detect call, or `null`. The fields simply stay empty on failure; check `error` if you want to show a message.

# `<CountryField>`

The `<CountryField>` component is a selection field for users to input their countries. If auto-detection is enabled by giving a valid VisitorAPI project ID, the field will set the country automatically based on the user's IP location.

## Props

- `label` - the field label such as "Country/Territory". Leave it blank if you have a separate component for the field's label.
- `showFlag` (default `true`) - set to `false` to hide the flag icon in the option list.
- `renderFlag` - a function `(countryOption) => ReactNode` to render a custom flag/icon in place of the default one (fetched from `flagcdn.com`). Ignored when `showFlag` is `false`.
- `sx`, `className`, `variant`, `fullWidth`, `size` - passed straight through to the underlying MUI `Autocomplete`/`TextField`, so you can restyle the field to match your app's design system.

```jsx
<CountryField
  label="Country/Territory"
  showFlag={false}
  variant="filled"
  fullWidth
  sx={{ backgroundColor: '#fafafa' }}
/>
```

# `<StateField>`

The `<StateField>` component is a selection field for users to input their state. It shows a searchable dropdown for countries that have state/province data, or an open text field for the small number of countries/territories that don't. If auto-detection is enabled by giving a valid VisitorAPI project ID, the field will set the state automatically based on the user's IP location.

## Props

- `label` - the field label such as "State/Province". Leave it blank if you have a separate component for the field's label.
- `sx`, `className`, `variant`, `fullWidth`, `size` - same style passthrough as `<CountryField>`.

# `<CityField>`

The `<CityField>` component is a selection field for users to input their city, cascading from the currently selected state (or directly from the country, for the countries that have no state-level data). Falls back to an open text field where no city data is available for the current selection.

## Props

- `label` - the field label such as "City". Leave it blank if you have a separate component for the field's label.
- `sx`, `className`, `variant`, `fullWidth`, `size` - same style passthrough as `<CountryField>`.
