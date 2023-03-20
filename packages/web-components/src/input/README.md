# Input

> An implementation of an [input](https://w3c.github.io/html-reference/input.text.html) as a form-connected web-component.

<br />

## **Design Spec**

[Link to Input Design Spec in Figma](https://www.figma.com/file/TvHmWjZYxwtI9Tz6v5BT7E/Input?node-id=2366-657&t=UNSOfCD3St9ffppx-0)

<br />

## **Engineering Spec**

Fluent WC3 Input extends from the [FAST Text Field](https://explore.fast.design/components/fast-text-field) and is intended to be as close to the Fluent UI React 9 Input implementation as possible. However, due to the nature of web components there will not be 100% parity between the two.

<br />

## Class: `Input`

<br />

### **Component Name**

`<fluent-input>`

<br />

### **Variables**

| Name              | Description                     | Type                                                                                                             |
| ----------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `InputSize`       | Size variations for input       | `{ small: "small", medium: "medium", large: "large" }`                                                           |
| `InputAppearance` | Appearance variations for input | `{ outline: "outline", underline: "underline", filledLighter: "filled-lighter", filledDarker: "filled-darker" }` |
| `TextFieldType`   | Input types                     | `{ email: "email", password: "password", tel: "tel", text: "text", url: "url" }`                                 |
| `InputLayout`     | Layout variations for input     | `{ block: "block", inline: "inline"`                                                                             |

<br />

### **Fields**

| Name            | Privacy | Type              | Default              | Description                                                                                                                         |
| --------------- | ------- | ----------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `appearance`    | public  | `InputAppearance` | `outline`            | Sets appearance of input.                                                                                                           |
| `autofocus`     | public  | `boolean`         | `false`              | Indicates element should get focus after the page finishes loading..                                                                |
| `disabled`      | public  | `boolean`         | `false`              | Disables input                                                                                                                      |
| `labelPosition` | public  | `boolean`         | `false`              | Disables input                                                                                                                      |
| `layout`        | public  | `InputLayout`     | `InputLayout.block`  | Sets layout display property on input                                                                                               |
| `list`          | public  | `string`          |                      | Allows associating a `datalist` to an element by `id`                                                                               |
| `maxlength`     | public  | `number`          |                      | The maximum number of characters a user can enter                                                                                   |
| `minlength`     | public  | `number`          |                      | The minimum number of characters a user can enter                                                                                   |
| `name`          | public  | `number`          |                      | The name of the control                                                                                                             |
| `pattern`       | public  | `string`          |                      | A regular expression the input's contents must match in order to be valid                                                           |
| `placeholder`   | public  | `string`          |                      | An exemplar value to display in the input field whenever it is empty                                                                |
| `readonly`      | public  | `boolean`         | `false`              | The text field should be submitted with the form but should not be editable                                                         |
| `required`      | public  | `boolean`         | `false`              | Sets the field as required                                                                                                          |
| `size`          | public  | `InputSize`       | `medium`             | Sets the size of the text input                                                                                                     |
| `spellcheck`    | public  | `boolean`         | `false`              | Controls whether or not to enable spell checking for the input field, or if the default spell checking configuration should be used |
| `type`          | public  | `TextFieldType`   | `TextFieldType.text` | Sets the size of the text input                                                                                                     |

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

| Name             | Field          |
| ---------------- | -------------- |
| `appearance`     | appearance     |
| `autofocus`      | autofocus      |
| `label-position` | label-position |
| `list`           | list           |
| `maxlength`      | maxlength      |
| `minlength`      | minlength      |
| `pattern`        | pattern        |
| `placeholder`    | placeholder    |
| `readonly `      | readonly       |
| `size`           | size           |
| `spellcheck`     | spellcheck     |
| `type`           | type           |

<br />

### **Slots**

| Name    | Description                                                             |
| ------- | ----------------------------------------------------------------------- |
| `start` | used to place content at the start of the input within the input border |
| `end`   | used to place content at the end of the input within the input border   |
|         | The default slot for accordion item content                             |

<br />
<hr />
<br />

## **Accessibility**

[W3C Text Input Spec](https://w3c.github.io/html-reference/input.text.html)

<br />

### **WAI-ARIA Roles, States, and Properties**

- `aria-atomic`
  - In ARIA live regions, the global aria-atomic attribute indicates whether assistive technologies such as a screen reader will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute.
- `aria-busy`
  - Indicates an element is being modified and that assistive technologies may want to wait until the changes are complete before informing the user about the update.
- `aria-controls`
  - Identifies the element (or elements) whose contents or presence are controlled by the element on which this attribute is set.
- `aria-current`
  - A non-null `aria-current` state on an element indicates that this element represents the current item within a container or set of related elements.
- `aria-describedby`
  - Identifies the element (or elements) that describes the element on which the attribute is set.
- `aria-details`
  - The global `aria-details` attribute identifies the element (or elements) that provide additional information related to the object.
- `aria-disabled`
  - Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
- `aria-errormessage`
  - Identifies the element that provides an error message for that object.
- `aria-flowto`
  - Identifies the next element (or elements) in an alternate reading order of content. This allows assistive technology to override the general default of reading in document source order at the user's discretion.
- `aria-haspopup`
  - Indicates the availability and type of interactive popup element that can be triggered by the element on which the attribute is set.
- `aria-hidden`
  - Indicates whether the element is exposed to an accessibility API.
- `aria-invalid`
  - Indicates the entered value does not conform to the format expected by the application.
- `aria-keyshortcuts`
  - Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.
- `aria-label`
  - Defines a string value that labels an interactive element.
- `aria-labelledby`
  - Identifies the element (or elements) that labels the element it is applied to.
- `aria-live`
  - Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.
- `aria-owns`
  - Identifies an element (or elements) in order to define a visual, functional, or contextual relationship between a parent and its child elements when the DOM hierarchy cannot be used to represent the relationship.
- `aria-relevant`
  - Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
- `aria-roledescription`
  - Defines a human-readable, author-localized description for the role of an element.

<br />
<hr />
<br />

## **Preparation**

### **Fluent Web Component v3 v.s Fluent React 9**

<br />

**Component and Slot Mapping**

| Fluent UI React 9 | Fluent Web Components 3 |
| ----------------- | ----------------------- |
| `<Input>`         | `<fluent-input>`        |
| `contentBefore`   | `start`                 |
| `contentAfter`    | `end`                   |

<br />

**Property Mapping**
| Fluent UI React 9 | Fluent Web Components 3 | Description of difference |
| ----------------- | ----------------------- | ------------------------- |
