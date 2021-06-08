# @fluentui/react-checkbox Spec

## Background

Checkboxes are used to represent one or more options, giving the user a way to select one or more of these options.

## Prior Art

- Open UI research:
  - Concepts: https://open-ui.org/components/checkbox.research.concepts
  - Findings: https://open-ui.org/components/checkbox.research.findings
  - Proposal: https://open-ui.org/components/checkbox
- Github Epic: https://github.com/microsoft/fluentui/issues/18454

### Checkbox in v0/Northstar

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

### Checkbox in v8/Fabric

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

## Sample Code

_Provide some representative example code that uses the proposed API for the component_

## Variants

_Describe visual or functional variants of this control, if applicable. For example, a slider could have a 2D variant._

## API

_List the **Props** and **Slots** proposed for the component. Ideally this would just be a link to the component's `.types.ts` file_

## Structure

- _**Public**_
- _**Internal**_
- _**DOM** - how the component will be rendered as HTML elements_

## Migration

_Describe what will need to be done to upgrade from the existing implementations:_

- _Migration from v8_
- _Migration from v0_

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
