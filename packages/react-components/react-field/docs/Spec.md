# @fluentui/react-field Spec

## Background

Field adds a label, validation text, and hint text to form input components. The existing input components (such as `Input` and `Combobox`) are wrapped to create field versions of them (such as `InputField` and `ComboboxField`).

Epic issue tracking implementation: https://github.com/microsoft/fluentui/issues/19627

## Prior Art

Existing libraries tend to take one of the following approaches to field.

1. Include support for label, error text, etc. in the base input component. Libraries using this approach include:
   - **FluentUI v8** - [`TextField`](https://developer.microsoft.com/en-us/fluentui#/controls/web/textfield), [`Dropdown`](https://developer.microsoft.com/en-us/fluentui#/controls/web/dropdown), [`ChoiceGroup`](https://developer.microsoft.com/en-us/fluentui#/controls/web/choicegroup), etc.
   - **Spectrum** - [`TextField`](https://react-spectrum.adobe.com/react-spectrum/TextField.html), [`Slider`](https://react-spectrum.adobe.com/react-spectrum/Slider.html), [`RadioGroup`](https://react-spectrum.adobe.com/react-spectrum/RadioGroup.html), etc.
2. Provide a set of components that are manually constructed into a field. This requires manually hooking up the components using props like `htmlFor` and `aria-describedby`. Libraries using this approach include:
   - **FluentUI v0** - [`FormField`](https://fluentsite.z22.web.core.windows.net/0.64.0/components/form/props#form-field), [`FormLabel`](https://fluentsite.z22.web.core.windows.net/0.64.0/components/form/props#form-label), [`FormMessage`](https://fluentsite.z22.web.core.windows.net/0.64.0/components/form/props#form-message)
   - **Ant** - [`Form.Item`](https://ant.design/components/form/#Form.Item) (uses context to do some of the hooking up between the item and the field component).
3. Provide base components without a label or descriptive text, and then Field versions of those controls. Libraries using this approach include:
   - **FluentUI v0** - [`Input`](https://fluentsite.z22.web.core.windows.net/0.64.0/components/input/props) and [`FormInput`](https://fluentsite.z22.web.core.windows.net/0.64.0/components/form/props#form-input), for example.
   - **Evergreen UI** - [`TextInput`](https://evergreen.segment.com/components/text-input) and [`TextInputField`](https://evergreen.segment.com/components/text-input#textinputfield), for example.

The Field implementation in this spec follows pattern (3). There are Field versions of all components that can be used as form inputs. There are several reasons, including:

- **Accessibility**: By combining a base component with the field props into a single component, all of the accessibility props like `htmlFor` and `aria-describedby` are set correctly for "free".
- **Simplicity**: All props related to the component (such as `label`, `id`, `validationState="error"`, etc.) are on the same component, rather than split between multiple components (like separate `Field` and `Input` components).
- **Consistency**: All of the Field components share a common set of props for the label, validationState, hint, etc.
- **Bundle size**: When the label and other field functionality is not needed, it is still possible to use the base components without pulling in unnecessary dependencies (like `Label` and the field styling).

## Sample Code

Each input component has a field version (such as `InputField`, `ComboboxField`, etc.) that includes the features of Field added to that component.

```jsx
<>
  <InputField
    // Field-specific props
    label="This is the field label"
    orientation="horizontal"
    validationState="error"
    validationMessage="This is error text"
    // All props and slots of the underlying Input component are supported
    required
    size="small"
    contentBefore="$"
    contentAfter=".00"
  />
  <RadioGroupField label="Radio group field">
    <Radio value="one" label="Option one" />
    <Radio value="two" label="Option two" />
    <Radio value="three" label="Option three" />
  </RadioGroupField>
  <ComboboxField label="Combobox field" validationState="success" validationMessage="Success text">
    <Option value="one">Option one</Option>
    <Option value="two">Option two</Option>
    <Option value="three">Option three</Option>
  </ComboboxField>
  <SliderField label="Slider field" validationState="warning" validationMessage="Warning text" />
  <SpinButtonField label="Spin button field" hint="Hint text" />
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
- `ComboboxField`
- `DropdownField`
- `InputField`
- `RadioGroupField`
- `SelectField`
- `SliderField`
- `SpinButtonField`
- `SwitchField`
- `TextareaField`

## Variants

- **Orientation**: The `orientation` prop affects the layout of the label and field component:
  - `'vertical'` (default) - label is above the field component
  - `'horizontal'` - label is to the left of the field component, and is 33% the width of the field (this allows multiple stacked fields to all align their labels)
- **Validation state**: The `validationState` prop affects the icon and color used by the `validationMessage`:
  - `'error'` - Red x icon, red text color
  - `'warning'` - Yellow exclamation icon, neutral color text
  - `'success'` - Green check icon, neutral color text
  - `undefined` (default): No validation message icon, neutral color text
- **Error**: Some control types (like `Input` and `Combobox`) have a prop that makes the border red. This prop will be set `validationState="error"`.

Field also forwards some props from the wrapped component to the label as well:

- **Size**: If the wrapped component supports a `size` prop, it will also be applied to the field's label.
- **Required**: If set, the Label will get a required asterisk: `*`

## API

### FieldComponent

The `FieldComponent` type defines the minimum set of props that the wrapped component must support. This is used for the generic types as the requirement for the type parameter: `FieldProps<T extends FieldComponent>`

```ts
/**
 * The minimum requirement for a component used by Field.
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
  control: SlotComponent<T>;

  /**
   * The label associated with the field.
   */
  label?: Slot<typeof Label>;

  /**
   * A message about the validation state. The appearance of the `validationMessage` depends on `validationState`.
   */
  validationMessage?: Slot<'span'>;

  /**
   * The icon associated with the `validationMessage`. If the `validationState` prop is set, this will default to an
   * icon corresponding to that state.
   *
   * This will only be displayed if `validationMessage` is set.
   */
  validationMessageIcon?: Slot<'span'>;

  /**
   * Additional hint text below the field.
   */
  hint?: Slot<'span'>;
};
```

### Props

```ts
export type FieldProps<T extends FieldComponent> = ComponentProps<Partial<FieldSlots<T>>, 'control'> & {
  /**
   * The orientation of the label relative to the field component.
   * This only affects the label, and not the validationMessage or hint (which always appear below the field component).
   *
   * @default vertical
   */
  orientation?: 'vertical' | 'horizontal';

  /**
   * The `validationState` affects the color of the `validationMessage`, the `validationMessageIcon`, and for some
   * field components, an `validationState="error"` causes the border to become red.
   *
   * @default undefined
   */
  validationState?: 'error' | 'warning' | 'success';
};
```

Field also reads some props from the underlying component. These are not part of `FieldProps` because they are not added to the components that don't support them. However, they are accepted by `useField`:

```ts
/**
 * Props that are supported by Field, but not required to be supported by the component that implements field.
 */
export type OptionalFieldComponentProps = {
  /**
   * Whether the field label should be marked as required.
   */
  required?: boolean;

  /**
   * Size of the field label.
   *
   * Number sizes will be ignored, but are allowed because the HTML <input> element has a `size` prop of type `number`.
   */
  size?: 'small' | 'medium' | 'large' | number;
};
```

### State

```ts
export type FieldState<T extends FieldComponent> = ComponentState<Required<FieldSlots<T>>> &
  Pick<FieldProps<T>, 'orientation' | 'validationState'> & {
    classNames: SlotClassNames<FieldSlots<T>>;
  };
```

### Label for Checkbox and Switch

The Checkbox and Switch components already have a `label` prop, which conflicts with the Field's `label`.

#### `CheckboxField`

- The `label` prop will go to the Checkbox and NOT the Field
- New `fieldLabel` prop for the label of the Field

#### `SwitchField`

- The `label` prop will go to the Field and NOT the Switch
- The Switch's `labelPosition` prop is therefore not supported, and is omitted from SwitchField.

## Structure

### Public API

```jsx
<InputField
  label="This is the field label"
  orientation="horizontal"
  validationState="error"
  validationMessage="This is a validation message"
  hint="This is a hint message"
/>
```

(similar API for other Field components)

### Slot structure

```jsx
<slots.root>
  <slots.label {...slotProps.label} />
  <slots.control {...slotProps.control} />
  <slots.validationMessage {...slotProps.validationMessage}>
    <slots.validationMessageIcon {...slotProps.validationMessageIcon} />
    {slotProps.validationMessage.children}
  </slots.validationMessage>
  <slots.hint {...slotProps.hint} />
</slots.root>
```

### DOM structure

```html
<div className="fui-Field">
  <label className="fui-Field__label fui-Label">This is the field label</label>
  <!-- wrapped field component goes here -->
  <span className="fui-Field__validationMessage">
    <span className="fui-Field__validationMessageIcon"><svg>...</svg></span>
    This is a validation message
  </span>
  <span className="fui-Field__hint">This is a hint message</span>
</div>
```

## Migration

See [Migration.md](./Migration.md).

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
      - `aria-describedby={validationMessage.id}`, if validationMessage is present, and _only if_ `validationState !== 'error'`
      - `aria-describedby={hint.id}`, if hint is present
      - `aria-describedby={validationMessage.id + ' ' + hint.id}`, if both conditions above apply
    - `aria-errormessage={validationMessage.id}`, if validationMessage is present, and _only if_ `validationState === 'error'`
    - `aria-invalid={true}`, _only if_ `validationState === 'error'`
  - On the `label` slot:
    - `htmlFor={control.id}` - the wrapped component's `id` (an ID is generated if not supplied via props).
- **Live regions** (state change announcements)
  - TBD: Need to determine if the validation message should be an aria live region.
- **UI parts appearing on hover or focus**
  - None.
- **Focus behavior**
  - No special focus behavior: no focus trapping or programmatic focus moving.
