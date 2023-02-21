# Radio Group

> RadioGroup lets people select a single option from two or more Radio items. Use RadioGroup to present all available choices if there's enough space. For more than 5 choices, consider using a different component such as Dropdown.

<br />

## **Design Spec**

[Link to Radio Design Spec in Figma](https://www.figma.com/file/4XWsJrlpEcuEpUnZbtoIBU/Radio?node-id=1295%3A0&t=2wXnjT4ybxIxT6wu-0)

<br />

## **Engineering Spec**

A radio group is a set of checkable buttons, known as radio buttons, where no more than one of the buttons can be checked at a time. Some implementations may initialize the set with all buttons in the unchecked state in order to force the user to check one of the buttons before moving past a certain point in the workflow.

### Use Case

Radio group allows the user to be presented with a list of all the options visible which can facilitate the comparison of choice.

<br />

## Class: `RadioGroup`

<br />

### **Fields**

| Name          | Privacy | Type                     | Default      | Description                                                                                           |
| ------------- | ------- | ------------------------ | ------------ | ----------------------------------------------------------------------------------------------------- |
| `readOnly`    | public  | `boolean`                | `false`      | When true, the child radios will be immutable by user interaction.                                    |
| `disabled`    | public  | `boolean`                | `false`      | Disables the radio group and child radios.                                                            |
| `name`        | public  | `string`                 |              | The name of the radio group. Setting this value will set the name value for all child radio elements. |
| `value`       | public  | `string`                 |              | The value of the checked radio.                                                                       |
| `orientation` | public  | `horizontal \| vertical` | `horizontal` | The orientation of the group                                                                          |
| `childItems`  | public  | `HTMLElement[]`          |              | The orientation of the group                                                                          |

<br />

### **Methods**

| Name              | Privacy   | Description | Parameters | Return | Inherited From |
| ----------------- | --------- | ----------- | ---------- | ------ | -------------- |
| `nameChanged`     | protected |             |            | `void` |                |
| `valueChanged`    | protected |             |            | `void` |                |
| `templateChanged` | protected |             |            | `void` |                |
| `stylesChanged`   | protected |             |            | `void` |                |

<br />

### **Events**

| Name     | Type | Description                                          |
| -------- | ---- | ---------------------------------------------------- |
| `change` |      | Fires a custom 'change' event when the value changes |

<br />

### **Attributes**

| Name          | Field       | Inherited From |
| ------------- | ----------- | -------------- |
| `readOnly`    | readOnly    |                |
| `disabled`    | disabled    |                |
| `named`       | name        |                |
| `value`       | value       |                |
| `orientation` | orientation |                |

<br />

### **Slots**

| Name  | Description                       |
| ----- | --------------------------------- |
|       | The default slotted content       |
| label | Provide label for the radio group |

<br />
<hr />
<br />

### **Suggested Template**

`radioGroupTemplate` from FastFoundation

## **Accessibility**

[W3 Radio Spec](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_radio_role)

<br />

### **WAI-ARIA Roles, States, and Properties**

<br />
<hr />
<br />

## **Preparation**

<br />

### **Fluent Web Component v3 v.s Fluent React 9**

<br />

**Component and Slot Mapping**

| Fluent UI React 9 | Fluent Web Components 3 |
| ----------------- | ----------------------- |
| `<RadioGroup>`    | `<fluent-radio-group>`  |

<br />

**Property Mapping**
| Fluent UI React 9 | Fluent Web Components 3 | Description of difference |
|-------------------|------------------------ |---------------------------|
| `layout` | `orientation` | React implementation requires user to pass either `"horizontal"` or `"horizontal-stacked"` through `layout` prop. <br /> WC3 implementation requires user to either pass `"vertical"` or "`horizontal"` through `orientation` attribute.
