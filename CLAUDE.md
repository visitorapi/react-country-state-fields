# react-country-state-fields

React form components — `<CountryField>` and `<StateField>` — built on
Material UI 5. They auto-fill from the visitor's IP location, looked
up via the VisitorAPI service. Published to npm as
`react-country-state-fields`.

- **Product context:** see `https://www.visitorapi.com` — users need
  a VisitorAPI project ID and domain-allowlist setup for the
  auto-detection to work. Without a `projectId`, the fields render
  but don't auto-fill.

## What's in the repo

```
.
├── src/lib/              # the component source (built into dist/)
├── dist/                 # built output — what npm publishes
├── demo/                 # demo / example app
├── public/               # CRA public assets for the demo
├── assets/               # README screenshots
├── babel.config.json     # build config — babel transpiles src/lib → dist
├── package.json
└── README.md
```

The published artefact is `dist/index.js` (set as `main` and `module`
in package.json).

## Public API

```jsx
import { CountryField, StateField, VisitorAPIComponents } from 'react-country-state-fields';

<VisitorAPIComponents
  projectId="<visitorapi-project-id>"
  handleCountryChange={countryObj => …}
  handleStateChange={stateObj => …}
>
  <CountryField label="Country/Territory" />
  <StateField  label="State/Province" />
</VisitorAPIComponents>
```

- `<VisitorAPIComponents>` is an invisible context provider that
  calls the VisitorAPI service once and broadcasts country/state to
  any nested field. Other arbitrary children render through.
- `<CountryField>` and `<StateField>` are MUI-based selects. State
  falls back to a free-text input for countries whose subdivisions
  aren't enumerated.
- Country object shape: `{ code: "US", label: "United States" }`.
  State object shape: `{ code: "CA", label: "California" }`.

## Stack

- React 18, MUI 5 (`@mui/material` + emotion).
- `visitorapi` (the sibling npm SDK) — used internally by
  `<VisitorAPIComponents>` to fetch IP location.
- Build via Babel CLI (not webpack/rollup); `babel src/lib --out-dir dist`.
- Demo / dev runner uses Create React App (`react-scripts`).

## Commands

| What           | Command         | Notes                                                  |
|----------------|-----------------|--------------------------------------------------------|
| Demo locally   | `npm start`     | CRA dev server, useful for visual testing changes      |
| Build for npm  | `npm run build` | Wipes `dist/` and rebuilds via Babel                   |
| Tests          | `npm test`      | Jest via `react-scripts`; minimal test suite           |

## Publishing

1. `npm run build` (writes `dist/`).
2. Bump `version` in `package.json`.
3. `npm publish` (requires `visitorapi` npm org access).

The `files` array in package.json limits the published tarball to
`dist/`, `README.md`, and `LICENSE`. Source is not published.

## Editing rules

- Keep dependence on the `visitorapi` sibling package — that's how
  IP detection happens. If its API surface changes, bump the
  dependency here too.
- MUI 5 specifically — don't accidentally bring MUI 6/7 patterns;
  the consumers may be on MUI 5 for compatibility reasons.
- The demo app under `demo/` exists for manual visual verification
  during development. Keep it working but it isn't shipped.
