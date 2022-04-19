# SpinButton Migration

## Migration from v8

- `value: string` => `value: number`. `value` is now a number rather than a string.
- `defaultValue: string` => `defaultValue: number`. `defaultValue` is now a number.
- `min` => `min`
- `max` => `max`
- `step` => `step`
- `precision` => `precision`
- `onChange(event: React.SyntheticEvent<HTMLElement>, newValue? string)` => `onChange(event: SpinButtonChangeEvent, value: SpinButtonOnChangeData)`
- `onValidate` => Not supported.
- `onIncrement` => use `onChange`.
- `onDecrement` => use `onChange`.
- `label` => use `Label` control with `htmlFor` and `id`.
- `labelPosition` => use `Label` control
- `ariaLabel` => use `aria-label` instead.
- `ariaDescribedBy` => use `aria-describedby` instead.
- `ariaPositionInSet` => use `aria-posinset` instead.
- `ariaSetSize` => use `aria-setsize` instead.
- `ariaValueNow` => remove, set internally by SpinButton
- `ariaValueText` => remove, set internally by SpinButton
- `iconProps` => use `Icon` control

### Migrating Custom Suffixes

`SpinButton` v9 introduces a new prop called `displayValue` that may be used in conjunction with `value` to display a formatted value in `SpinButton`. To display a value with a custom suffix (or prefix or an entirely different name) just provide the `displayValue` prop to your `SpinButton`:

```jsx
const [value, setValue] = React.useState(0);
const [displayValue, setDisplayValue] = React.useState('0 cm');

const onChange = (e: SpinButtonChangeEvent, data: SpinButtonOnChangeData): void => {
  if (data.value) {
    setValue(data.value);
    setDisplayValue(`${data.value} cm`);
  }
};

<SpinButton value={value} displayValue={displayValue} onChange={onChange} />;
```

### Migrating onIncrement/onDecrement

`SpinButton` v9 simply provides a change handler rather than handlers for change, increment and decrement. To handle increment and decrement cases compare the incoming value with the current value:

```jsx
const [value, setValue] = React.useState(0);

const onChange = (e: SpinButtonChangeEvent, data: SpinButtonOnChangeData): void => {
  if (data.value) {
    if (data.value > value) {
      // onIncrement(e, data);
    } else {
      // Don't need an if clause here as onChange only fires when the value changes
      // so it must be different.
      // onDecrement(e, data);
    }
  }
};

<SpinButton value={value} onChange={onChange} />;
```

## Migration from v0

v0/Northstar does not have a `SpinButton` equivalent so there are no migration steps.
