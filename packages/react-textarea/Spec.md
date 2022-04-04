# @fluentui/react-textarea Spec

## Background

`TextArea` is a multi-line text input field that uses the `<textarea>` element.

It is usually used when the user will use more than one line of text, such as a review in a website.

In some libraries, `TextArea` is a variant of `TextField` or `Input`.

## Prior Art

| Component Library                                                                | Name                            |
| -------------------------------------------------------------------------------- | ------------------------------- |
| v8                                                                               | `TextField` variant `Multiline` |
| v0                                                                               | `TextArea`                      |
| [Ant Design](https://ant.design/components/input/)                               | `Input.TextArea`                |
| [Material UI](https://v4.mui.com/components/text-fields/)                        | `TextField` variant `Multiline` |
| [React Spectrum](https://react-spectrum.adobe.com/react-spectrum/TextArea.html)  | `TextArea`                      |
| [React Bootstrap](https://react-bootstrap.github.io/forms/input-group/)          | `FormControl` as `textarea`     |
| [Blueprint](https://blueprintjs.com/docs/#core/components/text-inputs.text-area) | `TextArea`                      |
| [Grommet](https://v2.grommet.io/textarea)                                        | `TextArea`                      |

- Most libraries have their own `TextArea` component while others make it a variant of another component.
  - `React Bootstrap` uses as with `FormControl` as follows: `<FormControl as="textarea" />`
  - `Material UI` and `v8` use the `TextField` control and added a variant `multiline` as follows: `<TextField multiline defaultValue="Default Value" />`
  - `Ant Design` uses the `TextArea` subcomponent as follows: `<Input.TextArea placeholder="Text Area" />`

#### TextArea in v8

- `Textfield` component with `multiline` property. When the `multiline` property is set to true, it is rendered as a `textarea`.
- Has descriptions, label, error message, and handles maximum character count.

#### TextArea in v0

- Doesn't have `label` prop.
- Handles maximum character count.

## Sample Code

```tsx
<TextArea
  className="textAreaClassName"
  id="textarea-1"
  defaultValue="This is a TextArea"
  onChange={(ev, data) => console.log(data.value)}
/>
```

## Variants

- Visual variants
  - `Filled Darker`: TextArea has a gray background and no outline.
  - `Filled Lighter`: TextArea has a white background and no outline.
  - `Outline`: TextArea has a white background, outline, and a line on the bottom.
- Behavior variants
  - `Disabled`: TextArea has a gray background, gray text, outline, and interaction is disabled.
  - `Read Only`: TextArea has a gray background, gray outline, and typing is disabled.

Note: These colors are based on the design spec, therefore they come from the default theme.

## API

### Component props:

```ts
type TextAreaProps = {
  /**
   * Which direction the TextArea is allowed to be resized.
   *
   * @defaultvalue none
   */
  resize?: 'none' | 'horizontal' | 'vertical' | 'both';

  /**
   * Size of the TextArea.
   *
   * @defaultvalue medium
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Styling the TextArea should use.
   *
   * @defaultvalue outline
   */
  appearance?: 'outline' | 'filledDarker' | 'filledLighter';

  /**
   * The value of the TextArea. Used when the component is controlled.
   */
  value?: string;

  /**
   * The default value of the TextArea. Used when the component is uncontrolled.
   */
  defaultValue?: string;

  /**
   * Callback for when the user changes the value.
   */
  onChange?: (ev: React.ChangeEvent<HTMLTextAreaElement>, data: TextAreaOnChangeData) => void;
};

/**
 * Data passed to the `onChange` callback when the textarea's value changes.
 */
type TextAreaOnChangeData = {
  value: string;
};
```

The auto-resize feature is known to be unstable from v8 and tricky to implement. [As mentioned by ecraig12345](https://github.com/microsoft/fluentui/pull/21898#discussion_r816418917), we've been trying to prioritize getting the components ready for production and may have to leave out some features for the initial version.

`TextArea` has two slots:

- `textarea` the primary slot that handles all `TextArea` behavior, except the focus indicator.
- `root` acts as a wrapper to allow a pseudo-element for the focus indicator. This wrapper is needed since textarea cannot have children, therefore `::after` cannot be used.

The design spec mentions a character count, error message, and label which will be left out until further discussion.

## Structure

**Public**

```tsx
<TextArea id="textarea-1" onChange={(ev, data) => console.log(data.value)}>
  This is a TextArea
</TextArea>
```

**Internal**

```tsx
<slots.root {...slotProps.root}></slots.root>
```

**DOM** - how the component will be rendered as HTML elements

```html
<div className="fui-TextArea">
  <textarea id="textarea-1" className="fui-TextArea__textarea">This is a TextArea</textarea>
</div>
```

## Migration

See [MIGRATION.md](MIGRATION.md).

## Behaviors

TODO: Until the upcoming design review, behavior hasn't been set and will be updated when approved.

- Component States
  - Rest
  - Hover
  - Pressed: Apply focus border animation.
  - Focussed: Apply thick blue line on the bottom border.

Interaction will be handled by native element.

## Accessibility

- User should provide a label since there is no built-in label for TextArea.
- If no label is used, `aria-label` or `aria-labelledby` should be provided by the user.
- Screen reader behavior will be handled by using the native `<textarea>` element.
