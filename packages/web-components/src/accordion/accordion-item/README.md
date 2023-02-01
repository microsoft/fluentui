# Accordion + Accordion Item

As defined by the [W3C](https://w3c.github.io/aria-practices/#accordion):

> An accordion is a vertically stacked set of interactive headings that each contain a title, content snippet, or thumbnail representing a section of content. The headings function as controls that enable users to reveal or hide their associated sections of content. Accordions are commonly used to reduce the need to scroll when presenting multiple sections of content on a single page.

<br />

## **Design Spec**

[Link to Accordion Design Spec in Figma](https://www.figma.com/file/7X3Tgd3fTurii3FACrfhzo/Accordion?node-id=2777%3A42482&t=jHgc4PXRMQH6rPmy-0)

<br />

## **Engineering Spec**

<br />

## Class: `Accordion`

<br />

### **Variables**

| Name                  | Description               | Type                                   |
| --------------------- | ------------------------- | -------------------------------------- |
| `AccordionExpandMode` | Expand mode for Accordion | `{ single: "single", multi: "multi" }` |

<br />

### **Fields**

| Name             | Privacy   | Type                  | Default    | Description                                                                                   |
| ---------------- | --------- | --------------------- | ---------- | --------------------------------------------------------------------------------------------- |
| `expandmode`     | public    | `AccordionExpandMode` | `multiple` | Controls the expand mode of the Accordion, either allowing single or multiple item expansion. |
| `AccordionItems` | protected | `Element[]`           |

<br />

### **Methods**

| Name                | Privacy | Description | Parameters                                              | Return | Inherited From |
| ------------------- | ------- | ----------- | ------------------------------------------------------- | ------ | -------------- |
| `expandmodeChanged` | public  |             | `prev: AccordionExpandMode, next: AccordionExpandMode ` |

<br />

### **Events**

| Name     | Type | Description                                                | Inherited From |
| -------- | ---- | ---------------------------------------------------------- | -------------- |
| `change` |      | Fires a custom 'change' event when the active item changes |

<br />

### **Attributes**

| Name          | Field      |
| ------------- | ---------- |
| `expand-mode` | expandmode |

<br />

<hr />

<br />

## Class: `AccordionItem`

<br />

### **Variables**

| Name                              | Description                | Type                                                                              |
| --------------------------------- | -------------------------- | --------------------------------------------------------------------------------- |
| `AccordionItemSize`               | Expand modes for Accordion | `{ small: "small", medium: "medium", large: "large", extraLarge: "extra-large" }` |
| `AccordionItemExpandIconPosition` | Expand icon position       | `{ start: "start", end: "end" }`                                                  |

<br />

### **Fields**

| Name                 | Privacy | Type                              | Default  | Description                                                                                    | Inherited From |
| -------------------- | ------- | --------------------------------- | -------- | ---------------------------------------------------------------------------------------------- | -------------- |
| `headinglevel`       | public  | `1 or 2 or 3 or 4 or 5 or 6`      | `2`      | Configures the [level](https://www.w3.org/TR/wai-aria-1.1/#aria-level) of the heading element. |                |
| `expanded`           | public  | `boolean`                         | `false`  | Expands or collapses the item.                                                                 |                |
| `disabled`           | public  | `boolean`                         | `false`  | Disables an accordion item                                                                     |                |
| `id`                 | public  | `string`                          |          | The item ID                                                                                    |                |
| `size`               | public  | `AccordionItemSize`               | `medium` | The font size of the AccordionItem header.                                                     |
| `block`              | public  | `boolean`                         | `true`   | Sets the width of the focus state.                                                             |
| `expandIconPosition` | public  | `AccordionItemExpandIconPosition` | `start`  | Sets the position of the expand icon                                                           |

<br />

### **Events**

| Name     | Type | Description                                              | Inherited From |
| -------- | ---- | -------------------------------------------------------- | -------------- |
| `change` |      | Fires a custom 'change' event when the button is invoked |                |

<br />

### **Attributes**

| Name                 | Field              |
| -------------------- | ------------------ |
| `heading-level`      | headinglevel       |
|                      | expanded           |
|                      | disabled           |
|                      | block              |
| `id`                 | id                 |
| `expandIconPosition` | expandIconPosition |
| `size`               | size               |

<br />

### **Slots**

| Name             | Description                                                                      |
| ---------------- | -------------------------------------------------------------------------------- |
| `start`          | The slot used for a presentation icon when expanded                              |
| `end`            | The slot used for a presentation icon when collapsed                             |
| `heading`        | Content which serves as the accordion item heading and text of the expand button |
|                  | The default slot for accordion item content                                      |
| `expanded-icon`  | The slot used for a custom expanded icon                                         |
| `collapsed-icon` | The slot used for a custom collapsed icon                                        |

<br />
<hr />
<br />

## **Web Component v3 v.s Fluent UI React 9 implementation**

**Component and Slot Mapping**

| Fluent UI React 9   | Fluent Web Components 3   |
| ------------------- | ------------------------- |
| `<Accordion>`       | `<Accordion>`             |
| `<AccordionItem>`   | `<AccordionItem>`         |
| `<AccordionHeader>` | `slot="heading"`          |
| `<AccordionPanel>`  | `default slotted content` |

<br />

**Props that are now slots**
| Fluent UI React 9 Prop | Fluent Web Components 3 Slot |
|------------------------|------------------------------|
| `expandIcon` | `collapsed-icon` + `expanded-icon` |
| `icon` | `start` + `end`

<br />

**Property Mapping**
| Fluent UI React 9 | Fluent Web Components 3 |
|---------------------------|-------------------------|
| `defaultOpenItems` | `expand` |
| `multiple`, `collapsible` | `expandmode` |
| `size` | `size` |
| `as` | `headinglevel` |
| `disabled` | `disabled` |
| `expandIconPosition` | `expandIconPosition` |
