# visitorapi-react-components

The country and state fields are the most annoying fields to fill because of the long list of options. The VisitorAPI React components are designed to smooth the user experience by prefilling the fields based on the user’s IP location.

The component package comes with a `<CountryField>` component and a `<StateField>` component. The components are built with Material-UI as the screenshots are shown below.

![`<CountryField>` and `<StateField>` components](https://raw.githubusercontent.com/visitorapi/react-country-state-fields/main//assets/country-field-and-state-field.png)

`<CountryField>` and `<StateField>` components

![`<CountryField>` component](https://raw.githubusercontent.com/visitorapi/react-country-state-fields/main//assets/country-field-options.png)

`<CountryField>` component

# Installation

Run `npm i visitorapi-react-components` to install the components in your React project

# Setup a VisitorAPI project

The components require a VisitorAPI project as the API endpoint to detect your React application users’ IP locations. Go to [VisitorAPI](https://www.visitorapi.com) to create a free plan or a paid-as-you-go plan, depending on the usage you expect. Once a project is created, you will see the project ID which will be needed to enable the auto-detecting feature of the field components.

# Use the field components

First, you will need to import the `<VisitorAPIComponents>` component which is responsible for auto-detecting the user’s IP location and passing the country and field data back to your states. Then you can use the `<CountryField>` and `<StateField>` components to show the fields.

```jsx
import { CountryField, StateField, VisitorAPIComponents } from 'visitorapi-react-components';
import React, { useState } from 'react';

export const MyForm = () => {
  const [country, setCountry] = useState({}); // the selected country
  const [state, setState] = useState({}); // the selected state
  const visitorApiPrjectId = ""; // assign your project ID here

  return(
    <VisitorAPIComponents projectId={visitorApiPrjectId} handleCountryChange={(countryObj) => setCountry(countryObj)} handleStateChange={(stateObj) => setState(stateObj)}>
      <CountryField label="Country/Territory"></CountryField>
      <StateField label="State/Province"></StateField>
    </VisitorAPIComponents>
  );
}
```

# `<VisitorAPIComponents>`

The `<VisitorAPIComponents>` component is invisible and you can put other form field components in it as children components. There are two purposes of the component:

1. Auto-detecting the user’s IP location and setting the default country and state objects
2. Passing the country and state objects back through `handleCountryChange` and `handleStateChange` functions.

```jsx
<VisitorAPIComponents projectId={visitorApiPrjectId} handleCountryChange={(countryObj) => setCountry(countryObj)} handleStateChange={(stateObj) => setState(stateObj)}>
  // other field components here...
  <CountryField label="Country/Territory"></CountryField>
  <StateField label="State/Province"></StateField>
  // other field and button components here...
</VisitorAPIComponents>
```

## Props

- projectId - the [VisitorAPI](https://www.visitorapi.com) project ID from your VisitorAPI project. Without the project ID, your `<CountryField>` and `<StateField>` components will not be able to auto-detect users’ IP locations.
- handleCountryChange - the function to handle changes in the `<CountryField>` component so that you can retrieve the selected country. The country object is a JSON in the format as `{code: "US", label: "United State"}`. You can use `.code` to get the country code or `.label` to get the country's full name.
- handleStateChange - the function to handle changes in the `<StateField>` component so that you can retrieve the selected state. The state object is a JSON in the format as `{code: "CA", label: "California"}`. You can use `.code` to get the state code or `.label` to get the state's full name.

# `<CountryField>`

The `<CountryField>` component is a selection field for users to input their countries. If auto-detection is enabled by giving a valid VisitorAPI project ID, the field will set the country automatically based on the user’s IP location.

## Props

- label - the field label such as “Country/Territory”. Leave it blank if you have a separate component for the field’s label.

# `<StateField>`

The `<StateField>` component is a selection field for users to input their state if the states are specified in the `countries.json` file of the package, or it will show an open text field when the states are not defined in the JSON file. If auto-detection is enabled by giving a valid VisitorAPI project ID, the field will set the state automatically based on the user’s IP location.

## Props

- label - the field label such as “State/Province”. Leave it blank if you have a separate component for the field’s label.