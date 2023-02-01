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

<br />

**Component and Slot Mapping**

| Fluent UI React 9   | Fluent Web Components 3   |
| ------------------- | ------------------------- |
| `<Accordion>`       | `<Accordion>`             |
| `<AccordionItem>`   | `<AccordionItem>`         |
| `<AccordionHeader>` | `named slot = "heading"`  |
| `<AccordionPanel>`  | `default slotted content` |

<br />

**Property Mapping**
| Fluent UI React 9 | Fluent Web Components 3 | Description of difference |
|---------------------------|---------------------------|------------------------------------------------------------------------------------------|
| `defaultOpenItems: number`| `expand: boolean` | _FuiR9_ `defaultOpenItems` is a number property set on the `Accordion` corresponding to the intended `AccordionItem` to be expanded.<hr /> `expand` is a boolean property set directly on the `AccordionItem` intended to be expanded.
| `multiple: boolean` | `expandmode: "single"` &#124; `"multiple"`| |
| `size` | `size` |
| `as: 'h1'` &#124; `'h2'` &#124; `'h3'` &#124; `'h4'` &#124; `'h5'` &#124; `'h6'` | `headinglevel: 1` &#124; `2` &#124; `3` &#124; `4` &#124; `5` &#124; `6` | `as` property sets a wrapper around the `AccordionItem` header with the corresponding header tag ( `h1`, `h2`, etc. ) <hr /> `headinglevel` sets the `aria-level` attribute to the corresponding heading level.
| `disabled` | `disabled` |
| `expandIconPosition` | `expandIconPosition` |
| `expandIcon` | `named slot: collapsed-icon` + `expanded-icon` | `expandIcon` is a prop that is passed a ternary to render the appropriate icon. <hr /> `collapsed-icon` and `expanded-icon` are named slots to supply the appropriate icons.
| `icon` | `named slot: start` + `end` | `icon` is a property set on the `AccordionHeader` through which an icon is passed <hr /> `start` and `end` are named slots through which to supply a presentation icon.

**Property Mapping**
| Fluent UI React 9 | Fluent Web Components 3 |
|-----------------------------------------------------------------------------------------------------------------------|---------------------------|
| `defaultOpenItems: number` <br />set on the `Accordion` corresponding to the intended `AccordionItem` to be expanded. | `expand: boolean` <br /> boolean property set directly on the `AccordionItem` intended to be expanded.
| `multiple: boolean` | `expandmode: "single"` &#124; `"multiple"`|
| `size: 'small'` &#124; `'medium'` &#124; `'large'` &#124; `'extra-large'` | `size: 'small'` &#124; `'medium'` &#124; `'large'` &#124; `'extra-large'` |
| `as: 'h1'` &#124; `'h2'` &#124; `'h3'` &#124; `'h4'` &#124; `'h5'` &#124; `'h6'` <br /> sets wrapper around header with the corresponding header tag | `headinglevel: 1` &#124; `2` &#124; `3` &#124; `4` &#124; `5` &#124; `6` <br /> sets the `aria-level` attribute to the corresponding heading level.
| `disabled` |`disabled` |
| `expandIconPosition: 'start'` &#124; `'end'` | `expandIconPosition: 'start'` &#124; `'end'` |
| `expandIcon` <br /> prop that is passed a ternary to render the appropriate icon | slots: `collapsed-icon` + `expanded-icon` <br /> named slots to supply the appropriate icons.
| `icon` <br /> property set on the `AccordionHeader` through which an icon is passed | slots: `start` + `end` <br /> named slots through which to supply a presentation icon.
