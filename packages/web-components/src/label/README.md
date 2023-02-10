# Label

> A label represents a caption for an item in a user interface.

<br />

## **Design Spec**

[Link to Label Design Spec in Figma](https://www.figma.com/file/aFHbqxQlX8fetFhyYl6STb/TF---Trident-control-specs?node-id=339%3A52012)

<br />

## **Engineering Spec**

### Use Case

Creating a simple label element with an optional info icon and optional required state

<br />

## Class: `Label`

<br />

### **Variables**

<br />

### **Fields**

| Name       | Privacy | Type      | Default | Description                                                       |
| ---------- | ------- | --------- | ------- | ----------------------------------------------------------------- |
| `for`      | public  | `string`  |         | Specifies the id of the form element the label should be bound to |
| `form`     | public  | `string`  |         | Specifies which form the label belongs to                         |
| `required` | public  | `boolean` | `false` | Specifies required styling for label                              |

<br />

### **Methods**

<br />

### **Events**

<br />

### **Attributes**

| Name       | Field    |
| ---------- | -------- |
| `for`      | for      |
| `from`     | from     |
| `required` | required |

<br />

### **Slots**

| Name   | Description                            |
| ------ | -------------------------------------- |
|        | Default slotted content for label text |
| `icon` | The slot used for a info icon          |

<br />
<hr />
<br />

## **Accessibility**

[W3 Accordion Spec](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)

<br />

### **WAI-ARIA Roles, States, and Properties**

- `role = "button"`
  - The title of each accordion header is contained in an element with role button.
- `role = "heading"`
  - Each accordion header button is wrapped in an element with role heading that has a value set for aria-level that is appropriate for the information architecture of the page.
- `aria-expanded`
  - If the accordion panel associated with an accordion header is visible, the header button element has aria-expanded set to true. If the panel is not visible, aria-expanded is set to false.
- `aria-controls`
  - The accordion header button element has aria-controls set to the ID of the element containing the accordion panel content.
- `aria-disabled`
  - If the accordion panel associated with an accordion header is visible, and if the accordion does not permit the panel to be collapsed, the header button element has aria-disabled set to true.

<br />
<hr />
<br />

## **Preparation**

<br />

### **Fluent Web Component v3 v.s Fluent React 9**

<br />

**Component and Slot Mapping**

| Fluent UI React 9   | Fluent Web Components 3   |
| ------------------- | ------------------------- |
| `<Accordion>`       | `<fluent-accordion>`      |
| `<AccordionItem>`   | `<fluent-accordion-item>` |
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
