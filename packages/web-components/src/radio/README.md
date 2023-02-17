# Radio

> Radio buttons allow users to select a single option from two or more choices. Radio buttons are typically rendered as small circles, which are filled or highlighted when selected.

<br />

## **Design Spec**

[Link to Radio Design Spec in Figma](https://www.figma.com/file/4XWsJrlpEcuEpUnZbtoIBU/Radio?node-id=1295%3A1&t=YOHXLUSK493rMiyh-0)

<br />

## **Engineering Spec**

Fluent WC3 Radio is a form associated component that extends from the FAST Radio [FAST Radio](https://explore.fast.design/components/fast-radio) and is intended to be as close to the Fluent UI React 9 Menu implementation as possible. However, due to the nature of web components there will not be 100% parity between the two.

### Use Case

Used anywhere an author might otherwise use an input[type="radio"]. Used to facilitate choice where only one choice is acceptable.

<br />

## Class: `Radio`

<br />

### **Variables**

<br />

### **Fields**

| Name            | Privacy | Type                | Default   | Description                                                                                                                                                                              |
| --------------- | ------- | ------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `readOnly`      | public  | `boolean`           |           | When true, the control will be immutable by user interaction. See readonly [HTML attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly) for more information. |
| `name`          | public  | `string`            |           | The name of the radio. See [name attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname) for more info.                                              |
| `disabled`      | public  | `boolean`           |           | Sets disabled state for radio                                                                                                                                                            |
| `labelPosition` | public  | `"after"` `"below"` | `"below"` | The position of the label relative to the radio indicator.                                                                                                                               |
| `checked`       | public  | `boolean`           | `false`   | When true, radio button will be checked                                                                                                                                                  |

<br />

### **Methods**

| Name              | Privacy | Description | Parameters | Return | Inherited From    |
| ----------------- | ------- | ----------- | ---------- | ------ | ----------------- |
| `templateChanged` | public  |             |            | `void` | FoundationElement |
| `stylesChanged`   | public  |             |            | `void` | FoundationElement |

<br />

### **Events**

| Name     | Type | Inherited From |
| -------- | ---- | -------------- |
| `change` |      |                |

<br />

### **Attributes**

| Name       | Field    |
| ---------- | -------- |
| `readOnly` | readOnly |

<br />

### **Slots**

| Name                | Description                            |
| ------------------- | -------------------------------------- |
| `checked-indicator` | The checked indicator                  |
|                     | Default slotted content for label text |

<br />
<hr />
<br />

### **Suggested Template**

`radioTemplate` from FastFoundation

## **Accessibility**

[W3 Radio Spec](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_radio_role)

<br />

### **WAI-ARIA Roles, States, and Properties**

| Attributes      | value   | Description                         |
| --------------- | ------- | ----------------------------------- |
| `role`          | `radio` |
| `aria-checked`  |         | the checked state of the component  |
| `aria-required` |         | the required state of the component |
| `aria-disabled` |         | the disabled state of the component |
| `tabindex`      | `0`     |                                     |

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
| `<Radio>`         | `<fluent-radio>`        |

<br />

**Property Mapping**
| Fluent UI React 9 | Fluent Web Components 3 | Description of difference |
|-------------------|------------------------ |---------------------------|
| `prop label` | default slotted content | React implementation requires user to pass a string through the `label` prop on the Radio component <br /><br /> The web component implementation requires users to pass the label text through the default slotted content
