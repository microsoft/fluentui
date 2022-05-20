# @fluentui/react-input

**React Input components for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

Inputs give people a way to enter and edit text.

### Usage

Import Input:

```js
import { Input } from '@fluentui/react-components';
```

#### Examples

```jsx
<Input defaultValue="Hello, World!" />
<Input value={value} onChange={onInputChange} />
```

See [Fluent UI Storybook](https://aka.ms/fluentui-storybook) for more detailed usage examples.

Alternatively, run Storybook locally with:

1. `yarn start`
2. Select `react-input` from the list.

### Specification

See [Spec.md](./Spec.md)

### Upgrade Guide

If you're upgrading to Fluent UI v9 see the upgrade guide in [Storybook](https://aka.ms/fluentui-storybook) under Concepts > Upgrading.
