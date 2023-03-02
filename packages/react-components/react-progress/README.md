# @fluentui/react-progress

**React Progress components for [Fluent UI React](https://react.fluentui.dev/)**

## Usage

To import `ProgressBar`:

```js
import { ProgressBar } from '@fluentui/react-components';
```

### Examples

```jsx
const ProgressBarExample = () => {
  return <ProgressBar thickness="large" value={0.5} />;
};
```

#### Using Field

The `Field` component is a wrapper around the `ProgressBar` component that allows the user to add a `label`, `hint`, `validationMessage`, and `validationState` to the `ProgressBar` component. You can pass these props, as well as the regular `ProgressBar` props to a `Field` component.

To import `Field`:

```js
import { Field } from '@fluentui/react-field';
```

```jsx
const FieldExample = () => {
  return (
    <Field
      label="Determinate ProgressBar"
      hint="This is a determinate Progress with description"
      value={0.5}
      validationState="warning"
    >
      <ProgressBar />
    </Field>
  );
};
```
