# @fluentui/react-components

**Converged Fluent UI React components**

This is a suite package for converged components and related utilities. It is a result of a dedupe effort for `@fluentui/react` and `@fluentui/react-northstar`.

The components are available for limited production use, please contact us if you intend to use them in your product. The APIs might change before final release.

### Usage

Add @fluentui/react-components to a project:

```sh
yarn add @fluentui/react-components
```

To use a component, add a `FluentProvider` with a theme close to the root of your application and then instantiate components inside the provider's subtree:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { FluentProvider, teamsLightTheme, Button } from '@fluentui/react-components';

ReactDOM.render(
  <FluentProvider theme={teamsLightTheme}>
    <Button appearance="primary">I am a button.</Button>
  </FluentProvider>,
  document.getElementById('root'),
);
```

### Docs

Docs are hosted at https://aka.ms/fluentui-storybook.
