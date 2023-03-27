# Switch

> An implementation of a [switch](https://w3c.github.io/aria/#switch) as a form-connected web-component.

<br />

## **Design Spec**

[Link to Switch Design Spec in Figma](https://www.figma.com/file/TPQVDN5cxYBqkP9urETsCp/Switch?node-id=655%3A1158&t=kJMaMie08ejCnL7H-0)

<br />

## **Engineering Spec**

Fluent WC3 Switch extends from the [FAST Switch](https://www.fast.design/docs/components/switch/) and is intended to be as close to the Fluent UI React 9 Switch implementation as possible. However, due to the nature of web components there will not be 100% parity between the two.

### Use Case

Typical use cases include, but are not limited to, turning a feature on and off or showing or hiding a piece of UI

<br />

## Class: `Switch`

<br />

### **Component Name**

`fluent-switch`

<br />

### **Variables**

<br />

### **Fields**

| Name            | Privacy | Type                           | Default    | Description                                            |
| --------------- | ------- | ------------------------------ | ---------- | ------------------------------------------------------ |
| `checked`       | public  | `boolean`                      |            | Specifies whether switch input is checked              |
| `required`      | public  | `boolean`                      | `false`    | Specifies required styling for switch                  |
| `disabled`      | public  | `boolean`                      | `false`    | Sets disabled state for switch                         |
| `labelPosition` | public  | `"small"` `"medium"` `"large"` | `"medium"` | Specifies position of the label relative to the switch |

<br />

### **Methods**

<br />

### **Events**

| Name   | Type | Description | Inherited From                                             |
| ------ | ---- | ----------- | ---------------------------------------------------------- | --- |
| change |      |             | Emits a custom change event when the checked state changes |     |

<br />

### **Attributes**

| Name             | Field         |
| ---------------- | ------------- |
| `required`       | required      |
| `disabled`       | disabled      |
| `checked`        | checked       |
| `label-position` | labelPosition |

<br />

### **Slots**

| Name | Description                           |
| ---- | ------------------------------------- |
|      | Default slotted content for the label |

<br />
<hr />
<br />

### **Template**

`switchTemplate` from FastFoundation

<br />

## **Accessibility**

[W3 Switch Spec](https://w3c.github.io/aria/#switch)

<br />

### **WAI-ARIA Roles, States, and Properties**

- `aria-checked`
- `aria-disabled`

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
| `<Switch>`        | `<fluent-switch>`       |

<br />

**Property Mapping**
| Fluent UI React 9 | Fluent Web Components 3 | Description of difference |
|--------------------- |------------------------ |---------------------------|
| `<Switch label="">` | default slotted content | React implementation requires user to pass label through `prop` on the Switch <br /> The web components implementation requires user to pass the label through the default slotted content
