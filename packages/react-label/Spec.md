# @fluentui/react-label Spec

## Background

Labels provide a name or title to a component or group of components, e.g., text fields, checkboxes, radio buttons, and dropdown menus.

## Prior Art

- [open-ui PR](https://github.com/openui/open-ui/pull/348)
- [Label Convergence Epic issue](https://github.com/microsoft/fluentui/issues/18247)

### Label in Fabric/v8

```tsx
<Label required>I am a required label</Label>
```

Props used in v8 Label:
|Prop|Description|
|---|---|
|as|Element type to render Label as|
|componentRef|Optional callback to access the ILabel interface. Use this instead of ref for accessing the public methods and properties of the component|
|disabled|Renders label as disabled, changing the Label's foreground color|
|required|Renders an asterisk next to the given text|
|styles|Custom styles for the Label|
|theme|Theme provided by HOC|

### Label in Northstar/v0

```tsx
<Label content="You have 23 emails" />
```

Props used in v0 Label:
|Prop|Description|
|---|---|
|accessibility| Prop to override accessibility behavior|
|as|Element type to render Label as|
|circular|Renders Label with round corners|
|className|Additional CSS class name to apply|
|color|Color for the background of the label|
|content|Label content|
|fluid|Make it so Label takes the width of its container|
|icon|Adds an icon to the label|
|iconPosition|Choose where the icon is placed (Start or End)|
|image|Adds an image to the label|
|imagePosition|Choose where the image is placed (Start or End)|
|styles|Additional custom styles for the component|
|variables|Allows override of theme variables|

### Conclusion

Moving forward, Label will be a simple component. The converged Label will be based on v8's Label with some minor changes. Most props from v0 will be left out but because of the use of slots, it won't be too difficult to migrate to the converged Label.

## Sample Code

The Label component should be simple as shown below. It will just need the text to be rendered. For the required label, it has the option of being a shorthand slot that will allow to customize the label's required text.

```tsx
<Label>Label</Label>

<Label disabled>Label</Label>

<Label required>Label</Label>

<Label required="**">
  Label
</Label>
```

## Variants

- A Label can be rendered with an asterisk or custom text when is set as `required`.

## API

```ts
/**
 * Label Props
 * {@docCategory Label}
 */
export interface LabelProps extends ComponentProps, React.LabelHTMLAttributes<HTMLElement> {
  /**
   * Renders the label as disabled
   * @defaultvalue false
   */
  disabled?: boolean;

  /**
   * Whether the associated form field is required or not. If true it will be an asterisk, otherwise it will be what is provided.
   * @defaultvalue false
   */
  required?: boolean | ShorthandProps<ComponentProps>;

  /**
   * A label supports different font sizes, see tokens for reference.
   * @defaultvalue 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * A label supports semibold/strong fontweight. When size is set to large, label strong will be set by default.
   * @defaultvalue false
   */
  strong?: boolean;
}

/**
 * Names of the shorthand properties in LabelProps
 * {@docCategory Label}
 */
export type LabelShorthandProps = 'required';

/**
 * Names of LabelProps that have a default value in useLabel
 * {@docCategory Label}
 */
export type LabelDefaultedProps = never;

/**
 * State used in rendering Label
 * {@docCategory Label}
 */
export interface LabelState extends ComponentState<LabelProps, LabelShorthandProps, LabelDefaultedProps> {
  /**
   * Ref to the root element
   */
  ref: React.Ref<HTMLElement>;
}
```

## Structure

### Public

```tsx
<Label required>I'm a Label</Label>
```

### DOM

```tsx
<label {/*Label*/} class="...">
  I'm a Label
  <span {/*required*/} class="...">*</span>
</label>
```

### Internal

```tsx
<slots.root {...slotProps.root}>
  {state.children}
  <slots.required {...slotProps.required} />
</slots.root>
```

## Migration

See [MIGRATION.md](MIGRATION.md)

## Behaviors

### Component States

Label does not have state attributes.

### Interaction

_Keyboard, Cursor, Touch, and Screen Readers_

- None

## Accessibility

- Label will use the native `label` element to render.
- Label cannot receive focus.
- Label will have no focusable elements.
