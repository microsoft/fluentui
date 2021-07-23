# @fluentui/react-checkbox Spec

## Background

Checkboxes are used to represent one or more options, giving the user a way to select one or more of these options.

## Prior Art

- Open UI research:
  - Concepts: https://open-ui.org/components/checkbox.research.concepts
  - Findings: https://open-ui.org/components/checkbox.research.findings
  - Proposal: https://open-ui.org/components/checkbox
- Github Epic: https://github.com/microsoft/fluentui/issues/18454

### [Checkbox in v0/Northstar](https://fluentsite.z22.web.core.windows.net/0.56.0/components/checkbox/definition)

The v0 `Checkbox` component supports a mixed state, which is the same as indeterminate in v8. It is rendered as a `div` with `role="checkbox"` and does not use the native input element.

```tsx
// string
<Checkbox label="Make my profile visible" />

// jsx
<Checkbox
  label={
    <span>
      Long labels will wrap and the indicator <br /> should remain top-aligned.
    </span>
  }
/>
```

Component props:
|Prop|Description|
|---|---|
|accessibility|Accessibility behavior if overridden by the user.|
|as|Render as given string or component.|
|checked|Checkbox's checked state.|
|className|Additional styles.|
|defaultChecked|Whether the checkbox should be set to checked by default.|
|design|...|
|disabled|Whether the checkbox is disabled or not.|
|indicator|Checkbox's icon indicator.|
|label|Label text or jsx to be rendered in the label.|
|labelPosition|Whether the label is rendered on left or right (`start` or `end`).|
|onChange|Event handler to be called after checked state has changed.|
|onClick|Event handler to be called after the checkbox is clicked.|
|styles|Additional styles.|
|toggle|Render a toggle style checkbox with on and off choices.|
|variables|Additional styles.|

### [Checkbox in v8/Fabric](https://developer.microsoft.com/en-us/fluentui#/controls/web/checkbox)

The v8 `Checkbox` component supports both `indeterminate` and `checked` states. In this case, an input tag is used and its opacity is set to 0. This allows for the logic to be performed by the native element while a div is rendered to show the styled checkbox.

Example

```tsx
<Checkbox
  label="Indeterminate checkbox (controlled)"
  indeterminate={isIndeterminate}
  checked={isChecked}
  onChange={onChange}
/>
```

Component props:
|Prop|Description|
|---|---|
|ariaDescribedBy|Id of the element that describes the checkbox.|
|ariaLabel|Accessible label for the checkbox.|
|ariaLabelledBy|Id of the element that contains the label information of the checkbox.|
|ariaPositionInSet|Number in the parent set (if in a set) for aria-posinset.|
|ariaSetSize|The total size of the parent set (if in a set) for aria-setsize.|
|boxSide|Wheter the checkbox should be shown before or after the label.|
|checked|Checkbox's checked state.|
|checkmarkIconProps|Icon to be rendered in the checkbox.|
|className|Additional styles.|
|componentRef|Optional ref.|
|defaultChecked|Whether the checkbox should be set to checked by default.|
|defaultIndeterminate|Whether the checkbox should be set to indeterminate by default.|
|disabled|Whether the checkbox is disabled or not.|
|id|Id for the checkbox input.|
|indeterminate|Checkbox's indeterminate state.|
|inputProps|Optional props to be applied to the input element before applying other props.|
|label|String to display next to the checkbox.|
|name|Name for the checkbox input.|
|onChange|Event handler to be called after the checked value has changed.|
|onRenderLabel|Custom render for the label.|
|required|Required state of the checkbox.|
|styles|Additional styles.|
|theme|Additional styles.|
|title|Title text applied to the root element and the hidden checkbox input.|

### Conclusion

- Most props will follow the approach of `v8` as well as the render structure. The main idea will be to use the native `input` tag and set its opacity to 0 to then render a custom checkbox.
- This approach will also use the `Label` component from `@fluentui/react-label`
- The converged `Checkbox` should also support `circular` checkboxes which both `v8` and `v0` do not support.

## Sample Code

```tsx
<Checkbox label="Example Checkbox" />

<Checkbox label={<>Example Checkbox with <a href="https://www.microsoft.com">link</a></>} />

<Checkbox label="Circular Checkbox" circular size="large" />

<Checkbox label="Controlled Checkbox" onChange={onChangeFunction} />

<Checkbox label="Mixed Checkbox" checked="mixed" />

<Checkbox label={{ children: 'Custom Label', style: { color: 'red' }, required: true }} />
```

## Variants

- A Checkbox has two size variants: `medium (default)` and `large`.
- A Checkbox has four appearance variants: `disabled`, `unchecked`, `checked`, and `mixed`.
- A Checkbox has a `circular` variant.

## API

### Checkbox Props

```tsx
/**
 * Checkbox Props
 */
export interface CheckboxProps
  extends Omit<ComponentPropsCompat, 'children'>,
    Omit<React.HTMLAttributes<HTMLElement>, 'defaultChecked'> {
  /**
   * Label that will be rendered next to the input.
   */
  label?: ShorthandProps<LabelProps>;

  /**
   * Indicator to be rendered as the checkbox icon.
   */
  indicator?: ShorthandProps<ComponentPropsCompat>;

  /**
   * Hidden input that handles the checkbox's functionality.
   */
  input?: ShorthandProps<React.InputHTMLAttributes<HTMLInputElement> & { ref: React.RefObject<HTMLInputElement> }>;

  /**
   * Disabled state of the checkbox.
   */
  disabled?: boolean;

  /**
   * Required state of the checkbox.
   */
  required?: boolean;

  /**
   * A checkbox can be rendered with a circular shape.
   */
  circular?: boolean;

  /**
   * A checkbox's state can be controlled.
   * @defaultvalue false
   */
  checked?: 'mixed' | boolean;

  /**
   * Whether the checkbox should be rendered as checked by default.
   */
  defaultChecked?: 'mixed' | boolean;

  /**
   * Checkbox supports two different checkbox sizes.
   * @defaultvalue 'medium'
   */
  size?: 'medium' | 'large';

  /**
   * Determines whether the label should be positioned before (start) or after (end) the checkbox.
   * @defaultvalue 'end'
   */
  labelPosition?: 'start' | 'end';

  /**
   * ID of the root element that wraps the checkbox and label.
   */
  rootId?: string;

  /**
   * ID of the native element that represents the checkbox.
   */
  id?: string;

  /**
   * Callback to be called when the checked state value changes.
   */
  onChange?: (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, data?: CheckboxOnChangeData) => void;
}

/**
 * Data for the onChange event for checkbox.
 */
export interface CheckboxOnChangeData {
  checked?: 'mixed' | boolean;
}
```

## Structure

- The icon that will be used to represent the Checkbox's state is a slot to allow customization of the icons. This means that if a user were to customize the icons that will appear, the user will have to handle both icons based on the state.
- The input element will be a slot to allow for customization.

### **Public**

```html
<Checkbox label="Example Checkbox" />
```

### **Internal**

```tsx
<slots.root {...slotProps.root}>
  {state.labelPosition === 'start' && <slots.label {...slotProps.label} />}
  <div className={state.checkboxClassName}>
    <slots.indicator {...slotProps.indicator} />
    <slots.input {...slotProps.input} />
  </div>
  {state.labelPosition === 'end' && <slots.label {...slotProps.label} />}
</slots.root>
```

### **DOM**

In this case, the label position is set to end as per default.

```html
<div {/* Root Element */}>
  <div {/* Checkbox */}>
    <div {/* indicator */}>
      ...indicator
    </div>
    <input id="cbox-1" ...props />
  </div>
  <label for="cbox-1" ...props>
    Example Checkbox
  </label>
</div>
```

## Migration

See [MIGRATION.md](MIGRATION.md)

## Behaviors

- Keyboard
  - When checkbox is focused, if `space` is pressed the checkbox's state is toggled.
- Cursor
  - When clicked the checkbox's state is toggled.
- Focus
  - A checkbox can be focused to interact with it using `space`.
  - In case of a label having a link or information button, items inside the label may be focused.

## Accessibility

- Aria design pattern: [Checkbox](https://www.w3.org/TR/wai-aria-practices-1.2/#checkbox).
- If a label is used with the checkbox, an `aria-label` will be set on the `input` element.
- Checkbox will have a tri-state `aria-checked`.
- Elements inside the checkbox's label can be focused if there are elements such as links and info buttons.
