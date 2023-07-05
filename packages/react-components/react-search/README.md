# @fluentui/react-search

**React Search components for [Fluent UI React](https://react.fluentui.dev/)**

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

SearchBox is an input designated for the purpose of search.

### Usage

Import SearchBox:

```js
import { SearchBox } from '@fluentui/react-components';
```

#### Examples

```jsx
<SearchBox defaultValue="Hello, World!" />
<SearchBox value={value} onChange={onInputChange} />
```

See [Fluent UI Storybook](https://react.fluentui.dev/) for more detailed usage examples.

Alternatively, run Storybook locally with:

1. `yarn start`
2. Select `react-input` from the list.

### Specification

See [Spec.md](./docs/Spec.md)

### Upgrade Guide

If you're upgrading to Fluent UI v9 see the upgrade guide in [Storybook](https://react.fluentui.dev/) under Concepts > Upgrading.
