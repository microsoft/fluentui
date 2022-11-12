# @fluentui/react-storybook-addon

**Storybook addon for Fluent UI React [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

## ✨ Features

**Toolbar/Tools**

- adds fluent theme switcher
  - ![Fluent Theme Switcher](https://user-images.githubusercontent.com/20744592/138872560-8ef40c25-193c-47db-a216-7c1e86fe8cda.png)

**Theme management in storybook globals**

Exports types and utilities to set and consume the correct Fluent theme in storybook globals. Here's some example picker
that sets the Fluent them in storybook globals.

```tsx
import * as React from 'react';
import { themes, setGlobalTheme, FluentStoryContext, THEME_ID } from '@fluentui/react-storybook-addon';

// storybook context which can be accessed for example in decorators
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

## Getting Started

### Installation

> **NOTE:** this package is not being published yet

```sh
yarn add -D @fluentui/react-storybook-addon
```

### Configuration

Add following content to .storybook/main.js:

```js
module.exports = {
  addons: ['@fluentui/react-storybook-addon'],
};
```

## Development

1. Run inner loop from monorepo root `yarn workspace @fluentui/react-storybook-addon storybook`

   - > 💡 this will run `prestorybook` script that compiles addon implementation with all of its direct dependencies that live within monorepo, so it can be consumed by local storybook

2. Every time you do any change to implementation, after you ran your local storybook you'll need to manually run `yarn workspace @fluentui/react-storybook-addon build` to reflect those changes

## Parameter Configuration

- Three custom optional parameters can be set to alter behavior of the addon
  1. `dir` - determines whether to render story in `ltr` or `rtl` mode. Default is `undefined`.
  2. `fluentTheme` - determines whether to render story theme in `web-light`, `web-dark`, `teams-high-contrast`, `teams-dark`, or `teams-light`. Setting this
     parameter will disable ability to dynamically change the theme within story canvas or doc.
  3. `mode` - when set to `vr-test`, this removes injected padding and background theme that's automatically applied from rendered story. Default is `default`.

```js
import { FluentParameters, parameters } from '@fluentui/react-storybook-addon';
import { Button } from '@fluentui/react-components';

export const Button = () => <Button> Hello World </Button>;

export const ButtonDarkMode = {
  render: Button,
  parameters: { fluentTheme: 'web-dark' } as FluentParameters, // story renders in Dark mode.
};

export const ButtonHighContrast = {
  render: Button,
  parameters: { fluentTheme: 'teams-high-contrast', mode: 'vr-test' } as FluentParameters; // story renders in High Contrast mode without injected padding and background style.
}

export const ButtonRTL = {
  render: Button,
  // parameters identity function will have all TS type annotations built in for intellisense.
  parameters: parameters({ fluentTheme: 'web-light', dir: 'rtl', mode: 'vr-test'}), // story renders in RTL, Web light mode and without injected padding and background style.
};

```
