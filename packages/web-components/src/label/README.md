# Label

> A label represents a caption for an item in a user interface.
> <br />

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

| Name       | Privacy | Type                           | Default     | Description                                                       |
| ---------- | ------- | ------------------------------ | ----------- | ----------------------------------------------------------------- |
| `for`      | public  | `string`                       |             | Specifies the id of the form element the label should be bound to |
| `form`     | public  | `string`                       |             | Specifies which form the label belongs to                         |
| `required` | public  | `boolean`                      | `false`     | Specifies required styling for label                              |
| `disabled` | public  | `boolean`                      | `false`     | Sets disabled state for label                                     |
| `size`     | public  | `"small"` `"medium"` `"large"` | `"medium"`  | Specifies font size for label                                     |
| `weight`   | public  | `"regular"` `"semibold"`       | `"regular"` | Specifies font weight for label                                   |

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
| `disabled` | disabled |
| `size`     | size     |
| `weight `  | weight   |

<br />

### **Slots**

| Name   | Description                            |
| ------ | -------------------------------------- |
|        | Default slotted content for label text |
| `icon` | The slot used for a info icon          |

<br />
<hr />
<br />

### **Suggested Template**

```ts
`<template required="${(attr: Label) => attr.required}">
  <label class="label" part="label" for="${(attr: Label) => attr.for}" form="${(attr: Label) => attr.form}">
    <slot></slot>
    ${(attr: Label) =>
      attr.required ? html`<span aria-hidden="true" part="asterisk" class="asterisk">*</span>` : null}
  </label>
</template>`;
```

## **Accessibility**

[W3 Label Spec](https://www.w3.org/WAI/tutorials/forms/labels/)

<br />

### **WAI-ARIA Roles, States, and Properties**

- No corresponding roles

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
| `<Label>`         | `<fluent-label>`        |

<br />

**Property Mapping**
| Fluent UI React 9 | Fluent Web Components 3 | Description of difference |
|-------------------|------------------------ |---------------------------|
