# @fluentui/react-field Spec

## Background

Field adds a label, validation text, and hint text to form input components. It can be added around any input components, such as `<Input>` or `<Combobox>` from this library, or intrinsic `<input>` elements, or custom form controls.

Epic issue tracking implementation: https://github.com/microsoft/fluentui/issues/19627

## Prior Art

Existing libraries take one of several approaches to Field. The basic problem that all are trying to solve is to (a) render a label and some descriptive text around a control, and (b) connect that text to the control via `for`/`aria-labelledby`/`aria-describedby`.

1. Include support for label, error text, etc. in the base input component. Libraries using this approach include:
   - **FluentUI v8** - [`TextField`](https://developer.microsoft.com/en-us/fluentui#/controls/web/textfield), [`Dropdown`](https://developer.microsoft.com/en-us/fluentui#/controls/web/dropdown), [`ChoiceGroup`](https://developer.microsoft.com/en-us/fluentui#/controls/web/choicegroup), etc.
   - **Spectrum** - [`TextField`](https://react-spectrum.adobe.com/react-spectrum/TextField.html), [`Slider`](https://react-spectrum.adobe.com/react-spectrum/Slider.html), [`RadioGroup`](https://react-spectrum.adobe.com/react-spectrum/RadioGroup.html), etc.
2. Provide a set of components that are manually constructed into a field. This requires manually hooking up the components using props like `htmlFor` and `aria-describedby`. Libraries using this approach include:
   - **FluentUI v0** - [`FormField`](https://fluentsite.z22.web.core.windows.net/0.64.0/components/form/props#form-field), [`FormLabel`](https://fluentsite.z22.web.core.windows.net/0.64.0/components/form/props#form-label), [`FormMessage`](https://fluentsite.z22.web.core.windows.net/0.64.0/components/form/props#form-message)
3. Provide base components without a label or descriptive text, and then Field versions of those controls. Libraries using this approach include:
   - **FluentUI v0** - [`Input`](https://fluentsite.z22.web.core.windows.net/0.64.0/components/input/props) and [`FormInput`](https://fluentsite.z22.web.core.windows.net/0.64.0/components/form/props#form-input), for example.
   - **Evergreen UI** - [`TextInput`](https://evergreen.segment.com/components/text-input) and [`TextInputField`](https://evergreen.segment.com/components/text-input#textinputfield), for example.
4. Provide base components without a label or descriptive text, and have a Field (FormItem) component that passes props to its child via context, a render function, or cloneElement.
   - **Ant** - [`Form.Item`](https://ant.design/components/form/#Form.Item) (uses context to do some of the hooking up between the control and the Form.Item component).
   - **Atlaskit** - [`Field`](https://atlaskit.atlassian.com/packages/design-system/form/docs/fields) (uses a render function as the child of the Field to pass props).

The Field implementation in this spec follows pattern (4). Field passes props to its child to connect the field's label and message text. There are several reasons:

- **Accessibility**: All of the accessibility props like `aria-labelledby` and `aria-describedby` are set correctly on the child for "free".
- **Simplicity**: Passing props down to the children allows any form control to be used as the child of Field.
- **Consistency**: The Field component provides props like label, validationState, hint, etc. for any form control.
- **Bundle size**: When the label and other field functionality is not needed, it is still possible to use the core components like `Input` without pulling in unnecessary dependencies (like `Label` and the field styling).

## Sample Code

```jsx
<>
  <Field label="This is the field label" orientation="horizontal" validationMessage="This is error text" required>
    <Input size="small" contentBefore="$" contentAfter=".00" />
  </Field>
  <Field label="Radio group field">
    <RadioGroup>
      <Radio value="one" label="Option one" />
      <Radio value="two" label="Option two" />
      <Radio value="three" label="Option three" />
    </RadioGroup>
  </Field>
  <Field label="Combobox field" validationState="success" validationMessage="Success text">
    <Combobox>
      <Option value="one">Option one</Option>
      <Option value="two">Option two</Option>
      <Option value="three">Option three</Option>
    </Combobox>
  </Field>
  <Field label="Slider field" validationState="warning" validationMessage="Warning text">
    <Slider defaultValue={25} />
  </Field>
  <Field label="Spin button field" hint="Hint text">
    <SpinButton />
  </Field>
</>
```

## Variants

- **Orientation**: The `orientation` prop affects the layout of the label and field component:
  - `'vertical'` (default) - label is above the field component
  - `'horizontal'` - label is to the left of the field component, and is 33% the width of the field (this allows multiple stacked fields to all align their labels)
- **Validation state**: The `validationState` prop affects the icon and color used by the `validationMessage`:
  - `'error'` - (default when there is a `validationMessage`): Red x icon, red text color
    - In the error state, Field also sets `aria-invalid` on the child element. Some controls such as `Input` and `Combobox` draw a red border when `aria-invalid` is set.
  - `'warning'` - Yellow exclamation icon, neutral color text
  - `'success'` - Green check icon, neutral color text
  - `'none'` - No validation message icon, neutral color text

Field also forwards some props to its Label:

- **Size**: Affects the size of the Label text (but not validationMessage or hint text).
- **Required**: If set, the Label will get a required asterisk: `*`

## API

`Field` applies props to its child component, to connect the label and message text to the control, and make the component accessible by default.

The props added are:

- `id` - Uses the child's `id` prop if set; otherwise generates an ID and sets it on the child. This is used as the label's `htmlFor`.
- `aria-labelledby` - The label's ID.
- `aria-describedby` - The validationMessage and/or hint's ID.
- `aria-invalid` - If validationState is error (which is the default when a validationMessage is set).
- `aria-required` - If the required prop is set.

This is done one of two ways:

- If the child is a component, uses `cloneElement` to add the props to the child's props.
- If the child is a render function, passes the props to the render function. That function is expected to spread the props in the appropriate place in its render tree.

### FieldChildProps

The `FieldChildProps` type defines the props that may be set on the child of Field (or passed to the child render function).

```ts
/**
 * The props added to the Field's child element. Or if the child is a render function, the props passed to the function.
 */
export type FieldChildProps = Pick<
  React.HTMLAttributes<HTMLElement>,
  'id' | 'aria-labelledby' | 'aria-describedby' | 'aria-invalid' | 'aria-required'
>;
```

### Slots

```ts
export type FieldSlots = {
  root: NonNullable<Slot<'div'>>;

  /**
   * The label associated with the field.
   */
  label?: Slot<typeof Label>;

  /**
   * A message about the validation state. By default, this is an error message, but it can be a success, warning,
   * or custom message by setting `validationState`.
   */
  validationMessage?: Slot<'div'>;

  /**
   * The icon associated with the `validationMessage`. This will only be displayed if `validationMessage` is set.
   *
   * The default depends on `validationState`:
   * * `error` - `<ErrorCircle12Filled />`
   * * `warning` - `<Warning12Filled />`
   * * `success` - `<CheckmarkCircle12Filled />`
   * * `none` - `null`
   */
  validationMessageIcon?: Slot<'span'>;

  /**
   * Additional hint text below the field.
   */
  hint?: Slot<'div'>;
};
```

### Props

```ts
export type FieldProps = Omit<ComponentProps<FieldSlots>, 'children'> & {
  /**
   * The Field's child can be a single form control, or a render function that takes the props that should be spread on
   * a form control.
   *
   * All form controls in this library can be used directly as children (such as `<Input>` or `<RadioGroup>`), as well
   * as intrinsic form controls like `<input>` or `<textarea>`. Custom controls can also be used as long as they
   * accept FieldChildProps and spread them on the appropriate element.
   *
   * For more complex scenarios, a render function can be used to pass the FieldChildProps to the appropriate control.
   */
  children?: React.ReactElement<FieldChildProps> | null | ((props: FieldChildProps) => React.ReactNode);

  /**
   * The orientation of the label relative to the field component.
   * This only affects the label, and not the validationMessage or hint (which always appear below the field component).
   *
   * @default vertical
   */
  orientation?: 'vertical' | 'horizontal';

  /**
   * The `validationState` affects the display of the `validationMessage` and `validationMessageIcon`.
   *
   * * `error` - (default) The validation message has a red error icon and red text, with `role="alert"` so it is
   *     announced by screen readers. Additionally, the control inside the field has `aria-invalid` set, which adds a
   *     red border to some field components (such as `Input`).
   * * `success` - The validation message has a green checkmark icon and gray text.
   * * `warning` - The validation message has a yellow exclamation icon and gray text.
   * * `none` - The validation message has no icon and gray text.
   *
   * @default error when `validationMessage` is set; none otherwise.
   */
  validationState?: 'error' | 'warning' | 'success' | 'none';

  /**
   * Marks the Field as required. If `true`, an asterisk will be appended to the label, and `aria-required` will be set
   * on the Field's child.
   */
  required?: boolean;

  /**
   * The size of the Field's label.
   *
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
};
```

### State

```ts
export type FieldState = ComponentState<Required<FieldSlots>> &
  Required<Pick<FieldProps, 'orientation' | 'validationState'>>;
```

## Structure

### Public API

With a child element:

```jsx
<Field
  label="This is the field label"
  orientation="horizontal"
  validationState="error"
  validationMessage="This is a validation message"
  hint="This is a hint message"
>
  <Input /> {/* Or any other form control */}
</Field>
```

With a child render function:

```jsx
<Field
  label="This is the field label"
  orientation="horizontal"
  validationState="error"
  validationMessage="This is a validation message"
  hint="This is a hint message"
>
  {fieldProps => (
     {/* Render any JSX and spread the props in the appropriate place */}
    <div>
      <Input {...fieldProps} />
    </div>
  )}
</Field>
```

### Slot structure

```jsx
<slots.root>
  <slots.label {...slotProps.label} />
  {slotProps.root.children}
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
  <!-- child field component goes here -->
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
  - The following are applied on the child component:
    - `id={generatedChildID}` - if the label is present, and the child doesn't have an `id` already.
    - `aria-labelledby={label.id}` - if the label is present.
    - `aria-describedby={validationMessage.id + ' ' + hint.id}` - if the validationMessage and/or hint are present.
    - `aria-invalid={true}` - if validationMessage is present, unless validationState set to something _other than_ `error`.
  - On the `label` slot:
    - `htmlFor={child.id}`
  - On the `validationMessage` slot:
    - `role="alert"` - unless validationState set to something _other than_ `error`.
- **Live regions** (state change announcements)
  - `role="alert"` on the `validationMessage` when it is an error causes the message to be announced by screen readers when it appears.
- **UI parts appearing on hover or focus**
  - None.
- **Focus behavior**
  - No special focus behavior: no focus trapping or programmatic focus moving.
