# @fluentui/react-input Spec

**Epic issue** - [Input Convergence](https://github.com/microsoft/fluentui/issues/18131)

## Background

`Input` in its most basic form is a text input field abstracting `<input type="text" />`.

In some libraries it also abstracts a `textarea` (multi-line text input). It may also have features such as a label and start/end slots built in.

## Prior Art

### In other frameworks

| Framework                        | `<input type="text">`                                                                     | `<textarea>`                                                                                     | Notes                                                                                           |
| -------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| Ant Design                       | [`Input`](https://ant.design/components/input/)                                           | `Input.TextArea`                                                                                 | No label. Has both inner and outer prefix/suffix.                                               |
| AtlasKit                         | [`Textfield`](https://atlassian.design/components/textfield)                              | [`Textarea`](https://atlassian.design/components/textarea)                                       | No label                                                                                        |
| Carbon                           | [`TextInput`](https://www.carbondesignsystem.com/components/text-input/usage/)            | `TextArea`                                                                                       | Has label prop                                                                                  |
| Evergreen                        | [`TextInput`](https://evergreen.segment.com/components/text-input)                        | [`Textarea`](https://evergreen.segment.com/components/textarea)                                  | `TextInputField` and `TextareaField` wrappers provide label etc                                 |
| Lightning                        | [`input`](https://www.lightningdesignsystem.com/components/input/)                        | [`textarea`](https://www.lightningdesignsystem.com/components/textarea/)                         | Not a React library                                                                             |
| Material UI React                | [`Input`](https://material-ui.com/components/text-fields/)                                | built in to `TextField`                                                                          | `TextField` is a rollup of functionality: label, appearances, start/end slots, lots of variants |
| `@fluentui/react` (v8)           | [`TextField`](https://developer.microsoft.com/en-us/fluentui#/controls/web/textfield)     | built in to `TextField`                                                                          | Has label prop                                                                                  |
| `@fluentui/react-northstar` (v0) | [`Input`](https://fluentsite.z22.web.core.windows.net/0.57.0/components/input/definition) | [`TextArea`](https://fluentsite.z22.web.core.windows.net/0.57.0/components/text-area/definition) | Has label prop                                                                                  |

### Comparison of v8 and v0

Please see the [migration guide](#migration-guide) section.

## Sample Code

See [Structure section](#structure) for the output HTML.

```tsx
<Label htmlFor="input1">Label</Label> // note that this is not built in
<Input
  className="rootClass"
  input={{ className: 'inputClass' }}
  id="input1"
  value="something"
  onChange={(ev, data) => console.log(data.value)}
  bookendBefore="bookendBefore"
  bookendAfter="bookendAfter"
  insideBefore={<SearchIcon />}
  insideAfter={<ClearIcon />}
/>
```

## Variants

### Visual variants

See the design spec for details on the appearance of each of these. Note that the actual colors used will follow the theme; white/gray/black are just examples from the default theme.

Visual variants for the main field are as follows:

- `outline` (default): the field has a full outline, with a slightly darker underline on the bottom
- `underline`: the field has an underline on the bottom only
- `filledDarker`: the field has a gray background and no underline/outline
- `filledLighter`: the field has a white background and no underline/outline (for use on top of gray/colored backgrounds)

Visual variants for the bookend are as follows:

- `filled` (default): bookends have a gray background, black text, and no border
- `brand`: bookends have a brand color (such as blue or purple) background, white text, and no border
- `transparent`: bookends have a transparent background, black text, and only a thin inside border to distinguish them from the field

### Behavior variants

In the future we may implement behavior variants, such as a password field with reveal button, but that will be spec'd if/when we need it. See [Spec-variants.md](./Spec-variants.md) for more details.

## API

In this component, `input` is the primary slot. See notes under [Structure](#structure).

```ts
export type InputProps = InputCommons & Omit<ComponentProps<InputSlots, 'input'>, 'children'>;
```

### Main props

All native HTML `<input>` props are supported. Since the `input` slot is primary (more on that later), top-level native props except `className` and `style` will go to the input.

The top-level `ref` prop also points to the `<input>`. This can be used for things like getting the current value or manipulating focus or selection (instead of explicitly exposing an imperative API).

Most custom props are defined in `InputCommons` since they're shared with `InputState`.

```ts
export type InputCommons = FieldSizeProps & {
  /**
   * If true, the field will have inline display, allowing it be used within text content.
   * If false (the default), the field will have block display.
   */
  inline?: boolean;

  /**
   * Controls the colors and borders of the field.
   * @default 'outline'
   */
  appearance?: 'outline' | 'underline' | 'filledDarker' | 'filledLighter';

  /**
   * Controls the colors and borders of the bookends.
   * @default 'filled'
   */
  bookendAppearance?: 'filled' | 'brand' | 'transparent';
};
```

### Field sizing

This should be common between most types of fields.

```ts
export type FieldSize = 'small' | 'medium' | 'large';

export type FieldSizeProps = {
  /**
   * Size of the input (changes the font size and spacing).
   * NOTE: can't use `size` as the name due to overlap with a native input prop :(
   * @default 'medium'
   */
  fieldSize?: FieldSize;
};
```

```ts
export const fieldHeights = {
  small: '24px',
  medium: '32px',
  large: '40px',
};

export const useFieldSizeStyles = makeStyles({
  small: theme => ({
    // font sizes, height
  }),
  medium: theme => ({}),
  large: theme => ({}),
});
```

### Slots

Note that the field **does not** include a label, required indicator, description, or error message.

```ts
export type InputSlots = {
  /** Wrapper element for all parts of the component. */
  root: IntrinsicShorthandProps<'span'>;

  /**
   * The actual `<input>` element. `type="text"` will be automatically applied unless overridden.
   * This is the "primary" slot, so top-level native props (except `className` and `style`) and the
   * top-level `ref` will go here.
   */
  input: IntrinsicShorthandProps<'input'>;

  /**
   * Wrapper element containing `insideBefore`, `input`, and `insideAfter`. This is the element that
   * visually appears to be the input and is used for borders, focus styling, etc.
   */
  inputWrapper: IntrinsicShorthandProps<'span'>;

  /** Element before the input field, visually separated from it */
  bookendBefore?: IntrinsicShorthandProps<'span'>;

  /** Element after the input field, visually separated from it */
  bookendAfter?: IntrinsicShorthandProps<'span'>;

  /** Element at the start of the input field, visually appearing to be inside of it */
  insideBefore?: IntrinsicShorthandProps<'span'>;

  /** Element at the end of the input field, visually appearing to be inside of it */
  insideAfter?: IntrinsicShorthandProps<'span'>;
};
```

## Structure

In this component, `input` is the primary slot. Per the [native element props/primary slot RFC](https://github.com/microsoft/fluentui/blob/master/rfcs/convergence/native-element-props.md), this means that most top-level props will go to `input`, but the top-level `className` and `style` will go to the actual root element.

```tsx
{
  /* Out of top-level native props, only `className` and `style` go here */
}
<slots.root {...slotProps.root}>
  <slots.bookendBefore {...slotProps.bookendBefore} />
  {/* This is visually styled to look like the input */}
  <slots.inputWrapper {...slotProps.inputWrapper}>
    <slots.insideBefore {...slotProps.insideBefore} />
    {/* Primary slot. Top-level native props except `className` and `style` go here. */}
    <slots.input {...slotProps.input} />
    <slots.insideAfter {...slotProps.insideAfter} />
  </slots.inputWrapper>
  <slots.bookendAfter {...slotProps.bookendAfter} />
</slots.root>;
```

Notes on the HTML rendering:

- Using `span` rather than `div` prevents nesting errors if the Input is rendered inline within a `<p>`.
- There's an extra `inputWrapper` span which is visually styled as the input (with borders etc) so that the `insideBefore`, `insideAfter`, and actual `input` elements can easily be properly positioned inside it.

This example usage:

```tsx
<Input
  className="rootClass"
  style={{ background: 'red' }}
  input={{ className: 'inputClass', style: { background: 'blue' } }}
  id="input1"
  value="something"
  onChange={(ev, data) => console.log(data.value)}
  bookendBefore="bookendBefore"
  bookendAfter="bookendAfter"
  insideBefore={<SearchIcon />}
  insideAfter={<ClearIcon />}
/>
```

Gives this HTML:

```html
<span className="rootClass" style="background: red">
  <span>bookendBefore</span>
  <!-- inputWrapper -->
  <span>
    <span><!-- insideBefore content here --></span>
    <!-- input: type="text" is applied automatically -->
    <input
      type="text"
      className="inputClass"
      style="background: blue"
      id="input1"
      value="something"
      onChange="(function)"
    />
    <span><!-- insert insideAfter content here --></span>
  </span>
  <span>bookendAfter</span>
</span>
```

## Behaviors

Most of the behavior is inherited from the native `<input>` element, and all we add is styling.

The component has the following interactive states:

- Rest
- Hover: change stroke color
- Pressed: apply focus border style as animation
- Focused: currently indicated by a thick brand color stroke on the bottom border only (regardless of whether focus was by keyboard or mouse)

Keyboard, cursor, touch, and screen reader interaction will be handled automatically by the internal `<input>`.

## Accessibility

- Most interaction and screen reader behavior will be handled automatically by the internal `<input type="text">`.
- The `<input>` is visible and shows the placeholder or value text.
- The component doesn't provide a built-in label, so it's important for the user to pass in appropriate attributes such as `id` (associated with a label using `htmlFor`), `aria-label`, or `aria-labelledby`.
- No features in the initial implementation require manipulation of focus, tab order, or key handling.
- Visual states for focus and hover will be applied to `inputWrapper` rather than the `<input>` itself (which is rendered without a border and only used to show the text), because the `insideBefore` and `insideAfter` slots need to visually appear to be within the input.

## Migration

> **NOTE**: Props related to multiline, reveal password, validation, and masking are not yet supported and likely to be handled in separate components. See [Spec-variants.md](./Spec-variants.md) for more details.

### Props

| Prop/concept                 | v8                                                    | v0                                                          | Proposal                                |
| ---------------------------- | ----------------------------------------------------- | ----------------------------------------------------------- | --------------------------------------- |
| imperative API               | `componentRef`                                        | n/a                                                         | n/a                                     |
| supported native props       | `React.AllHTMLAttributes` (input or textarea)         | `SupportedIntrinsicInputProps` (see below)                  | `React.InputHTMLAttributes`             |
| setting native props on root |                                                       | ?                                                           | `root` slot (mostly, see below)         |
| root element access          | `elementRef`                                          | ?                                                           | `ref` on `root` slot                    |
| primary element access       | not possible                                          | `ref`                                                       | top-level `ref`                         |
| multiline mode               | `multiline?: boolean`                                 | separate component (`TextArea`)                             | separate component                      |
| underlined                   | `underlined?: boolean`                                |                                                             | `appearance`                            |
| borderless                   | `borderless?: boolean`                                |                                                             | not supported?                          |
| fluid (full width)           | default behavior                                      | `fluid?: boolean`                                           | default behavior                        |
| inline                       | n/a (use styling)                                     | `inline?: boolean`                                          | `inline?: boolean`                      |
| label                        | `label?: string`, `onRenderLabel`                     | `label?: ShorthandValue<InputLabelProps>`,                  | handled by Field                        |
| label position               | n/a (use styling)                                     | `labelPosition?: 'above' \| 'inline' \| 'inside'`           | handled by Field                        |
| description                  | `description?: string`, `onRenderDescription`         | use FormField                                               | handled by Field                        |
| error message                | see [Spec-variants.md](./Spec-variants.md#validation) | use FormField                                               | handled by Field                        |
| content outside before field | `prefix?: string`, `onRenderPrefix`                   |                                                             | `bookendBefore` slot                    |
| content outside after field  | `suffix?: string`, `onRenderSuffix`                   |                                                             | `bookendAfter` slot                     |
| icon at start of field       | n/a                                                   | `icon?: ShorthandValue<BoxProps>` + `iconPosition: 'start'` | `insideBefore` slot                     |
| icon at end of field         | `iconProps?: IIconProps`                              | `icon?: ShorthandValue<BoxProps>` + `iconPosition: 'end'`   | `insideAfter` slot                      |
| value                        | `value?: string`                                      | `value?: string \| number`                                  | `value?: string`                        |
| defaultValue                 | `defaultValue?: string`                               | `defaultValue?: string \| string[]`                         | `defaultValue?: string`                 |
| onChange                     | `(ev, value) => void`                                 | `(ev, data: { ...props, value }) => void`                   | `(ev, data: { value: string }) => void` |
| container className          | `className?: string`                                  |                                                             | top-level `className`                   |
| input className              | `inputClassName?: string`                             | `input.className?: `                                        |                                         |
| aria label                   | `ariaLabel?: string`                                  | `'aria-label'?: string`                                     | `'aria-label'?: string`                 |
| clearable                    | n/a                                                   | `clearable?: boolean`                                       | TBD (deferred)                          |
| theme                        | `theme?: ITheme`                                      |                                                             | handled by context                      |
| style overrides              | `styles?: IStyleFunctionOrObject<...>`                | `styles?: ComponentSlotStyles<...>`                         | className, slot classNames              |
| accessibility                | individual props                                      | `Accessibility<InputBehaviorProps>` (see below)             | individual props?                       |

```ts
// packages/fluentui/react-northstar/src/utils/htmlPropsUtils.tsx
type SupportedIntrinsicInputProps = {
  [K in HtmlInputProps]?: K extends keyof JSX.IntrinsicElements['input'] ? JSX.IntrinsicElements['input'][K] : any;
};
// HtmlInputProps: a subset of React and HTML native props

// packages/fluentui/react-northstar/src/components/Box/Box.tsx
interface BoxProps extends UIComponentProps<BoxProps>, ContentComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<never>;
}

// packages/fluentui/accessibility/src/behaviors/Input/inputBehavior.ts
type InputBehaviorProps = { disabled?: boolean; required?: boolean; error?: boolean };
```

Native props following standard behavior in both libraries + converged:

- `disabled?: boolean`
- `readOnly?: boolean`
- `autoComplete?: string`
- and most other native props not specified

### Imperative API

In v8 there's an explicit imperative API, which is accessed via `componentRef` following the [`ITextField` interface](https://github.com/microsoft/fluentui/blob/master/packages/react/src/components/TextField/TextField.types.ts#L9). The methods are used for getting the value and manipulating focus and selection.

In v0 (and in converged), all these things can be done by calling methods on the `<input>` element itself, exposed via the top-level `ref`.
