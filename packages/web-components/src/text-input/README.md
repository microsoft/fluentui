# TextInput

> An implementation of a [text input](https://w3c.github.io/html-reference/input.text.html) as a form-connected web-component.
> <br />

## **Design Spec**

[Link to Text Input Design Spec in Figma](https://www.figma.com/file/TvHmWjZYxwtI9Tz6v5BT7E/Input?node-id=2366-657&t=UNSOfCD3St9ffppx-0)

<br />

## **Engineering Spec**

Fluent WC3 Text Input extends from the [FAST Text Field](https://explore.fast.design/components/fast-text-field) and is intended to be as close to the Fluent UI React 9 Input implementation as possible. However, due to the nature of web components there will not be 100% parity between the two.

<br />

## Class: `TextInput`

<br />

### **Component Name**

`<fluent-text-input>`

<br />

### **Variables**

| Name                  | Description                          | Type                                                                                                             |
| --------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `TextInputSize`       | Size variations for text input       | `{ small: "small", medium: "medium", large: "large" }`                                                           |
| `TextInputAppearance` | Appearance variations for text input | `{ outline: "outline", underline: "underline", filledLighter: "filled-lighter", filledDarker: "filled-darker" }` |
| `TextInputType`       | Text input types                     | `{ email: "email", password: "password", tel: "tel", text: "text", url: "url" }`                                 |

<br />

### **Fields**

| Name          | Privacy | Type                  | Default              | Description                                                                                                                        |
| ------------- | ------- | --------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `appearance`  | public  | `TextInputAppearance` | `outline`            | Sets appearance of text input.                                                                                                     |
| `autofocus`   | public  | `boolean`             | `false`              | Indicates element should get focus after the page finishes loading..                                                               |
| `disabled`    | public  | `boolean`             | `false`              | Disables text input                                                                                                                |
| `list`        | public  | `string`              |                      | Allows associating a `datalist` to an element by `id`                                                                              |
| `maxlength`   | public  | `number`              |                      | The maximum number of characters a user can enter                                                                                  |
| `minlength`   | public  | `number`              |                      | The minimum number of characters a user can enter                                                                                  |
| `name`        | public  | `number`              |                      | The name of the control                                                                                                            |
| `pattern`     | public  | `string`              |                      | A regular expression the text input's contents must match in order to be valid                                                     |
| `placeholder` | public  | `string`              |                      | An exemplar value to display in the text input field whenever it is empty                                                          |
| `readonly`    | public  | `boolean`             | `false`              | The text input should be submitted with the form but should not be editable                                                        |
| `required`    | public  | `boolean`             | `false`              | Sets the text input as required                                                                                                    |
| `size`        | public  | `InputSize`           | `medium`             | Sets the size of the text input                                                                                                    |
| `spellcheck`  | public  | `boolean`             | `false`              | Controls whether or not to enable spell checking for the text input, or if the default spell checking configuration should be used |
| `type`        | public  | `TextInputType`       | `TextInputType.text` | Sets the size of the text input                                                                                                    |

<br />

### **Methods**

| Name       | Privacy | Description                                       |
| ---------- | ------- | ------------------------------------------------- |
| `select`   | public  | Selects all the text in the text field            |
| `validate` | public  | {@inheritDoc (FormAssociated:interface).validate} |

### **Events**

| Name     | Type | Description                 | Inherited From |
| -------- | ---- | --------------------------- | -------------- |
| `change` |      | Fires a custom change event |                |

<br />

### **Attributes**

| Name          | Field       |
| ------------- | ----------- |
| `appearance`  | appearance  |
| `autofocus`   | autofocus   |
| `list`        | list        |
| `maxlength`   | maxlength   |
| `minlength`   | minlength   |
| `pattern`     | pattern     |
| `placeholder` | placeholder |
| `readonly `   | readonly    |
| `size`        | size        |
| `spellcheck`  | spellcheck  |
| `type`        | type        |

<br />

### **Slots**

| Name    | Description                                                                  |
| ------- | ---------------------------------------------------------------------------- |
| `start` | used to place content at the start of the text input within the input border |
| `end`   | used to place content at the end of the text input within the input border   |
|         | The default slot for text input content                                      |

<br />

### **Additional Styling Variations**

For performance considerations, we have avoided the addition of explicit attributes for appearance variations that modify only one CSS property. Instead, opting to provide guidance for users to apply their own CSS to achieve these appearance variations.

<br />

**Block v.s Inline**

The Fluent UI `TextInput` component offers two appearance variations for the display property - block (default) and inline. To achieve the inline variation, users should apply their own custom CSS.

```css
/* all instances */

fluent-text-input {
  display: inline-flex;
  align-items: center;
}

/* class instances */

fluent-text-input.inline {
  display: inline-flex;
  align-items: center;
}
```

<br />
<hr />
<br />

## **Accessibility**

[W3C Text Input Spec](https://w3c.github.io/html-reference/input.text.html)

<br />

### **WAI-ARIA Roles, States, and Properties**

This component supports ARIA attributes that inherit from the [ARIA Global States and Properties](https://www.w3.org/TR/wai-aria-1.2/#global_states).

<br />
<hr />
<br />

## **Preparation**

### **Fluent Web Component v3 v.s Fluent React 9**

<br />

**Component and Slot Mapping**

| Fluent UI React 9 | Fluent Web Components 3 |
| ----------------- | ----------------------- |
| `<Input>`         | `<fluent-text-input>`   |
| `contentBefore`   | `start`                 |
| `contentAfter`    | `end`                   |
