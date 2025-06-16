# @fluentui/react-spinbutton

**SpinButton component for [Fluent UI React](https://react.fluentui.dev/)**

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

When upgrading to Fluent UI v9 see the [upgrade guide](https://react.fluentui.dev/?path=/docs/concepts-migration-from-v8-components-spinbutton-migration--docs) for guidance on updating to the latest SpinButton implementation.
