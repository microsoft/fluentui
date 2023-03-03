# Accordion

As defined by the [W3C](https://w3c.github.io/aria-practices/#accordion):

> An accordion is a vertically stacked set of interactive headings that each contain a title, content snippet, or thumbnail representing a section of content. The headings function as controls that enable users to reveal or hide their associated sections of content. Accordions are commonly used to reduce the need to scroll when presenting multiple sections of content on a single page.

<br />

## **Design Spec**

[Link to Accordion Design Spec in Figma](https://www.figma.com/file/7X3Tgd3fTurii3FACrfhzo/Accordion?node-id=2777%3A42482&t=jHgc4PXRMQH6rPmy-0)

<br />

## **Engineering Spec**

Fluent WC3 Accordion extends from the [FAST Accordion](https://explore.fast.design/components/fast-accordion) and is intended to be as close to the Fluent UI React 9 Accordion implementation as possible. However, due to the nature of web components there will not be 100% parity between the two.

<br />

## Class: `Accordion`

<br />

### **Component Name**

`Accordion`

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

## **Accessibility**

[W3 Accordion Spec](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)

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
| `<Accordion>`     | `<fluent-accordion>`    |

<br />

**Property Mapping**
| Fluent UI React 9 | Fluent Web Components 3 | Description of difference |
| ------------------------- | ------------------------------------------ |---------------------------------------------------------- |
| `defaultOpenItems: number`| `expand: boolean` | `defaultOpenItems` is a number property set on the `Accordion` corresponding to the intended `AccordionItem` to be expanded.<hr /> `expand` is a boolean property set directly on the `AccordionItem` intended to be expanded |
| `multiple: boolean` | `expand-mode: "single" \| "multiple"` | |
