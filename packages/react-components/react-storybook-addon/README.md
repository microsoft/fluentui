# @fluentui/react-storybook-addon

**Storybook addon for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

## ✨ Features

### Toolbar/Tools

- Adds a Fluent theme switcher:
  - ![Fluent Theme Switcher](https://user-images.githubusercontent.com/20744592/138872560-8ef40c25-193c-47db-a216-7c1e86fe8cda.png)

### Theme Management in Storybook Globals

Exports types and utilities to set and consume the correct Fluent theme in Storybook globals. Here's an example picker that sets the Fluent theme in Storybook globals.

```tsx
import * as React from 'react';
import { themes, setGlobalTheme, FluentStoryContext, THEME_ID } from '@fluentui/react-storybook-addon';

// Storybook context which can be accessed, for example, in decorators
// https://storybook.js.org/docs/react/writing-stories/decorators#context-for-mocking
export const ThemePicker: React.FC<{ context: FluentStoryContext }> = ({ context }) => {
  const handleChange = e => {
    setGlobalTheme(e.target.value);
  };

  const selectedTheme = themes.find(theme => theme.id === context.globals[THEME_ID]);

  return (
    <select onChange={handleChange}>
      {themes.map(theme => (
        <option selected={selectedTheme.id === theme.id} value={theme.id}>
          {theme.label}
        </option>
      ))}
    </select>
  );
};
```

### Shared Storybook Preview Styles

The package ships a `styles.css` file with shared Storybook preview styles (docs layout, table formatting, theme-aware backgrounds, etc.). Import it once in your Storybook `preview.js`/`preview.ts`:

```js
// .storybook/preview.js
import '@fluentui/react-storybook-addon/styles.css';
```

### Augmented Docs Blocks

This presets uses [custom docs container and page](https://storybook.js.org/docs/7/writing-docs/autodocs#customize-the-docs-container) for unified FluentUI experience including:

- table of contents
- theme switcher
- dir switcher
- custom ArgsTable
  - `Slot` api rendering
  - native props support

## Getting Started

### Installation

To install the addon, run:

```sh
yarn add -D @fluentui/react-storybook-addon
```

### Configuration

Add the following content to `.storybook/main.js`:

```js
module.exports = {
  addons: ['@fluentui/react-storybook-addon'],
};
```

### Advanced Configuration (opt-in `stateDataAttributes`)

The addon can be registered with an options object (instead of a bare string) to opt into extracting
all `data-*` members declared on the immediate properties of exported component `*State` types and surfacing them as
read-only Storybook ArgTypes rows, alongside the framework's native (e.g. react-docgen-typescript) ArgTypes:

```js
// .storybook/main.js
const path = require('node:path');

module.exports = {
  addons: [
    {
      name: '@fluentui/react-storybook-addon',
      options: {
        stateDataAttributes: {
          packageRoot: path.resolve(__dirname, '../../my-package'),
        },
      },
    },
  ],
};
```

Notes:

- **Disabled by default.** Omitting `stateDataAttributes` entirely leaves native Storybook behavior untouched.
- **`packageRoot` must be an absolute path** (e.g. derived from `__dirname` as above). A relative path throws at
  build time.
- **`packageRoot` must already be built.** Extraction reads the package's on-disk `.d.ts` rollups; it never falls
  back to scanning TypeScript source, so the package must be built (its `exports` map targets must exist on disk)
  before Storybook is started or built.
- Extraction discovers entry points exclusively from `packageRoot`'s `package.json` `exports` map: only export
  conditions with a direct string `types` target (e.g. `"./button": { "types": "./dist/button.d.ts" }`) are scanned.
  Nested `import.types`/`require.types` forms, the `"./package.json"` self-reference, and any non-object export
  values are ignored.
- Every immediate state property is inspected, including optional slots.
- Rows for `root` keep raw keys and use the `Data attributes` category. For non-root properties, internal keys are
  `<slot>.<attribute>`, visible names remain raw `data-*`, and the category is `Data attributes · <slot>`.
- Only names that are genuinely exported from a scanned `.d.ts` entry point are surfaced; declarations that merely
  happen to appear in the file (e.g. a non-exported helper type used only to compose an exported `*State` type) are
  ignored.
- When two entry points declare the same component key with identical extracted metadata, the duplicate is silently
  deduped. When they declare the same key with **different** metadata, extraction throws a conflicting-metadata
  error identifying both declaration files.
- Native React prop extraction remains responsible for normal props; this feature only adds state data attribute rows.
- When a generated row and a native row have an exact key collision, **the native row wins**.
- The optional TypeScript, react-docgen, and Storybook React peers are loaded only when `stateDataAttributes` is enabled.
- Restart Storybook after rebuilding `packageRoot` so the extracted rows are refreshed.

## Development

1. Run the inner loop from the monorepo root with `yarn workspace @fluentui/react-storybook-addon storybook`.

   - 💡 This will run the `prestorybook` script that compiles the addon implementation with all of its direct dependencies within the monorepo, so it can be consumed by the local Storybook.

2. After making any changes to the implementation, manually run `yarn workspace @fluentui/react-storybook-addon build` to reflect those changes in your local Storybook.

## Parameter Configuration

Three custom optional parameters can be set to alter the behavior of the addon:

1. `dir` - Determines whether to render the story in `ltr` or `rtl` mode. Default is `undefined`.
2. `fluentTheme` - Determines whether to render the story theme in `web-light`, `web-dark`, `teams-high-contrast`, `teams-dark`, or `teams-light`. Setting this parameter will disable the ability to dynamically change the theme within the story canvas or doc.
3. `mode` - When set to `vr-test`, this removes the injected padding and background theme that's automatically applied from the rendered story. Default is `default`.

```js
import { FluentParameters, parameters } from '@fluentui/react-storybook-addon';
import { Button } from '@fluentui/react-components';

export const Button = () => <Button>Hello World</Button>;

export const ButtonDarkMode = {
  render: Button,
  parameters: { fluentTheme: 'web-dark' } as FluentParameters, // Story renders in Dark mode.
};

export const ButtonHighContrast = {
  render: Button,
  parameters: { fluentTheme: 'teams-high-contrast', mode: 'vr-test' } as FluentParameters, // Story renders in High Contrast mode without injected padding and background style.
};

export const ButtonRTL = {
  render: Button,
  // Parameters identity function will have all TS type annotations built in for intellisense.
  parameters: parameters({ fluentTheme: 'web-light', dir: 'rtl', mode: 'vr-test' }), // Story renders in RTL, Web light mode and without injected padding and background style.
};
```
