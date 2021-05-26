# @fluentui/react-label Spec

## Background

_Description and use cases of this component_

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

The Label component should be simple as shown below. It will just need the text to be rendered. For the required label, it has the option of being a shorthand slot that will allow to customize the label's required text. There also an info shorthand slot that will allow for the information button to be customized, but will require a full popover component and not just text.

```tsx
<Label>Label</Label>

<Label disabled>Label</Label>

<Label required>Label</Label>

<Label required="**">
  Label
</Label>

<Label info={popOverComponent}>
  Label
</Label>
```

## Variants

- A Label can be rendered with an asterisk or custom text when is set as `required`.
- A Label can be rendered with an information button to display information about the field when `info` is .
  - > Info is a slot to avoid a dependency on `react-popover` and `react-button`. This could be done by the user providing the info component or we may consider creating a new info button component in the future.

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
   * The slot to display a popover with the label information
   */
  info?: ShorthandProps<ComponentProps>;
}

/**
 * Names of the shorthand properties in LabelProps
 * {@docCategory Label}
 */
export type LabelShorthandProps = 'info' | 'required';

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
<Label required info={<ToggleButton icon={<InfoIcon />} />}>
  I'm a Label
</Label>
```

### DOM

```tsx
<label {/*Label*/} class="...">
  I'm a Label
  <span {/*required*/} class="...">*</span>
  <span {/*info*/} class="...">
    <button>...infoIcon</button>
  </span>
</label>
```

### Internal

```tsx
<slots.root {...slotProps.root}>
  {state.children}
  <slots.required {...slotProps.required} />
  <slots.info {...slotProps.info} />
</slots.root>
```

## Migration

See MIGRATION.md

## Behaviors

### Component States

Label does not have state attributes.

### Interaction

_Keyboard, Cursor, Touch, and Screen Readers_

- None, all handled by passed down JSX (info slot).

## Accessibility

- Label will use the native `label` element to render.
- Label cannot receive focus.
- Label will have one focusable element, which is the info button. This will be handled by the passed down jsx.
