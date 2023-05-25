# @fluentui/react-field Spec

## Background

Field adds a label, validation text, and hint text to form input components. It can be added around any form components from this library, such as `<Input>` or `<Combobox>`. Its child can also be a render function, which allows it to be used with intrinsic `<input>` elements, or custom form controls.

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

The Field implementation in this spec follows pattern (4). Field uses context for its child child to connect the field's label and message text. There are several reasons:

- **Accessibility**: All of the accessibility props like `aria-labelledby` and `aria-describedby` can be set correctly on the child via context.
- **Bundle size**: When the label and other field functionality is not needed, it is still possible to use the core components like `Input` without pulling in unnecessary dependencies (like `Label` and the field styling).
- **Flexibility**: Using a context allows other components like Form validators or Tooltips between the field and its component.

## Sample Code

```jsx
<>
  <Field
    label="This is the field label"
    validationMessage="This is error text"
    size="small"
    orientation="horizontal"
    required
  >
    <Input contentBefore="$" contentAfter=".00" />
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
- **Required**: If set, the Label will get a required asterisk: `*`, and the component will set either `required` (if supported), or `aria-required`.

## API

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
   * accept FieldControlProps and spread them on the appropriate element.
   *
   * For more complex scenarios, a render function can be used to pass the FieldControlProps to the appropriate control.
   */
  children?: React.ReactNode | ((props: FieldControlProps) => React.ReactNode);

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
  Required<Pick<FieldProps, 'orientation' | 'required' | 'size' | 'validationState'>> &
  Pick<FieldProps, 'children'> & {
    /**
     * The ID generated for the control inside the field, and the default value of label.htmlFor prop.
     */
    generatedControlId: string;
  };
```

### FieldContext

The `FieldContext` provides some of the props passed to the Field, as well the IDs that were generated for the control, field, validationMessage, and hint. This can be used by a control inside the Field to set its accessibility properties, or use the `useFieldControlProps` hook (below) that handles the prop merging.

```ts
export type FieldContextValue = Readonly<
  Pick<FieldState, 'generatedControlId' | 'orientation' | 'required' | 'size' | 'validationState'> & {
    /** The label's for prop. Undefined if there is no label. */
    labelFor?: string;
    /** The label's id prop. Undefined if there is no label. */
    labelId?: string;
    /** The validationMessage's id prop. Undefined if there is no validationMessage. */
    validationMessageId?: string;
    /** The hint's id prop. Undefined if there is no hint. */
    hintId?: string;
  }
>;
```

### FieldControlProps

The `FieldControlProps` type defines the props that may be set by `useFieldControlProps`, or passed to the child render function.

```ts
/**
 * The props added to the control inside the Field.
 */
export type FieldControlProps = Pick<
  React.HTMLAttributes<HTMLElement>,
  'id' | 'aria-labelledby' | 'aria-describedby' | 'aria-invalid' | 'aria-required'
>;
```

### useFieldControlProps

The `useFieldControlProps` hook reads the FieldContext, and merges the control's props with props from the Field.

This is the mechanism that all form components in this library, including `<Input>`, `<RadioGroup>`, etc. get props from the Field. It is also one of two ways a third party component could be used inside a Field (the other being a render function as the child of Field).

```ts
/**
 * Gets the control props from the field context, if this inside a `<Field>`.
 *
 * If `props` is provided: copies and merges the FieldControlProps with the given props, if this inside a `<Field>`.
 * Otherwise, returns the FieldControlProps that should be applied to the control.
 *
 * It is preferred to pass a `props` object if available, to improve the resulting merged props.
 *
 * @param props - The existing props for the control. These will be merged with the control props from the field context.
 * @param options - Option to include the size prop.
 * @returns Merged props if inside a `<Field>`, otherwise the original props, or undefined if no props given.
 */
export function useFieldControlProps_unstable<Props extends FieldControlProps>(
  props?: Props,
  options?: FieldControlPropsOptions,
): Props | undefined;

/**
 * Options for `useFieldControlProps_unstable`.
 */
export type FieldControlPropsOptions = {
  /**
   * Skips setting `aria-labelledby` on the control if the `label.htmlFor` refers to the control.
   *
   * This should be used with controls that can be the target of a label's `for` prop:
   * `<button>`, `<input>`, `<progress>`, `<select>`, `<textarea>`.
   */
  supportsLabelFor?: boolean;

  /**
   * Sets `required` instead of `aria-required` when the Field is marked required.
   *
   * This should be used with controls that support the `required` prop:
   * `<input>` (except `range` or `color`), `<select>`, `<textarea>`.
   */
  supportsRequired?: boolean;

  /**
   * Sets the size prop on the control to match the Field's size: `'small' | 'medium' | 'large'`.
   *
   * This should be used with controls that have a custom size prop that matches the Field's size prop.
   */
  supportsSize?: boolean;
};
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
  <Input /> {/* Or any other form control from this library */}
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
      <input {...fieldProps} />
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
  - The following are applied by `useFieldControlProps` or passed to the child render function:
    - `id={generatedChildID}` - if the label is present, and the child doesn't have an `id` already.
    - `aria-labelledby={label.id}` - if the label is present. ONLY added if the child is NOT a control that supports being the target of `label.htmlFor`.
    - `aria-describedby={validationMessage.id + ' ' + hint.id}` - if the validationMessage and/or hint are present.
    - if validationMessage is present, unless validationState set to something _other than_ `error`, sets ONE of:
      - `invalid={true}` - if the control supports the `invalid` prop
      - `aria-invalid={true}` - if the control does NOT support the `invalid` prop (or a render function is used).
  - On the `label` slot:
    - `htmlFor={generatedChildID}`
  - On the `validationMessage` slot:
    - `role="alert"` - unless validationState set to something _other than_ `error`.
- **Live regions** (state change announcements)
  - `role="alert"` on the `validationMessage` when it is an error causes the message to be announced by screen readers when it appears.
- **UI parts appearing on hover or focus**
  - None.
- **Focus behavior**
  - No special focus behavior: no focus trapping or programmatic focus moving.
