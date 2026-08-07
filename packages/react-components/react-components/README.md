# @fluentui/react-components

**Converged Fluent UI React components**

This is a suite package for converged components and related utilities. It is a result of a dedupe effort for `@fluentui/react` and `@fluentui/react-northstar`.

### Usage

Add @fluentui/react-components to a project:

```sh
yarn add @fluentui/react-components
```

To use a component, import the theme stylesheet once per document, add a `FluentProvider` with a theme class close to the root of your application and then instantiate components inside the provider's subtree:

```js
import React from 'react';
import ReactDOMClient from 'react-dom/client';
import '@fluentui/react-tailwind-theme/styles.css';
import { FluentProvider, teamsLightThemeClassName, Button } from '@fluentui/react-components';

ReactDOMClient.createRoot(document.getElementById('root')).render(
  <FluentProvider themeClassName={teamsLightThemeClassName}>
    <Button appearance="primary">I am a button.</Button>
  </FluentProvider>,
);
```

### Docs

Docs are hosted at https://react.fluentui.dev/.
