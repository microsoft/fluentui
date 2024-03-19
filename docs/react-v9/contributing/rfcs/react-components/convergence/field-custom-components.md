# RFC: Field with custom components

- Author: _behowell_
- Contributors: _layershifter_
- PR: https://github.com/microsoft/fluentui/pull/26338

## Background

The FluentUI library currently has separate `*Field` components for each of the form controls that may go into a field, such as `InputField` and `SliderField`. This provides a simple API to include a label and validation message with any of the library's components.

One piece of feedback we've had for the Field controls is that it is difficult to use custom controls within a Field. It requires creating a custom control that uses the `useField_unstable`, etc. hooks, since there is no standalone Field component.

## Problem statement

Field requires integration between its parts to ensure that the label, error message, and hint are all associated with the control.

## Detailed Design or Proposal

Implement a single `<Field>` component, which does the layout for field, including slots for `label`, `validationMesssage`, and `hint`.

The control is the child, and Field adds the following props to the child using cloneElement (or a render function):

- `id` (used as the label's `htmlFor`; generated if the child does not have an `id` already)
- `aria-labelledby`
- `aria-describedby`
- `aria-invalid` (when `validationState="error"` is set on the field)
- `aria-required` (when `required` is set on the field)

Remove the existing `InputField`, `SliderField`, etc. controls, as it would be possible to put them inside the Field component.

Add add `FieldContext` around the children of Field to allow for better integration with built-in controls. For example, the `Input` control could have its size match the field's `size` prop by default.

### Example

```jsx
<>
  <Field label="FluentUI Input" validationState="error">
    <Input defaultValue="..." />
  </Field>

  <Field label="Intrinsic input" validationState="error">
    <input defaultValue="..." />
  </Field>

  <Field label="Custom component" validationState="error">
    <MyInput defaultValue="..." />
  </Field>

  <Field label="Render props" validationState="error">
    {props => (
      <div>
        <MyInput defaultValue="..." {...props} />
      </div>
    )}
  </Field>
</>
```

### Pros

- The same API works for fluentui components (`<Input />`, `<Slider />`, etc.), intrinsic elements (`<input />`), and custom components (`<MyInput />`).
- Works the same way that `Tooltip`, `MenuTrigger`, and other triggers apply props to children -- no new concepts in the library.
- No restrictions on the JSX tree of child (e.g. can put arbitrary JSX elements as a child of the Field if using a render function).
- Less work maintaining and documenting many `*Field` components.

### Cons

- Does not set the intrinsic `required` prop on the child input when set on the Field; uses `aria-required` instead.
- No type safety or checking that the contract was followed: TypeScript doesn't support checking that a JSX child supports certain props.

### Open questions

- Should Field generate an `id` and include it on the props set using cloneElement?
  - **Pros**
    - Allows `htmlFor` to be set by default, instead of relying on `aria-labelledby`. [How important is this?]
  - **Cons**
    - May be unexpected that an `id` is added to a control without it being written out. Could theoretically have an effect on styling.
    - To work properly, Field must also be able to _read_ any existing `id` prop on its child, which is not possible when the child is a render function.

## ❌ Discarded Option A: Add `makeField()` to create custom Field components

Uses the Higher-Order Component approach to wrap a given component to surround it with Field.

Basically, it lets people make their own `InputField`-type component.

### Example

```jsx
const MyInputField = makeField(MyInput);

<MyInputField label="..." validationState="error" defaultValue="..." />;
```

### Pros

- It's a very small addition to what is currently implemented.
- Uses `htmlFor` instead of `aria-labelledby` by default.
- Allows for tighter integration with our built-in controls via `InputField`, `CheckboxField`, etc.
  - Example: `<InputField size="large">` applies the size to both the Label and the Input.
- TypeScript can check at compile time that the given control supports the necessary props.

### Cons

- Heavier-weight API for custom field components: need to define the component outside of the JSX tree.
- Very restrictive on the JSX tree of child (e.g. can't wrap with a `<div>` or something, without encapsulating that in another wrapper component).
- Doesn't work with intrinsic `<input>` without a wrapper control.

## ❌ Discarded Option B: Add `field()` to create a context-aware component for Field

Adds a `<Field>` component similar to the main proposal, except it doesn't auto-apply props to child.

The wrapper `field` is similar to `makeField`, except the wrapper gets props from `FieldContext` and merges them on the child. Unlike `makeField`, it doesn't modify the render tree of the wrapped component.

### Example

```jsx
const MyInputInField = field(MyInput, props => mapMyInputFieldProps(props));

<>
  <Field label="..." validationState="error">
    <MyInputInField defaultValue="..." />
  </Field>
  <Field label="..." validationState="error">
    <div>
      <MyInputInField defaultValue="..." />
    </div>
  </Field>
</>;
```

### Pros

- Less restrictive on the JSX tree of child (wrapping in a `<div>` is easy).

### Cons

- Heavier weight API for custom field components.
- No type checking that the child of Field knows about FieldContext.
- Adding a new prop for children is a breaking change, but it would be caught by compiler.

## ❌ Discarded Option C: Field building blocks

Add `<Field>`, `<FieldLabel>` and `<FieldMessage>` components, with no "magic" prop settings. All relational attributes would need to be manually hooked up.

### Example

```jsx
const id = useId('my-input');

<Field orientation="horizontal">
  <FieldLabel htmlFor={id} required>
    Example Field
  </FieldLabel>
  <MyInput id={id} defaultValue="..." required aria-invalid aria-describedby={`${id}-message ${id}-hint`} />
  <FieldMessage id={`${id}-message`} state="error">
    Input is invalid
  </FieldMessage>
  <FieldMessage id={`${id}-hint`}>Here's some hint text</FieldMessage>
</Field>;
```

### Pros

- No magic: doesn't call cloneElement to automatically apply aria props to the control.
- Very customizable.

### Cons

- Significantly different API for built-in controls (`InputField`, etc.) vs. custom controls.
- Not accessible by default: requires author add correct aria props to each element.
- Cumbersome to hook up all of the pieces.
