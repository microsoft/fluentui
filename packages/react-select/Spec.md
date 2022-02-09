# @fluentui/react-select Spec

## Background

The Select component allows users to select one value from a predefined set of values. It does so by providing a styled wrapper around the HTML `<select>` element. This means it inherits the dropdown UI and keyboard functionality from the platform.

Select is a more lightweight, accessible, and less feature-rich alternative to Combobox. It has better mobile support, and better cross-platform screen reader support. Unlike Combobox, it does not provide filtering, multiple selection, or virtualization. Select is recommended over Combobox when the following are true:

- The control is a basic single-select that matches the functionality of a `<select>`
- Native-feeling cross platform UX (particularly on mobile) is a primary concern
- Performance, accessibility, and bundle size are primary concerns

Combobox is recommended if any of the following are needed:

- Filtering or freeform text input
- Virtualization
- Control over styling the dropdown and options
- Multiple selection

## Prior Art

The [Open UI research on Select](https://open-ui.org/components/select.research) combines both the ideas of the proposed Fluent Combobox and Select. There is also an [Open UI draft describing the select element](https://open-ui.org/components/select).

### Comparison of v8 and v0

`@fluentui/react` has three different controls that are different flavors of select/combobox:

- [Combobox](https://developer.microsoft.com/en-us/fluentui#/controls/web/combobox): an editable combobox with a textfield and dropdown listbox
- [Dropdown](https://developer.microsoft.com/en-us/fluentui#/controls/web/dropdown): a non-editable combobox with dropdown listbox
- [Pickers](https://developer.microsoft.com/en-us/fluentui#/controls/web/pickers): an editable combobox with greater customization, particularly in displaying selected items

`@fluentui/react-northstar` has one combobox control:

- [Dropdown](https://fluentsite.z22.web.core.windows.net/0.51.2/components/dropdown/definition): either an editable or non-editable combobox with a tag-like approach to selected items

### Functional variations across v8 and v0 components

The main functional variants in existing components are as follows:

- Editable vs. non-editable: editable comboboxes have a textbox and allow the user to type, which optionally filters the listbox
- Within editable comboboxes: freeform text input and filtering on input are optional
- Within editable comboboxes: When a typed value does not match an option, it can be cleared or preserved on blur
- Single vs. multiselect
- Within multiselect: selected options may be presented as text within the combobox value, pills, or a custom render.

### Dropdown options variations across v8 and v0 Components

- Options may have an icon, image, text + description, or entirely custom render
- Options may be grouped with a group header and divider
- There may be a "load more results" action
- Within multiselect: There may be a "Select all" option

## Sample Code

Default/standard Select:

```tsx
<label htmlFor="selectID">Choose a color</label>
<Select id="selectID">
  <option>Red</option>
  <option>Green</option>
  <option>Blue</option>
</Select>
```

Select with grouped options:

```tsx
<label htmlFor="selectID">Choose an animal</label>
<Select id="selectID">
  <optgroup label="Land">
    <option>Cat</option>
    <option>Dog</option>
    <option>Horse</option>
  </optgroup>
  <optgroup label="Water">
    <option>Dolphin</option>
    <option>Seal</option>
    <option>Shark</option>
  </optgroup>
</Select>
```

Inline Select with appearance and size set:

```tsx
<label htmlFor="selectID">Choose a color</label>
<Select id="selectID" appearance="filledDarker" size="small" inline>
  <option>Red</option>
  <option>Green</option>
  <option>Blue</option>
</Select>
```

Disabled Select with second option selected:

```tsx
<label htmlFor="selectID">Choose a color</label>
<Select id="selectID" disabled>
  <option>Red</option>
  <option selected>Green</option>
  <option>Blue</option>
</Select>
```

## Variants

### Layout

- Block (default)
- Inline

### Size

- Small
- Medium (default)
- Large

### Appearance

- Filled darker
- Filled lighter
- Outline (default)
- Transparent

### Unsupported Select variants

#### Multiple Selection

The Select component does not support multi-select, and does not support the native `multiselect` attribute. Multiple selection is instead provided through the Combobox component. This is because the native `<select multiple>` has poor accessibility and general UX, and we do not recommend using it. Additionally, because the options are not styleable, there is little benefit to using a wrapped `<Select multiple>` over using the native element directly.

#### Size attribute

For similar reasons to `multiple`, the native `size` attribute is not supported out of the box. It also has very limited styling support, and therefore also has little benefit over the native `<select size="N">`. The Listbox (TODO: confirm name) component is an alternative to using the `size` attribute on a `<select>`.

## API

From [Select.types.tsx](https://github.com/microsoft/fluentui/blob/master/packages/react-select/src/components/Select/Select.types.ts)

### Slots

In this component, `select` is the primary slot. Since `select` is primary, `root` is a separate explicit slot to customize the wrapper.

```ts
export type SelectSlots = {
  /** Root of the component, renders as a `<span>`. */
  root: IntrinsicSlotProps<'span'>;
  /** The actual `<select>` element */
  select: IntrinsicSlotProps<'select'>;
  /** the icon, typically a down arrow */
  icon: IntrinsicSlotProps<'span'>;
};
```

### Children

Children of the `Select` component are rendered as children of the internal `<select>` element. The only children that are supported in practice are the `<optgroup>` and `<option>` elements.

## Structure

- _**Public**_

```tsx
<label htmlFor="selectID">Choose a color</label>
<Select id="selectID" className="my-select-class">
  <option>Red</option>
  <option>Green</option>
  <option>Blue</option>
</Select>
```

- _**DOM**_

```html
<label for="selectID">Choose a color</label>
<span class="my-select-class">
  <select id="selectID">
    <option>Red</option>
    <option>Green</option>
    <option>Blue</option>
  </select>
  <svg><!-- icon --></svg>
</span>
```

## Migration

The Select component is a new approach that was not present in `@fluentui/react` v8, or `@fluentui/react-northstar`. It can be considered if the currently used control is the `@fluentui/react` Dropdown component, or the `@fluentui/react-northstar` Dropdown without `search`.

### Props

| v8 Dropdown          | v0 Dropdown               | Proposal                          |
| -------------------- | ------------------------- | --------------------------------- |
| options              | items                     | children                          |
| defaultSelectedKey   | defaultValue              | child with `selected`             |
| selectedKey          | value                     | imperative ref.value              |
| id                   | n/a                       | id                                |
| disabled             | disabled                  | disabled                          |
| required             | n/a                       | required                          |
| multiSelect          | multiple                  | use Combobox                      |
| placeholder          | placeholder               | child with `value=""`             |
| ariaLabel            | n/a                       | aria-label                        |
| n/a                  | aria-\*                   | aria-\*                           |
| errorMessage         | error                     | invalid, message handled in Field |
| label, onRenderLabel | n/a                       | Handled in Field                  |
| componentRef         | n/a                       | ref                               |
| n/a                  | popperRef, popper props   | n/a                               |
| calloutProps         | list                      | n/a                               |
| panelProps           | n/a                       | n/a                               |
| openOnKeyboardFocus  | n/a                       | n/a                               |
| n/a                  | a11ySelectedItemsMessage  | n/a                               |
| n/a                  | align                     | n/a                               |
| n/a                  | autosize                  | n/a                               |
| n/a                  | checkable                 | n/a                               |
| n/a                  | clearable                 | n/a                               |
| n/a                  | defaultHighlightedIndex   | n/a                               |
| n/a                  | defaultOpen               | n/a                               |
| n/a                  | fluid                     | default style                     |
| n/a                  | headerMessage             | optgroup child with `name`        |
| n/a                  | highlightFirstItemOnOpen  | n/a                               |
| n/a                  | highlightedIndex          | n/a                               |
| n/a                  | inline                    | inline                            |
| n/a                  | inverted                  | n/a                               |
| n/a                  | loading                   | n/a                               |
| n/a                  | noResultsMessage          | use children                      |
| n/a                  | offset                    | n/a                               |
| n/a                  | open                      | n/a                               |
| n/a                  | position                  | n/a                               |
| n/a                  | positionFixed             | n/a                               |
| n/a                  | search                    | use Combobox                      |
| styles               | styles                    | style                             |
| onRenderCaretDown    | toggleIndicator           | use icon slot                     |
| n/a                  | triggerButton             | n/a                               |
| onRenderContainer    | n/a                       | n/a                               |
| onRenderItem         | renderItem                | use children                      |
| onRenderList         | list slot                 | n/a                               |
| onRenderOption       | renderItem, headerMessage | use children                      |
| onRenderPlaceholder  | n/a                       | n/a                               |
| onRenderTitle        | n/a                       | n/a                               |

## Behaviors and Accessibility

This component makes use of the native `<select>` element, and inherits the native semantics and keyboard interactivity.
