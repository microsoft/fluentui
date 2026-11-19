# @fluentui/workspace-plugin

nx private monorepo plugin which contains:

- generators
- executors
- migrations
- other things...

## Usage

Run following to get all plugin functionality:

`yarn nx list @fluentui/workspace-plugin`

## CSS Modules entry (`./css-modules`)

Experimental. v9 packages with CSS Modules style hooks get a `./css-modules` export that has the same API as the root
entry, but every component uses its CSS Modules style hook instead of the Griffel one. Component sources are not
changed: the hooks are swapped at build time.

### Authoring

Every Griffel style hook has a CSS Modules style hook next to it. Both export the same names (`use*Styles_unstable`,
`*ClassNames`):

```
components/Button/
├── Button.tsx                      # imports './useButtonStyles.styles' (Griffel), unchanged
├── useButtonStyles.styles.ts       # Griffel hook
├── useButtonStyles.styles.css.ts   # CSS Modules hook
└── Button.module.css
```

The package must declare `"sideEffects": ["**/*.css"]`. The build executor then copies `src/**/*.css` into `lib` and
`lib-commonjs`.

Keep the two hooks in sync: a PR changing `X.styles.ts` must also change `X.styles.css.ts` or a stylesheet it imports.
The `CSS Modules co-change` workflow (`scripts/github/src/css-modules-co-change.js`) checks this. Add the
`CSS Modules: no change needed` label when the change doesn't affect styles.

The check doesn't see style changes made outside `*.styles.ts`, for example in shared Griffel helpers
(`createFocusOutlineStyle`, `typographyStyles`) or tokens. Mirror those in the CSS Modules stylesheets by hand.

### Export map (`export-maps-sync` generator)

`yarn nx g @fluentui/workspace-plugin:export-maps-sync` adds the `./css-modules` export to:

- packages shipping CSS (`sideEffects` includes `*.css`);
- packages opting in via `project.json#metadata.exportMap.cssModules: true`. This is for packages without CSS of their
  own that re-export packages that have it, like the `@fluentui/react-components` suite.

```json
"./css-modules": {
  "import": { "types": "./dist/css-modules.d.ts", "default": "./lib/css-modules/index.js" },
  "require": { "types": "./dist/css-modules.d.cts", "default": "./lib-commonjs/css-modules/index.cjs" }
}
```

### Build (`build` executor)

For a package whose `package.json` declares `./css-modules`, after the regular compilation
(`executors/build/lib/css-modules-entry.ts`):

1. Reads the ESM output (`lib/**/*.js`) and checks that every Griffel style hook (`X.styles.js`) has a CSS Modules
   style hook (`X.styles.css.js`) exporting the same names, and that every CSS Modules style hook has a Griffel one.
   The build fails otherwise.
2. Builds the import graph of the ESM output. Named imports are resolved through barrel
   re-exports to the modules defining them.
3. Marks as _style dependent_ every module that uses a Griffel style hook or imports a dependency that ships
   `./css-modules`. Then everything that depends on those modules
   gets marked too.
4. Writes a copy of each style dependent module to `lib/css-modules/<same path>` and rewrites its imports:
   - `./X.styles.js` becomes the CSS Modules hook `X.styles.css.js`;
   - style dependent modules are imported from within `css-modules/`;
   - every other module is imported from the main output, so it is shared with the root entry;
   - `@fluentui/react-x` becomes `@fluentui/react-x/css-modules` when that package ships the entry.
5. Applies the same rewrite to the CommonJS output (`lib-commonjs/css-modules`, same modules).
6. Writes `dist/css-modules.d.ts` / `.d.cts`, which re-export the root declarations.

```js
// lib/components/Button/Button.js (root entry, Griffel)
import { useButtonStyles_unstable } from './useButtonStyles.styles.js';
// lib/css-modules/components/Button/Button.js (generated)
import { useButtonStyles_unstable } from '../../../components/Button/useButtonStyles.styles.css.js';
import { useButton_unstable } from '../../../components/Button/useButton.js'; // shared with the root entry
```

The build fails if a style dependent module defines a React context (`createContext`), because the context would get
a second instance in `css-modules/`. To fix it, move whatever the context needs from styled modules into a module
without styles. For example, `react-table` keeps `defaultColumnSizingState` in its own file.
