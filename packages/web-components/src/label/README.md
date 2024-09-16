# Label

> A label represents a caption for an item in a user interface.

<br />

## **Design Spec**

[Link to Label Design Spec in Figma](https://www.figma.com/file/jpWO2FMBefirTyThf5Rg2P/Label?node-id=2%3A476&t=QCdofuTbXkUjMS4d-0)

<br />

## **Engineering Spec**

<br />

The fluent-label has several visual font size (small, medium, large) and font weight(regular, semibold) options. The fluent-label also provides appearances for required and disabled states.

<br />

_Note about form association_

In web components, when using the shadow DOM, it's not feasible to associate elements across the shadow DOM boundary using the traditional `for` attribute, since the shadow DOM creates a boundary that prevents the label element from accessing the input element's id attribute. Instead, the WC3 Label component uses the `aria-labelledby` attribute to associate the label element with the input element. This attribute has a value that matches the id of another element on the page, which serves as a label for the input element.

<br />

### Use Case

Creating a simple label element with an optional info icon and optional required state

<br />

## Class: `Label`

<br />

### **Variables**

<br />

### **Fields**

| Name       | Privacy | Type                           | Default     | Description                          |
| ---------- | ------- | ------------------------------ | ----------- | ------------------------------------ |
| `required` | public  | `boolean`                      | `false`     | Specifies required styling for label |
| `disabled` | public  | `boolean`                      | `false`     | Sets disabled state for label        |
| `size`     | public  | `"small"` `"medium"` `"large"` | `"medium"`  | Specifies font size for label        |
| `weight`   | public  | `"regular"` `"semibold"`       | `"regular"` | Specifies font weight for label      |

<br />

### **Methods**

<br />

### **Events**

<br />

### **Attributes**

| Name       | Field    |
| ---------- | -------- |
| `required` | required |
| `disabled` | disabled |
| `size`     | size     |
| `weight`   | weight   |

<br />

### **Slots**

| Name | Description                            |
| ---- | -------------------------------------- |
|      | Default slotted content for label text |

<br />

### **Template**

```html
<slot></slot> <span part="asterisk" class="asterisk" ?hidden="${x => !x.required}">*</span>
```

## **Accessibility**

[W3 Label Spec](https://www.w3.org/WAI/tutorials/forms/labels/)

<br />

### **WAI-ARIA Roles, States, and Properties**

<br />

- [`aria-labelledby`](https://www.w3.org/TR/wai-aria-1.2/#aria-labelledby)

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

**Additional Deltas**
| | Fluent UI React 9 | Fluent Web Components 3 |
|---------------------| --------------------------------------------------------------------------------------- |---------------------------------------------------------------------------------------- |
| Renders | `HTMLLabelElement` | `HTMLElement` |
| API | [`HTMLLabelElement` Spec](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement) | [`HTMLElement` Spec](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) |
| Shadow DOM | n/a | uses Shadow DOM |
| Accessibility | Uses `for` attribute to associate with form elements | Uses `aria-labelledby` to associate with form elements, does not have a `for` attribute |
