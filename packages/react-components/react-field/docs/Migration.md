# Field Migration Guide

## Migration from v8

Many form controls in v8 have `label` and `errorMessage` props. The v9 form controls generally don't include those props, and instead require wrapping with `<Field>` to add a label and error message.

### Prop mapping

- `label` on the control => Wrap with `<Field label="...">`
- `errorMessage` on the control => Wrap with `<Field validationMessage="...">`

### Example

#### v8

```jsx
<TextField label="Name" errorMessage="Please enter a name" value={name} onChange={onNameChanged} />
```

#### v9

```jsx
<Field label="Name" validationMessage="Please enter a name">
  <Input value={name} onChange={onNameChanged} />
</Field>
```

### Special case

For `Checkbox` in v9, it is recommended to continue using `<Checkbox label="..." />`, and not to use `Field` to label the `Checkbox`. It is still ok to use `Field` if an error message is needed, or if required for layout in a form. E.g.:

```jsx
<Field validationMessage="Please agree to the terms and conditions">
  <Checkbox label="I agree" />
</Field>
```

See individual form components for more detailed migration guides.

## Migration from v0

The v0 `FormField` component is the equivalent to the v9 `Field`. Additionally, many components in v0 have `Form___` versions (such as `<FormInput />`). In v9, these are instead standard inputs wrapped with `<Field>` (such as `<Field><Input /></Field>`).

### Prop mapping for `FormField` => `Field`:

- `accessibility` => Not supported (Field is acessible as a form field by default)
- `as` => `as` (only `div` is supported)
- `control` slot => The child of the `Field`
- `errorMessage` => `validationMessage`
- `inline` => `orientation="horizontal"` (note: still uses a block layout but puts the label to the left instead of above)
- `label` => `label`
- `message` => `hint`, or `validationMessage` with `validationState` set to `"success"` or `"warning"`
- `name` => Not supported (set `name` on the child input element if needed)
- `required` => `required`
- `type` => Not supported (set `type` on the child input element if needed)

### Example

#### v0

```jsx
<FormInput label="First name" name="firstName" errorMessage="Error message" required />
```

#### v9

```jsx
<Field label="First name" validationMessage="Error message" required>
  <Input name="firstName" />
</Field>
```
