# The `TextInput` Custom Element

A partial implementation of an [`<input>`](https://w3c.github.io/html-reference/input.text.html) as a form-associated custom element.

The `<fluent-text-input>` is intended to match feature parity with the Fluent UI React 9 `<Input />` component. However, due to the nature of web components there will not be 100% parity between the two.

[View the Text Input Design Spec in Figma](https://www.figma.com/file/TvHmWjZYxwtI9Tz6v5BT7E/Input?node-id=2366-657&t=UNSOfCD3St9ffppx-0)

## API

### Class: `TextInput`

#### Definition

| Detail     | Description           |
| ---------- | --------------------- |
| Tag Name   | `<fluent-text-input>` |
| Superclass | `FASTElement`         |

#### Static Fields

| Name             | Privacy | Type      | Default | Description               | Inherited From |
| ---------------- | ------- | --------- | ------- | ------------------------- | -------------- |
| `formAssociated` | public  | `boolean` | `true`  | The form-associated flag. |                |

#### Fields

| Name                | Privacy | Type                                | Default     | Description                                                                                                                          |
| ------------------- | ------- | ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `appearance`        | public  | `TextInputAppearance`               | `'outline'` | Indicates the styled appearance of the element.                                                                                      |
| `autocomplete`      | public  | `string \| undefined`               |             | Indicates the element's autocomplete state.                                                                                          |
| `autofocus`         | public  | `boolean`                           |             | Indicates that the element should get focus after the page finishes loading.                                                         |
| `controlSize`       | public  | `TextInputControlSize \| undefined` | `'medium'`  | Sets the size of the control.                                                                                                        |
| `dirname`           | public  | `string \| undefined`               |             | Sets the directionality of the element to be submitted with form data.                                                               |
| `disabled`          | public  | `boolean \| undefined`              |             | Sets the element's disabled state.                                                                                                   |
| `formAttribute`     | public  | `string \| undefined`               |             | The id of a form to associate the element to.                                                                                        |
| `initialValue`      | public  | `string`                            |             | The initial value of the input.                                                                                                      |
| `list`              | public  | `string`                            |             | Allows associating a `REPLACELTdatalistREPLACEGT` to the element by ID.                                                              |
| `maxlength`         | public  | `number`                            |             | The maximum number of characters a user can enter.                                                                                   |
| `minlength`         | public  | `number`                            |             | The minimum number of characters a user can enter.                                                                                   |
| `multiple`          | public  | `boolean`                           |             | Indicates that a comma-separated list of email addresses can be entered. This attribute is only valid when `type="email"`.           |
| `name`              | public  | `string`                            |             | The name of the element. This element's value will be surfaced during form submission under the provided name.                       |
| `pattern`           | public  | `string`                            |             | A regular expression that the value must match to pass validation.                                                                   |
| `placeholder`       | public  | `string`                            |             | Sets the placeholder value of the element, generally used to provide a hint to the user.                                             |
| `readonly`          | public  | `boolean \| undefined`              |             | When true, the control will be immutable by user interaction.                                                                        |
| `required`          | public  | `boolean`                           |             | The element's required attribute.                                                                                                    |
| `size`              | public  | `number`                            |             | Sets the width of the element to a specified number of characters.                                                                   |
| `spellcheck`        | public  | `boolean`                           |             | Controls whether or not to enable spell checking for the input field, or if the default spell checking configuration should be used. |
| `type`              | public  | `TextInputType`                     |             | Allows setting a type or mode of text.                                                                                               |
| `validity`          | public  | `ValidityState`                     |             | The element's validity state.                                                                                                        |
| `validationMessage` | public  | `string`                            |             | The validation message.                                                                                                              |
| `value`             | public  | `string`                            |             | The current value of the input.                                                                                                      |
| `willValidate`      | public  | `boolean`                           |             | Determines if the control can be submitted for constraint validation.                                                                |
| `form`              | public  | `HTMLFormElement \| null`           |             | The associated form element.                                                                                                         |
| `role`              |         | `string`                            | `'textbox'` |                                                                                                                                      |

#### Methods

| Name          | Privacy | Description                             | Parameters                                                                                            | Return |
| ------------- | ------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------ |
| `select`      | public  | Selects all the text in the text field. |                                                                                                       | `void` |
| `setValidity` | public  | Sets the validity of the control.       | <ul><li>`flags: ValidityStateFlags`</li><li>`message: string`</li><li>`anchor: HTMLElement`</li></ul> | `void` |

#### Attributes

| Name           | Field         |
| -------------- | ------------- |
| `appearance`   | appearance    |
| `autocomplete` | autocomplete  |
| `autofocus`    | autofocus     |
| `control-size` | controlSize   |
| `dirname`      | dirname       |
| `disabled`     | disabled      |
| `form`         | formAttribute |
| `value`        | initialValue  |
| `list`         | list          |
| `maxlength`    | maxlength     |
| `minlength`    | minlength     |
| `multiple`     | multiple      |
| `name`         | name          |
| `pattern`      | pattern       |
| `placeholder`  | placeholder   |
| `readonly`     | readonly      |
| `required`     | required      |
| `size`         | size          |
| `spellcheck`   | spellcheck    |
| `type`         | type          |

#### CSS Parts

| Name      | Description                                 |
| --------- | ------------------------------------------- |
| `label`   | The internal `<label>` element              |
| `root`    | the root container for the internal control |
| `control` | The internal `<input>` control              |

#### Slots

| Name    | Description                                    |
| ------- | ---------------------------------------------- |
| `start` | Content which can be provided before the input |
| `end`   | Content which can be provided after the input  |
|         | The default slot for button content            |

<hr/>

### Exported Variables

| Name                              | Description                                                    | Type                                                              |
| --------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------- |
| `TextInputControlSize`            | Values for the `control-size` attribute on TextInput elements. | `"small" \| "medium" \| "large"`                                  |
| `TextInputAppearance`             | Values for the `appearance` attribute on TextInput elements.   | `"outline" \| "underline" \| "filled-lighter" \| "filled-darker"` |
| `TextInputType`                   | Values for the `type` attribute on TextInput elements.         | `"email" \| "password" \| "tel" \| "text" \| "url"`               |
| `ImplicitSubmissionBlockingTypes` | Input types that block implicit form submission.               | `array`                                                           |

<hr/>

## Accessibility

- [W3C Text Input Spec](https://w3c.github.io/html-reference/input.text.html)
- [W3C ARIA Textbox Role](https://w3c.github.io/aria/#textbox)
- [ElementInternals](https://developer.mozilla.org/docs/Web/API/ElementInternals)

### WAI-ARIA Roles, States, and Properties

This component supports ARIA attributes that inherit from the [ARIA Global States and Properties](https://www.w3.org/TR/wai-aria-1.2/#global_states).

<hr />

## Fluent Web Component v3 v.s Fluent React 9

### Component and Slot Mapping

| Fluent UI React 9 | Fluent Web Components 3 |
| ----------------- | ----------------------- |
| `<Input>`         | `<fluent-text-input>`   |
| `contentBefore`   | `start`                 |
| `contentAfter`    | `end`                   |

### Block and Inline Display

The Fluent UI `<Input />` component design spec offers two appearance variations for the display property - `block` (default) and `inline`. To achieve the inline variation, users should apply their own custom CSS.

```css
fluent-text-input {
  display: inline-flex;
  align-items: center;
}
```
