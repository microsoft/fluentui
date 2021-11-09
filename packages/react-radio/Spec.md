# @fluentui/react-radio Spec

The Radio component lets people select a single value from two or more options.
Use the Radio component to represent two or more available choices, preferably up to 7 options.

## Background

In Fabric the Radio component is represented by the [ChoiceGroup](https://developer.microsoft.com/en-us/fluentui#/controls/web/choicegroup) component.
Fabric creates options based on data passed in via the `options` prop.
It uses the option's `key` property as the input value and holds the currently selected value in the `selectedKey` prop.
Fabric also allows an image to serve as a label for an option.

```tsx
<ChoiceGroup
  defaultSelectedKey="B"
  options={[
    { key: 'A', text: 'Option A' },
    { key: 'B', text: 'Option B' },
    { key: 'C', text: 'Option C', disabled: true },
    { key: 'D', text: 'Option D' },
  ]}
  label="Pick one"
  required={true}
/>
```

In Northstar the Radio component is represented by the [RadioGroup](https://fluentsite.z22.web.core.windows.net/components/radio-group/definition) component.
Northstar creates options based on data passed in via the `items` prop.
It uses the option's `value` property as the input value and holds the currently selected value in the `checkedValue` prop.

```tsx
<RadioGroup
  onCheckedValueChange={handleChange}
  items={[
    { key: '1', label: 'Make your choice', value: '1' },
    { key: '2', label: 'Another option', value: '2' },
  ]}
/>
```

### Prior Art

- [OpenUI research](https://open-ui.org/components/radio-button.research)
- [Epic](https://github.com/microsoft/fluentui/issues/19953)

### Comparison of [Fabric ChoiceGroup](https://developer.microsoft.com/en-us/fluentui#/controls/web/choicegroup) and [Stardust RadioGroup](https://fluentsite.z22.web.core.windows.net/components/radio-group/definition)

- All mentions of v7 or v8 refer to Fabric - `@fluentui/react` ([docsite](https://developer.microsoft.com/en-us/fluentui#/))
- All mentions of v0 refer to Northstar - `@fluentui/react-northstar` ([docsite](https://fluentsite.z22.web.core.windows.net/))

_⚠️ Props not included in this section are marked as deprecated and will not be considered._

_Include background research done for this component_

- [x] _Link to Open UI research_
- [ ] _Link to comparison of v7 and v0_
- [x] _Link to GitHub epic issue for the converged component_

## Variants

TODO: pics
_Describe visual or functional variants of this control, if applicable. For example, a slider could have a 2D variant._

### Horizonal

![Horizontal group](./etc/images/horizontal-group.png)

### Horizonal stacked

![Horizontal group - stacked](./etc/images/horizontal-group-stacked.png)

### Vertical

![Vertical group](./etc/images/vertical-group.png)

### Vertical with input

![Vertical group with input](./etc/images/vertical-group-with-input.png)

### Vertical with dropdown

![Vertical group with dropdown](./etc/images/vertical-group-with-dropdown.png)

### Vertical with subtext

![Vertical group with subtext](./etc/images/vertical-group-with-subtext.png)

## API

_List the **Props** and **Slots** proposed for the component. Ideally this would just be a link to the component's `.types.ts` file_

### Components

| Component | Purpose                                             |
| --------- | --------------------------------------------------- |
| Radio     | Wraps radio inputs. Provides API for control group. |
| RadioItem | Represents a single radio input.                    |

### Radio

| Prop           | Type                         | Purpose                                                                          |
| -------------- | ---------------------------- | -------------------------------------------------------------------------------- |
| defaultValue   | `string`                     | Which option should be preselected by default. (default: undefined)              |
| label (legend) | `string \| (slot)`           | Label for the group of radio controls.                                           |
| name           | `string`                     | Name property passed to child inputs.                                            |
| orientation    | `"horizontal" \| "vertical"` | Specifies how the layout in which the controls are rendered. (default: vertical) |
| value          | `string`                     | Currently selected value. Used only for controlled mode.                         |

### RadioItem

| Prop                              | Type               | Purpose                                                  |
| --------------------------------- | ------------------ | -------------------------------------------------------- |
| key (root)                        | `string`           | React `key` prop.                                        |
| id (input - id & label - htmlfor) | `string`           | ID passed to input. Also used for input + label pairing. |
| label (label)                     | `string \| (slot)` | Label that will be rendered next to the radio input.     |
| checked (input)                   | `boolean`          | Whether the input is checked or not.                     |
| disabled (input)                  | `boolean`          | Whether the input is disabled or not.                    |

### Sample Code

```tsx
const iceCreams = [
  'Chocolate',
  'Strawberry',
  'Mango',
]

<Radio label="Which ice cream would you like?" name="ice-cream">
  {iceCreams.map(
    iceCream => (
      <RadioItem
        key={iceCream}
        id={`ic-${iceCream}`}
        label={iceCream}
      />
    )
  )}
</Radio>
```

## Structure

- _**Public**_
- _**Internal**_
- _**DOM** - how the component will be rendered as HTML elements_

### DOM structure

```html
<fieldset>
  <legend>Which ice cream would you like?</legend>
  <span>
    <input id="ic-Chocolate" name="ice-cream" type="radio" />
    <label for="ic-Chocolate">Chocolate</label>
  </span>
  <span>
    <input id="ic-Strawberry" name="ice-cream" type="radio" />
    <label for="ic-Strawberry">Strawberry</label>
  </span>
  <span>
    <input id="ic-Mango" name="ice-cream" type="radio" />
    <label for="ic-Mango">Mango</label>
  </span>
</fieldset>
```

<!--
## Migration

_Describe what will need to be done to upgrade from the existing implementations:_

- _Migration from v8_
- _Migration from v0_ -->

## Behaviors

_Explain how the component will behave in use, including:_

- _Component States_
- _Interaction_
  - _Keyboard_
  - _Cursor_
  - _Touch_
  - _Screen readers_

## Accessibility

Base accessibility information is included in the design document. After the spec is filled and review, outcomes from it need to be communicated to design and incorporated in the design document.

- Decide whether to use **native element** or folow **ARIA** and provide reasons
- Identify the **[ARIA](https://www.w3.org/TR/wai-aria-practices-1.2/) pattern** and, if the component is listed there, follow its specification as possible.
- Identify accessibility **variants**, the `role` ([ARIA roles](https://www.w3.org/TR/wai-aria-1.1/#role_definitions)) of the component, its `slots` and `aria-*` props.
- Describe the **keyboard navigation**: Tab Oder and Arrow Key Navigation. Describe any other keyboard **shortcuts** used
- Specify texts for **state change announcements** - [ARIA live regions
  ](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) (number of available items in dropdown, error messages, confirmations, ...)
- Identify UI parts that appear on **hover or focus** and specify keyboard and screen reader interaction with them
- List cases when **focus** needs to be **trapped** in sections of the UI (for dialogs and popups or for hierarchical navigation)
- List cases when **focus** needs to be **moved programatically** (if parts of the UI are appearing/disappearing or other cases)

# Appendix

### RadioGroup (v0) vs ChoiceGroup (v8) prop mapping

| Purpose                                                                                           | Fabric (v8)        | Northstar (v0)       | Matching                                   |
| ------------------------------------------------------------------------------------------------- | ------------------ | -------------------- | ------------------------------------------ |
| Called after radio group value is changed.                                                        | onChange           | onCheckedValueChange | Matching 🛠️                                |
| The options/items for the group.                                                                  | options            | items                | Matching                                   |
| Additional CSS styles to apply to the component instance.                                         | styles             | styles               | Matching                                   |
| Initial checkedValue value.                                                                       | defaultSelectedKey | defaultCheckedValue  | Matching functionality, not implementation |
| Value of the currently checked radio item.                                                        | selectedKey        | checkedValue         | Matching functionality, not implementation |
| Theme - Override for theme site variables to allow modifications of component styling via themes. | theme              | variables            | Matching                                   |
| ID of an element to use as the aria label for this ChoiceGroup.                                   | ariaLabelledBy     | -                    | -                                          |
| Optional callback to access the `IChoiceGroup` interface.                                         | componentRef       | -                    | -                                          |
| Descriptive label for the choice group.                                                           | label              | -                    | -                                          |
| Accessibility behavior if overridden by the user.                                                 | -                  | accessibility        | -                                          |
| An element type to render as (string or component).                                               | -                  | as                   | -                                          |
| Additional CSS class name(s) to apply.                                                            | -                  | className            | -                                          |
| A vertical radio group displays elements vertically.                                              | -                  | vertical             | -                                          |
| -                                                                                                 | -                  | design               | -                                          |

### RadioItem (v0) vs ChoiceGroupOption (v8) props mapping

| Purpose                                                                         | Fabric (v8)        | Northstar (v0)   | Matching |
| ------------------------------------------------------------------------------- | ------------------ | ---------------- | -------- |
| A required key to uniquely identify the option.                                 | key (required)     | -                | -        |
| The text string for the option.                                                 | text (required) ❓ | label            | Matching |
| Call to provide customized styling that will layer on top of the variant rules. | styles             | styles           | Matching |
| A radio item can appear disabled and be unable to change states.                | disabled           | disabled         | Matching |
| Aria label of the option for the benefit of screen reader users.                | ariaLabel          | -                | -        |
| Props for an icon to display with this option.                                  | iconProps          | -                | -        |
| ID used on the option's input element.                                          | id                 | -                | -        |
| Alt text if the option is an image.                                             | imageAlt           | -                | -        |
| The width and height of the image in px for choice field.                       | imageSize          | -                | -        |
| Image to display with this option.                                              | imageSrc           | -                | -        |
| ID used on the option's label.                                                  | labelId            | -                | -        |
| Used to customize option rendering.                                             | onRenderField      | -                | -        |
| Used to customize label rendering.                                              | onRenderLabel      | -                | -        |
| The src of image for choice field which is selected.                            | selectedImageSrc   | -                | -        |
| Accessibility behavior if overridden by the user.                               | -                  | accessibility    | -        |
| Whether or not radio item is checked.                                           | -                  | checked          | -        |
| The checked radio item indicator can be customized.                             | -                  | checkedIndicator | -        |
| Initial checked value.                                                          | -                  | defaultChecked   | -        |
| The radio item indicator can be customized.                                     | -                  | indicator        | -        |
| The HTML input name.                                                            | -                  | name             | -        |
| Called after radio item checked state is changed.                               | -                  | onChange         | -        |
| Called after radio item is clicked.                                             | -                  | onClick          | -        |
| Whether should focus when checked                                               | -                  | shouldFocus      | -        |
| The HTML input value.                                                           | -                  | value            | -        |
| A vertical radio group displays elements vertically.                            | -                  | vertical         | -        |
| -                                                                               | -                  | as               | -        |
| -                                                                               | -                  | className        | -        |
| -                                                                               | -                  | variables        | -        |
| -                                                                               | -                  | design           | -        |
