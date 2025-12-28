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
