# @fluentui/react-spinbutton

**SpinButton component for [Fluent UI React](https://react.fluentui.dev/)**

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

SpinButtons are used to allow numeric input bounded between minimum and maximum values with buttons to increment and decrement the input value. Values can also be manipulated via the keyboard.

### Usage

Import SpinButton:

```js
import { SpinButton } from '@fluentui/react-spinbutton';
```

#### Examples

```jsx
<SpinButton defaultValue={5}/>
<SpinButton value={value} onChange={onSpinButtonChange}/>
```

See [Fluent UI Storybook](https://react.fluentui.dev/) for more detailed usage examples.

Alternatively, run Storybook locally with:

1. `yarn start`
2. Select `react-spinbutton` from the list.

### Specification

See [Spec.md](./Spec.md).

### Migration Guide

If you're upgrading to Fluent UI v9 see [MIGRATION.md](./MIGRATION.md) for guidance on updating to the latest SpinButton implementation.
