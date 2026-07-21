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
├── src/lib/
│   ├── components/        # MUI-based field components (thin wrappers over hooks/)
│   ├── hooks/              # headless logic: useCountryField, useStateField,
│   │                       # useCityField, useVisitorLocationStatus — zero MUI import
│   ├── data/               # country-state-city adapter
│   ├── index.js            # default entry point: components + hooks
│   └── headless.js         # MUI-free entry point: context provider + hooks only
├── dist/                 # built output — what npm publishes (dist/index.js, dist/headless.js)
├── demo/                 # demo / example app
├── public/               # CRA public assets for the demo
├── assets/               # README screenshots
├── babel.config.json     # build config — babel transpiles src/lib → dist
├── package.json
└── README.md
```

The published artefacts are `dist/index.js` (`main`/`module`) and
`dist/headless.js`, wired up via the `exports` map in package.json
(`.` → `dist/index.js`, `./headless` → `dist/headless.js`). Both
compile automatically from the same `babel src/lib --out-dir dist`
build since `headless.js` and `hooks/` live under `src/lib`.

## Headless architecture

All cascading/auto-detect/user-edit-guarding logic lives in
`src/lib/hooks/` as plain hooks with no MUI or emotion import
anywhere in their import graph (`useCountryField`, `useStateField`,
`useCityField`, `useVisitorLocationStatus`). `<CountryField>`,
`<StateField>`, `<CityField>` in `src/lib/components/` are thin MUI
wrappers that call these hooks and render `Autocomplete`/`TextField`.

Consumers who don't want MUI import from `react-country-state-fields/headless`
instead of the package root — same `VisitorAPIComponents` provider,
just the hooks without any pre-built UI. This is why `@mui/material`,
`@emotion/react`, and `@emotion/styled` are `peerDependenciesMeta`
`optional: true` in package.json — they're only required if you
import the MUI components from the default entry point.

When adding new field logic: put the stateful/cascading logic in a
hook under `hooks/`, and keep the corresponding MUI component in
`components/` as a thin render layer on top. Don't let MUI imports
leak into `hooks/` or `headless.js` — that's what keeps the headless
entry point genuinely MUI-free (verify with
`grep -rn "@mui\|@emotion" src/lib/hooks src/lib/headless.js` after
changes).

## Public API

```jsx
import { CountryField, StateField, CityField, VisitorAPIComponents } from 'react-country-state-fields';

<VisitorAPIComponents
  projectId="<visitorapi-project-id>"
  handleCountryChange={countryObj => …}
  handleStateChange={stateObj => …}
  handleCityChange={cityObj => …}
>
  <CountryField label="Country/Territory" />
  <StateField  label="State/Province" />
  <CityField   label="City" />
</VisitorAPIComponents>
```

- `<VisitorAPIComponents>` is an invisible context provider that
  calls the VisitorAPI service once and broadcasts country/state/city
  to any nested field. Also exposes `loading`/`error` on
  `VisitorAPIContext`. Other arbitrary children render through.
- `<CountryField>`, `<StateField>`, `<CityField>` are MUI-based
  selects. State/city fall back to a free-text input where the
  underlying data source has no subdivisions for that selection.
- Country/state/city object shape: `{ code, label }`, e.g.
  `{ code: "US", label: "United States" }`, `{ code: "CA", label: "California" }`.
  City objects have no distinct ISO code in the dataset, so `code`
  and `label` are both the city name.
- Data source: the `country-state-city` npm package (not a
  hand-maintained `countries.json` anymore) — 250 countries, 5,000+
  states, 150,000+ cities. See `src/lib/data/locationData.js` for the
  adapter that normalizes its `{isoCode, name}` shape into this
  package's `{code, label}` shape.
- Style customization: `<CountryField>`/`<StateField>`/`<CityField>`
  accept `sx`, `className`, `variant`, `fullWidth`, `size`, passed
  through to the underlying MUI components. `<CountryField>` also
  accepts `showFlag` (default `true`) and `renderFlag` to
  disable/replace the `flagcdn.com` flag icon.
- `<CityField>` defaults to `freeSolo` (MUI Autocomplete prop): users
  can type and commit a city that isn't in the suggested list, since
  city data has no ISO standard and the bundled dataset is never
  fully complete. Set `freeSolo={false}` to require a list selection.
  It also accepts a `cities` prop (array of `{code, label}`) that
  overrides the auto-cascaded country-state-city list entirely, for
  consumers whose valid cities are a specific known set (service
  area, branch locations) rather than "any city in this state."
  `getOptionLabel` on that field must handle both option objects and
  raw strings (freeSolo passes the in-progress typed text through it
  too), don't remove the `typeof option === 'string'` check.
- Headless hooks (`useCountryField`, `useStateField`, `useCityField`,
  `useVisitorLocationStatus`) are exported both from the package root
  and from `react-country-state-fields/headless` (MUI-free import) —
  see "Headless architecture" below.

## Stack

- React 18, MUI 5 (`@mui/material` + emotion) — both **peer
  dependencies**, not bundled. Kept in `devDependencies` for local
  build/test/demo.
- `country-state-city` — country/state/city data source (regular
  dependency, not a peer; it's an internal implementation detail).
- `visitorapi` (the sibling npm SDK) — used internally by
  `<VisitorAPIComponents>` to fetch IP location.
- Build via Babel CLI (not webpack/rollup); `babel src/lib --out-dir dist`,
  followed by a cleanup step that deletes any `*.test.js`/`testUtils.js`
  that `--copy-files` would otherwise carry into `dist/` (Babel CLI's
  `--ignore` skips compiling ignored files but `--copy-files` still
  raw-copies them, so exclusion has to happen post-build).
- Demo / dev runner uses Create React App (`react-scripts`).
- Tests: Jest + `@testing-library/react` + `@testing-library/user-event`
  (v14, needs the `userEvent.setup()` API — don't downgrade to v13).

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
