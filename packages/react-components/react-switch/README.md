# @fluentui/react-switch

**Switch components for [Fluent UI React](https://react.fluentui.dev/)**

The `Switch` control enables users to trigger an option on or off through interacting with the component.

## Usage

To import Switch:

```js
import { Switch } from '@fluentui/react-components';
```

### Examples

```jsx
<Switch />
<Switch defaultChecked required />
<Switch checked onChange={onChange} />
<Switch disabled />
<Switch label="Enable dark mode" labelPosition="after" />
```

See [Fluent UI Storybook](https://react.fluentui.dev/) for more detailed usage examples.

Alternatively, run Storybook locally with:

1. `yarn start`
2. Select `react-switch` from the list.

### Specification

See [SPEC.md](./Spec.md).

### Migration Guide

If you're upgrading to Fluent UI v9 see [MIGRATION.md](./MIGRATION.md) for guidance on updating to the latest Switch implementation.
