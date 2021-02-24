# @fluentui/react-components

**Converged Fluent UI React components**

This is a suite package for converged components and related utilities. It is a result of a dedupe effort for `@fluentui/react` and `@fluentui/react-northstar`.

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

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
    <Button primary>I am a button.</Button>
  </FluentProvider>,
  document.getElementById('root'),
);
```
