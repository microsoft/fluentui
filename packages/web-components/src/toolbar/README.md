# Toolbar

> An implementation of a [toolbar](https://w3c.github.io/aria/#toolbar) as a form-connected web-component.

<br />

## **Design Spec**

[Link to Toolbar Design Spec in Figma](https://www.figma.com/file/TPQVDN5cxYBqkP9urETsCp/Toolbar?node-id=655%3A1158&t=kJMaMie08ejCnL7H-0)

<br />

## **Engineering Spec**

Fluent WC3 Toolbar extends from the [FAST Toolbar](https://www.fast.design/docs/components/Toolbar/) and is intended to be as close to the Fluent UI React 9 Toolbar implementation as possible. However, due to the nature of web components there will not be 100% parity between the two.

### Use Case

Typical use cases include, but are not limited to, grouping a set of controls, such as buttons, menu buttons, or checkboxes.

<br />

## Class: `Toolbar`

<br />

### **Component Name**

`fluent-Toolbar`

<br />

### ** CSS Variables**

borderRadiusMedium,
colorNeutralBackground1,
colorNeutralBackground1Hover,
colorNeutralBackground1Pressed,
colorNeutralForeground1,
colorNeutralForeground2,
fontFamilyBase,
spacingHorizontalNone,
spacingHorizontalS,
spacingHorizontalXL,
spacingHorizontalXS,

### **Fields**

| Name          | Privacy | Type                           | Default        | Description                                        |
| ------------- | ------- | ------------------------------ | -------------- | -------------------------------------------------- |
| `orientation` | public  | `"horizontal"` `"vertical"`    | `"horizontal"` | Specifies Toolbar orientation relative to the page |
| `size`        | public  | `"small"` `"medium"` `"large"` | `"medium"`     | Specifies height of the Toolbar                    |

<br />

### **Methods**

<br />

### **Events**

Interactions are inherited from FAST Toolbar component.

| Name             | Description                             |
| ---------------- | --------------------------------------- |
| `clickHandler`   | Sets the active index                   |
| `focusinHandler` | Sets focus on element with active index |
| `keydownHandler` | Handles keydown events on the toolbar   |

<br />

### **Attributes**

| Name          | Field       |
| ------------- | ----------- |
| `orientation` | orientation |
| `size`        | size        |

<br />

### **Slots**

| Name  | Description                                                                         |
| ----- | ----------------------------------------------------------------------------------- |
| label | Content which appears as the label for the toolbar                                  |
| start | Content which appears at the start of the toolbar, before the default slotted items |
| end   | Content which appears at the end of the toolbar, right aligned                      |
|       | Default slotted content for the label                                               |

<br />
<hr />
<br />

### **Template**

`ToolbarTemplate` from FastFoundation

<br />

## **Accessibility**

[W3 Toolbar Spec](https://w3c.github.io/aria/#toolbar)

<br />

### **WAI-ARIA Roles, States, and Properties**

- `aria-orientation`

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
| `<Toolbar>`       | `<fluent-toolbar>`      |

<br />

**Property Mapping**
| Fluent UI React 9 | Fluent Web Components 3 | Description of difference |
|--------------------- |------------------------ |---------------------------|
| `vertical?: boolean` | `orientation?: "horizontal" or "vertical"` | React implementation uses an optional boolean to change orientation from default horizontal to vertical whereas the web component uses an optional string to change orientation from default horizontal to vertical. |
