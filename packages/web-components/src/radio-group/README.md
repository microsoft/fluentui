# Radio Group

> RadioGroup lets users select a single option from two or more Radio items. Use RadioGroup to present all available choices if there's enough space..

<br />

## **Design Spec**

[Link to Radio Design Spec in Figma](https://www.figma.com/file/4XWsJrlpEcuEpUnZbtoIBU/Radio?node-id=1295%3A0&t=2wXnjT4ybxIxT6wu-0)

<br />

## **Engineering Spec**

As defined by the [W3C](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)..

> A radio group is a set of checkable buttons, known as radio buttons, where no more than one of the buttons can be checked at a time. Some implementations may initialize the set with all buttons in the unchecked state in order to force the user to check one of the buttons before moving past a certain point in the workflow.

### Use Case

Used anywhere an author might group a list of radio options.

<br />

## Class: `RadioGroup`

<br />

### **Component Name**

<br />

`fluent-radio-group`

<br />

### **Fields**

| Name          | Privacy | Type                     | Default      | Description                                                                                                                                                                                                                                                                                                         |
| ------------- | ------- | ------------------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `disabled`    | public  | `boolean`                | `false`      | Disables the radio group and child radios.                                                                                                                                                                                                                                                                          |
| `name`        | public  | `string`                 |              | The name of the radio group. Setting this value will set the name value for all child radio elements.                                                                                                                                                                                                               |
| `value`       | public  | `string`                 |              | The value of the checked radio.                                                                                                                                                                                                                                                                                     |
| `orientation` | public  | `horizontal \| vertical` | `horizontal` | Determines whether radios in a radio group are rendered in a horizontal row or a vertical column. The default value is horizontal, which will render radios in a horizontal row with labels appearing inline. Setting orientation to vertical will render radios in a vertical column with labels appearing inline. |
| `stacked`     | public  | `boolean`                | `false`      | Determines whether the labels for radios appear inline or stacked when orientation is set to horizontal. The default value is false, which will display the labels inline. If stacked is set to true, the labels will appear under each radio in a horizontal row.                                                  |
| default slot  | public  | `HTMLElement[]`          |              | The default slot expecting Radio items.                                                                                                                                                                                                                                                                             |

<br />

### **Methods**

| Name           | Privacy   | Description | Parameters | Return | Inherited From |
| -------------- | --------- | ----------- | ---------- | ------ | -------------- |
| `nameChanged`  | protected |             |            | `void` |                |
| `valueChanged` | protected |             |            | `void` |                |

<br />

### **Events**

| Name     | Event Type    | Target           | Arguments | Description                                                                                                       |
| -------- | ------------- | ---------------- | --------- | ----------------------------------------------------------------------------------------------------------------- |
| `change` | `CustomEvent` | `FASTRadioGroup` | none      | Fired when the value of the RadioGroup changes (i.e., when a different radio button within the group is selected) |

<br />

### **Attributes**

| Name          | Field       | Inherited From |
| ------------- | ----------- | -------------- |
| `disabled`    | disabled    |                |
| `named`       | name        |                |
| `value`       | value       |                |
| `orientation` | orientation |                |

<br />

### **Slots**

| Name  | Description                       |
| ----- | --------------------------------- |
|       | The default slot for radios       |
| label | Provide label for the radio group |

<br />
<hr />
<br />

### **Suggested Template**

`radioGroupTemplate` from FastFoundation

## **Accessibility**

[W3 Radio Spec](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)

<br />

### **WAI-ARIA Roles, States, and Properties**

| Attributes        | value          | Description                              |
| ----------------- | -------------- | ---------------------------------------- |
| `aria-labelledby` |                | used to associate a label with the group |
| `role`            | `"radiogroup"` | used to define a group of radio buttons  |

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
| Fluent UI React 9 | Fluent Web Components | Description of difference |
|-------------------|-------------------------- |---------------------------|
| `layout` | `orientation` + `stacked` | React implementation requires user to pass either `"horizontal"` or `"horizontal-stacked"` through `layout` prop. <br /> WC3 implementation requires user to either pass `"vertical"` or "`horizontal"` through `orientation` attribute. Additionally, adding the `boolean` attribute `stacked` when the orientation is set to `horizontal` will create the `horizontal-stacked` layout available in FUIR9.
