# @fluentui/react-progress

**React Progress components for [Fluent UI React](https://react.fluentui.dev/)**

## STATUS: Alpha

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

## Usage

To import `Progress`:

```js
import { Progress } from '@fluentui/react-progress';
```

Once the Progress component graduates to a production release, the component will be available at:

```js
import { Progress } from '@fluentui/react-components';
```

### Examples

```jsx
const ProgressExample = () => {
  return <Progress thickness="large" value={0.5} />;
};
```

#### Using ProgressField

The `ProgressField` component is a wrapper around the `Progress` component that allows the user to add a `label`, `hint`, `validationMessage`, and `validationState` to the `Progress` component. You can pass these props, as well as the regular `Progress` props to a `ProgressField` component.

To import `ProgressField`:

```js
import { ProgressField } from '@fluentui/react-field';
```

```jsx
const ProgressFieldExample = () => {
  return (
    <ProgressField
      label="Determinate Progress"
      hint="This is a determinate Progress with description"
      value={0.5}
      validationState="warning"
    />
  );
};
```
