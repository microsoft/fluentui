# @fluentui/react-checkbox

**Checkbox component for [Fluent UI React](https://aka.ms/fluentui-storybook)**

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

Checkboxes give people a way to select one or more items from a group, or switch between
two mutually exclusive options (checked or unchecked).

### Usage

Import Checkbox:

```js
import { Checkbox } from '@fluentui/react-checkbox';
```

#### Examples

```jsx
<Checkbox label="Default Checkbox" />
<Checkbox disabled label="Disabled" />
<Checkbox shape="circular" label="Circular" />
```

See [Fluent UI Storybook](https://aka.ms/fluentui-storybook) for more detailed usage examples.

Alternatively, run Storybook locally with:

1. `yarn start`
2. Select `react-checkbox` from the list.

### Specification

See [Spec.md](./Spec.md).

### Migration Guide

If you're upgrading to Fluent UI v9 see [MIGRATION.md](./MIGRATION.md) for guidance on updating to the latest Checkbox implementation.
