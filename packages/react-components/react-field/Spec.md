# @fluentui/react-field Spec

## Background

`Field` is used to add a label, validation text, and helper text to form input components, such as `Input`, `Combobox`, `RadioGroup`, etc.

Epic issue tracking implementation: https://github.com/microsoft/fluentui/issues/19627

## Prior Art

_Include background research done for this component_

- _Link to Open UI research_
- _Link to comparison of v7 and v0_
- _Link to GitHub epic issue for the converged component_

## Sample Code

Each input component has a field version (such as `InputField`, `ComboboxField`, etc.) that includes the features of Field added to that component.

```jsx
<>
  <InputField
    // Field-specific props
    label="This is the field label"
    fieldOrientation="horizontal"
    status="error"
    statusText="This is error text"
    // All props and slots of the underlying Input component are supported
    required
    size="small"
    contentBefore="$"
    contentAfter=".00"
  />
  {/* Other component types are supported, such as: */}
  <RadioGroupField label="Radio group field" status="error" statusText="Error text">
    <Radio value="one" label="Option one" />
    <Radio value="two" label="Option two" />
    <Radio value="three" label="Option three" />
  </RadioGroupField>
  <ComboboxField label="Combobox field" status="error" statusText="Error text">
    <Option value="one">Option one</Option>
    <Option value="two">Option two</Option>
    <Option value="three">Option three</Option>
  </ComboboxField>
  <SliderField label="Slider field" status="error" statusText="Error text" />
  <SpinButtonField label="Spin button field" status="error" statusText="Error text" />
</>
```

These field versions of the components use a common set of Field hooks, and can be defined using very little code.

```ts
export type InputFieldProps = FieldProps<typeof Input>;

export const InputField: ForwardRefComponent<InputFieldProps> = React.forwardRef((props, ref) => {
  const state = useField_unstable(props, ref, Input);
  useFieldStyles_unstable(state);
  return renderField_unstable(state);
});

InputField.displayName = 'InputField';
```

## Components

The following field components will be defined. If more form components are added in the future, they should also include a Field version.

- `CheckboxField`
  - This will not use the Field's `label`, and instead forward the `label` prop to the underlying `Checkbox`.
- `ComboboxField`
- `DropdownField`
- `InputField`
- `RadioGroupField`
- `SelectField`
- `SliderField`
- `SpinnerField`
- `SwitchField`
  - _Open question:_ how should this handle the `label`? Should it forward to the underlying `Switch`, or keep the label in the same place as the field's label? Might need a prop to control this behavior.
- `TextareaField`

## Variants

- **Orientation**: The `fieldOrientation` prop affects the layout of the label and field component:
  - `vertical` (default) - label comes above the field component
  - `horizontal` - label is to the left of the field component, and is 33% the width of the field (this allows multiple stacked fields to all align their labels)
- **Status**: The `status` prop affects the icon and color used by the `statusText`:
  - `error` - Red x icon, and red status text
  - `warning` - Yellow exclamation icon
  - `success` - Green check icon
  - `undefined` (default): Status text is normal color, and there is no status icon
- **Error**: Some control types (like `Input` and `Combobox`) have a prop that makes the border red. This prop will be set `status="error"`.

Field also forwards some props from the wrapped component to the label as well:

- **Size**: If the wrapped component supports a `size` prop, it will also be applied to the field's label.
- **Required**: If set, the Label will get a required asterisk: `*`

## API

### FieldComponent

The FieldProps, etc. types are templated so they can be merged with the wrapped component's props. The `FieldComponent` type defines the minimum set of props that the wrapped component must support.

```ts
/**
 * The minimum requirement for a component wrapped by makeFieldComponent.
 *
 * Note: the use of VoidFunctionComponent means that component is not *required* to have a children prop,
 * but it is still allowed to have a children prop.
 */
export type FieldComponent = React.VoidFunctionComponent<
  Pick<
    React.HTMLAttributes<HTMLElement>,
    'id' | 'className' | 'style' | 'aria-labelledby' | 'aria-describedby' | 'aria-invalid' | 'aria-errormessage'
  >
>;
```

### Slots

_Note: TypeScript crashes if the `Slot` type is used with a template type parameter. The `SlotComponent` type is a simplified version of that type, which only supports `React.ComponentType`/`React.VoidFunctionComponent`._

```ts
export type FieldSlots<T extends FieldComponent> = {
  root: NonNullable<Slot<'div'>>;

  /**
   * The underlying component wrapped by this field.
   *
   * This is the PRIMARY slot: all intrinsic HTML properties will be applied to this slot,
   * except `className` and `style`, which remain on the root slot.
   */
  fieldComponent: SlotComponent<T>;

  /**
   * The label associated with the field.
   */
  label?: Slot<typeof Label>;

  /**
   * A status or validation message. The appearance of the statusText depends on the value of the `status` prop.
   */
  statusText?: Slot<'span'>;

  /**
   * The icon associated with the status. If the `status` prop is set, this will default to a corresponding icon.
   *
   * This will only be displayed if `statusText` is set.
   */
  statusIcon?: Slot<'span'>;

  /**
   * Additional text below the field.
   */
  helperText?: Slot<'span'>;
};
```

### Props

```ts
export type FieldProps<T extends FieldComponent> = ComponentProps<Partial<FieldSlots<T>>, 'fieldComponent'> & {
  /**
   * The orientation of the label relative to the field component.
   * This only affects the label, and not the statusText or helperText (which always appear below the field component).
   *
   * @default vertical
   */
  fieldOrientation?: 'vertical' | 'horizontal';

  /**
   * The status affects the color of the statusText, the statusIcon, and for some field components, an error status
   * causes the border to become red.
   *
   * @default undefined
   */
  status?: 'error' | 'warning' | 'success';
};
```

### State

```ts
export type FieldState<T extends FieldComponent> = ComponentState<Required<FieldSlots<T>>> &
  Pick<FieldProps<T>, 'fieldOrientation' | 'status'>;
```

## Structure

### Public API

```jsx
<InputField
  label="This is the field label"
  fieldOrientation="horizontal"
  status="error"
  statusText="This is status text"
  helperText="This is helper text"
/>
```

(similar API for other Field components)

### Slot structure

```jsx
<slots.root>
  <slots.label {...slotProps.label} />
  <slots.fieldComponent {...slotProps.fieldComponent} />
  <slots.statusText {...slotProps.statusText}>
    <slots.statusIcon {...slotProps.statusIcon} />
    {slotProps.statusText.children}
  </slots.statusText>
  <slots.helperText {...slotProps.helperText} />
</slots.root>
```

### DOM structure

```html
<div className="fui-Field">
  <label className="fui-Field__label fui-Label">This is the field label</label>
  <!-- wrapped field component goes here -->
  <span className="fui-Field__statusText">
    <span className="fui-Field__statusIcon"><svg>...</svg></span>
    This is status text
  </span>
  <span className="fui-Field__helperText">This is helper text</span>
</div>
```

## Migration

### Migration from v8

Migration from v8 will require picking between the normal and `Field` version of an input control, depending on whether the field-specific features are required: (`label`, `status="error"`, `statusText`, `helperText`)

See individual input components for more detailed migration guides.

| v8 Control    | v9 Base control       | v9 Field control                | Notes                                                                                        |
| ------------- | --------------------- | ------------------------------- | -------------------------------------------------------------------------------------------- |
| `Checkbox`    | `Checkbox`            | `CheckboxField`                 | Only use `CheckboxField` if an error message is needed, or if required for layout in a form. |
| `ChoiceGroup` | `RadioGroup`          | `RadioGroupField`               |                                                                                              |
| `ComboBox`    | `Combobox`            | `ComboboxField`                 | `errorMessage="..."` is replaced by `status="error" statusText="..."`                        |
| `Dropdown`    | `Dropdown`            | `DropdownField`                 | `errorMessage="..."` is replaced by `status="error" statusText="..."`                        |
| `Slider`      | `Slider`              | `SliderField`                   |                                                                                              |
| `SpinButton`  | `SpinButton`          | `SpinButtonField`               |                                                                                              |
| `TextField`   | `Input` OR `Textarea` | `InputField` OR `TextareaField` | `errorMessage="..."` is replaced by `status="error" statusText="..."`                        |
| `Toggle`      | `Switch`              | `SwitchField`                   |                                                                                              |

### Migration from v0

Many components in v0 have `Form___` versions (such as `FormInput`). Those are replaced by the `___Field` equivalent. See the underlying component's migration guides for more detailed migration information.

Component mapping:

- `FormButton` => Not supported
- `FormCheckbox` => `CheckboxField` OR `SwitchField`
- `FormDatepicker` => _(Not yet implemented)_
- `FormDropdown` => `DropdownField`
- `FormField` => Not supported
- `FormFieldCustom` => Not supported
- `FormLabel` => The `label` prop of the field component
- `FormMessage` => Either the `statusText` or `helperText` prop of the field component
- `FormRadioGroup` => `RadioGroupField`
- `FormSlider` => `SliderField`
- `FormTextArea` => `TextareaField`

The following props are common to each of the `Form___` components:

- `label` => `label`
- `message` => either `statusText` or `helperText`
- `errorMessage` => `statusText` with `status="error"`

## Behaviors

### Form validation

Field has no logic to perform input validation. It is expected that the validation will be done externally (possibly using a third party form validation library like Formik).

### Interaction

The Field itself is not interactive. The wrapped component has the same interactions as it does outside of a field.

## Accessibility

- **ARIA pattern**
  - Field itself does not implement a defined ARIA pattern. It has no role applied to the root element.
- **Attributes**
  - The following are applied on the wrapped component:
    - `aria-labelledby={label.id}`, if the label is present.
    - `aria-describedby` is set to one of:
      - `aria-describedby={statusText.id}`, if statusText is present, and _only if_ `status !== 'error'`
      - `aria-describedby={helperText.id}`, if helperText is present
      - `aria-describedby={statusText.id + ' ' + helperText.id}`, if both conditions above apply
    - `aria-errormessage={statusText.id}`, if statusText is present, and _only if_ `status === 'error'`
    - `aria-invalid={true}`, _only if_ `status === 'error'`
  - On the `label` slot:
    - `htmlFor={fieldComponent.id}` - the wrapped component's `id` (an ID is generated if not supplied via props).
- **Live regions** (state change announcements)
  - TBD: Need to determine if the status text should be an aria live region.
- **UI parts appearing on hover or focus**
  - None.
- **Focus behavior**
  - No special focus behavior: no focus trapping or programmatic focus moving.
