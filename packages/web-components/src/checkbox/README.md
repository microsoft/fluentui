# Checkbox

> An implementation of a [checkbox](https://w3c.github.io/html-reference/input.checkbox.html) as a form-connected web-component.

<br />

## **Design Spec**

[Link to Checkbox Design Spec in Figma](https://www.figma.com/file/1a1hBVizk7aLH76IvrnPFs/Checkbox?node-id=1666-534&t=Y5ISi4tWguXRFMdP-0)

<br />

## **Engineering Spec**

Fluent WC3 Checkbox extends from the [FAST Checkbox](https://explore.fast.design/components/fast-checkbox) and is intended to be as close to the Fluent UI React 9 Checkbox implementation as possible. However, due to the nature of web components there will not be 100% parity between the two.

<br />

## Class: `Checkbox`

<br />

### **Component Name**

`<fluent-checkbox>`

<br />

### **Component Template**

FAST `checkboxTemplate`

<br />

### **Variables**

| Name                    | Description          | Type                                         |
| ----------------------- | -------------------- | -------------------------------------------- |
| `CheckboxLabelPosition` | label position types | `{ before: "before", after: "after" }`       |
| `CheckboxShape`         | checkbox shape types | `{ square: "square", circular: "circular" }` |
| `CheckboxSize`          | checkbox size types  | `{ medium: "medium", large: "large" }`       |

<br />

### **Methods**

| Name              | Privacy | Description             |
| ----------------- | ------- | ----------------------- |
| `keypressHandler` | public  | fires on keyboard press |
| `clickHandler `   | public  | fires on mouse click    |

### **Events**

| Name     | Type | Description                 | Inherited From |
| -------- | ---- | --------------------------- | -------------- |
| `change` |      | Fires a custom change event | `FASTCheckbox` |

<br />

### **Attributes**

| Name             | Privacy | Type                    | Default                       | Description                                        |
| ---------------- | ------- | ----------------------- | ----------------------------- | -------------------------------------------------- |
| `label-position` | public  | `CheckboxLabelPosition` | `CheckboxLabelPosition.after` | Indicates postion of label                         |
| `checked`        | public  | `boolean`               | `false`                       | Indicates whether input is checked                 |
| `indeterminate`  | public  | `boolean`               | `false`                       | Indicates whether input is initially indeterminate |
| `disabled`       | public  | `boolean`               | `false`                       | Indicates whether input is disabled                |
| `required `      | public  | `boolean`               | `false`                       | Indicates whether input is required                |
| `size`           | public  | `CheckboxSize`          | `CheckboxSize.medium`         | Indicates the size of the checkbox                 |
| `shape`          | public  | `CheckboxShape`         | `CheckboxShape.square`        | Indicates shape of the checkbox                    |

<br />

### **IDL Attributes**

| Name            | Field         | Type      | Description                                     |
| --------------- | ------------- | --------- | ----------------------------------------------- |
| `checked`       | checked       | `boolean` | The current checked state of the checkbox       |
| `indeterminate` | indeterminate | `boolean` | The indeterminate state. Independent of checked |

<br />

### **Slots**

| Name                      | Description                                    |
| ------------------------- | ---------------------------------------------- |
|                           | The default slot for text input content        |
| `checked-indicator`       | The named slot for the checked indicator       |
| `indeterminate-indicator` | The named slot for the indeterminate indicator |

<br />
<hr />
<br />

## **Accessibility**

[W3C Checkbox Spec](https://w3c.github.io/html-reference/input.checkbox.html)

<br />

### **WAI-ARIA Roles, States, and Properties**

- `role="checkbox"`
- `aria-checked`
- `aria-required`
- `aria-disabled`

<br />

### **Fluent Web Component v3 v.s Fluent React 9**

<br />

**Component and Slot Mapping**

| Fluent UI React 9 | Fluent Web Components 3         | Description                      |
| ----------------- | ------------------------------- | -------------------------------- |
| `<Checkbox>`      | `<fluent-checkbox>`             |
| n/a               | slot: `checked-indicator`       | slot for checked indicator       |
| n/a               | slot: `indeterminate-indicator` | slot for indeterminate indicator |

<br />

**Property Mapping**
| Fluent UI React 9 | Fluent Web Components 3 | Description of difference |
| ---------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `checked: boolean | 'mixed'` | `checked: boolean` `indeterminate: boolean` | Fluent UI React v9 uses a single property to set the checked and indeterminate states, while Fluent UI Web Components v3 requires separate boolean attributes for each state.
