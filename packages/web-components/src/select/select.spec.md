# Select

## Overview

The `select` is a component that provides a list of options for the user to select from.

### Background

There is a standard select html control, `<select>` and `<option>`, but it doesn't support the full level of detail, styling, etc. that most design systems need or require. For context please see [MDN Docs](https://developer.mozilla.org/en-US/docs/web/html/element/select).

### Use Cases

- _A customer using the component on a web page._
  On a web page a customer is shopping for a new shirt in size medium. The customer opens the size `<fast-select>` and sees a list of options and selects size medium.

### Features

- **Form association**: The `select` is [form-associated](../form-associated/form-associated-custom-element.spec.md), allowing its selected value to be submitted with a form.
- **Opened and closed states**: The `select` provides an expandable listbox can be displayed by clicking on the element, or using keyboard navigation.
- When the `select` does not have enough screen real estate to open below the control, it will open above.
- **Single and multiple selection mode**: Users can choose one or multiple options when the `multiple` attribute is present. _(Note: While our implementation currently only supports single selection mode, multiple selection mode is being tracked in [issue #4190](https://github.com/microsoft/fast/issues/4190).)_
- **Keyboard navigation and type-ahead**: When the `select` is focused, keyboard navigation with the arrow keys will cycle through the available options. Type-ahead is also supported. See [Keyboard Interaction](https://www.w3.org/TR/wai-aria-practices-1.1/#listbox_kbd_interaction) for more details.

### Prior Art/Examples

- [FAST Select (React)](https://www.npmjs.com/package/@microsoft/fast-components-react-msft)
- [Ant Design](https://ant.design/components/select/)
- [Carbon Design](https://www.carbondesignsystem.com/components/select/code/)
- [Atlassian UI](https://atlaskit.atlassian.com/packages/core/select)
- [Lightning Design System](https://www.lightningdesignsystem.com/components/select/)
- [W3 Example](https://www.w3.org/TR/wai-aria-practices-1.1/examples/listbox/listbox-collapsible.html)

---

## API

Extends [`listbox`](../listbox/listbox.spec.md) and [form associated custom element](../form-associated/form-associated-custom-element.md).

_Component Name_:

- `fast-select`

_Attributes_:

- `autofocus` - Automatically focuses the control on pageload.
- `disabled` - Disables the control.
- `multiple` - Allows the user to select more than one option.
- `name` - Name of the control.
- `open` - Indicates whether the listbox is displayed.
- `required` - Boolean value that sets the field as required
- `size` - Indicates the height of the listbox based on the amount

_Properties_:

- `options` - An array of all options.
- `selectedOptions` - An array of the selected options.
- `selectedIndex` - The index of the first selected option, or `-1` if nothing is selected. Setting the `selectedIndex` property will update the `selected` state of the option at the new index. Out of range values will reset the `selectedIndex` to `-1`.
- `value` - Reflects the value of the first selected option. Setting the `value` property will update the `selected` state of the first option that matches the value. If no option with a matching `value` is present, the `value` will reset to a blank string.

_Events_:

| Event    | description                                             | bubbles | composed |
| -------- | ------------------------------------------------------- | ------- | -------- |
| `input`  | emits when the `value` is changed via user interaction. | yes     | yes      |
| `change` | emits when the `value` is changed via user interaction. | yes     | no       |

_Slots_:

- _default_ - the list of options, either `<fast-option>` or elements with `role="option"`.
- `start` - used to display content like glyphs or icons inside the button, before the control.
- `button-container` - contains the selected value and indicator slots inside the control element.
  - `selected-value` - displays the currently selected value text. This slot is only available if the `button-container` slot is not filled.
  - `indicator` - holds the glyph indicating that the select can be expanded. This slot is only available if the `button-container` slot is not filled.
- `content` - the content of the button
- `end` - often times a glyph, icon, or button follows the content

_Parts_:

- `control` - the container that holds the button content and its slots.
- `indicator` - the container that holds the `indicator` slot.
- `selected-value` - the container that holds the displayed text for the button.
- `start` - the container that holds the `start` slot.

### Anatomy and Appearance

_Structure_:

```html
<template>
  <div part="control" role="button">
    <span part="start">
      <slot name="start"></slot>
    </span>
    <slot name="button-container">
      <div part="selected-value">
        <slot name="selected-value"></slot>
      </div>
      <div part="indicator">
        <slot name="indicator">
          <svg part="select-indicator"></svg>
        </slot>
      </div>
    </slot>
    <span part="end">
      <slot name="end"></slot>
    </span>
  </div>
  <div part="listbox" role="listbox">
    <slot></slot>
  </div>
</template>
```

## Implementation

_With `fast-option` elements_:

```html
<fast-select>
  <fast-option value="option-1">Option 1</fast-option>
  <fast-option value="option-2">Option 2</fast-option>
  <fast-option value="option-3">Option 3</fast-option>
</fast-select>
```

_With compatible `option`-like elements_:

```html
<fast-select>
  <option value="option-1">Option 1</option>
  <div role="option">Option 2</div>
</fast-select>
```

**Note**: While `<fast-option>`, `<option>`, and elements with a `role="option"` will all function, `<fast-option>` has built-in accessibility and form association support when used with a `<fast-select>`. See [Listbox Option](../listbox-option/listbox-option.spec.md) for more information.

### States

- `open` - This state is applied to the `<fast-select>` when the listbox is visible to the user.
- `required` - An option in the `<fast-select>` with a value must be `selected` when the `required` attribute is set to `true`.
- `valid` - The `<fast-select>` meets all its validation constraints, and is therefore considered to be valid.
- `invalid` - The `<fast-select>` does not meet its validation constraints, and is therefore considered to be invalid.
- `disabled` - when disabled, the value will not be changeable through user interaction.

### Accessibility

_Select_ is RTL compliant and supports the following aria best practices for listbox [W3C aria-practices](https://www.w3.org/TR/wai-aria-practices-1.1/#Listbox).

### Test Plan

While testing is still TBD for our web components, I would expect this to align with the testing strategy and not require any additional test support.
