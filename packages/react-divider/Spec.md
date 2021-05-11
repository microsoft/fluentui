# Divider Spec

## Background

The divider control is intended to replace the Separator control currently exported. Its purpose is to visually separate content.
The purpose of redoing the component is to add minor structural updates and new engineering practices and update the naming conventions in the API to match naming conventions indicated by OpenUI research.

## Prior Art

[Github Epic Convergence Issue #16254](https://github.com/microsoft/fluentui/issues/16254)

[Github Convergence Issue #15759](https://github.com/microsoft/fluentui/issues/15759)

[Fluent UI Separator](https://developer.microsoft.com/en-us/fluentui#/controls/web/separator)

[Open UI Component Matrix](https://open-ui.org/analysis/component-matrix)

[Ant Design Divider](https://ant.design/components/divider/)

[Fast Divider](https://explore.fast.design/components/fast-divider)

[Semantic UI Divider](https://semantic-ui.com/elements/divider.html)

## Comparison of v8 and v0

- v8 - [Separator](https://developer.microsoft.com/en-us/fluentui#/controls/web/separator)
- v0 - [Divider](https://fluentsite.z22.web.core.windows.net/0.52.1/components/divider/definition)

## Sample Code

Basic Examples:

```html
<Divider />
<Divider vertical />
<Divider>This is a divider with content</Divider>
```

## Variants

The divider will have two main variants, rendering horizontally or vertically. The control is the same with the optional property `vertical` defining how it renders.

Standard default horizontal

```html
<Divider />
```

Vertical

```html
<Divider vertical />
```

Color

```html
<Divider color="black" />
```

Content

```html
<Divider>My Content</Divider>
```

Icon

```html
<Divider><Icon /></Divider>
```

Important

```html
<Divider important>This is important!</Divider>
```

Inset

```html
<Divider inset />
```

Appearance

```html
<Divider apperance="subtle" />
<Divider apperance="brand" />
<Divider apperance="strong" />
```

## API

From [Divider.types.tsx](https://github.com/microsoft/fluentui/blob/master/packages/react-divider/src/components/Divider/Divider.types.ts)

### Slots

- root

### Props

```ts
export interface DividerProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Determines the alignment of the content within the divider.
   * @defaultvalue 'center'
   */
  alignContent?: 'start' | 'end' | 'center';

  /**
   * Predefined visual styles
   * @defaultvalue 'default'
   */
  appearance?: 'default' | 'subtle' | 'brand' | 'strong';

  /**
   * A divider can have a overriding border color
   */
  color?: string;

  /**
   * A divider can be classified as important to emphasize its content
   */
  important?: boolean;

  /**
   * Adds a 12px padding to the begining and end of the divider
   */
  inset?: boolean;

  /**
   * A divider can be horizontal (default) or vertical
   */
  vertical?: boolean;

  /**
   * Overrides for border visuals
   */
  borderStyle?: string;
  borderSize?: string | number;

  /**
   * Accessibility wrapper for content when presented.
   * A shorthand prop can be a literal, object, or
   * JSX. The `children` prop of the object can be a render function,
   * taking in the original slot component and props.
   */
  wrapper?: ShorthandProps<React.HTMLAttributes<HTMLDivElement>>;
}
```

## Styling Tokens

The current exposed tokens and default values are listed below:

**Default**

Font Color : tokens.alias.color.neutral.neutralForeground2

Border Color: tokens.alias.color.neutral.neutralStroke2

**Subtle**

Font Color : tokens.alias.color.neutral.neutralForeground2

Border Color: tokens.alias.color.neutral.neutralStroke3

**Brand**

Font Color : tokens.alias.color.brand.brandBackgroundStatic

Border Color: tokens.alias.color.brand.brandBackgroundStatic

**Brand**

Font Color : tokens.alias.color.neutral.neutralForeground2

Border Color: tokens.alias.color.neutral.neutralStroke1

## Structure

```
<div>
  <!-- ::before to handle the divider line independent of the divider having content or not -->
  <div>Content</div>
  <!-- ::after to handle the divider line that goes after the content if it has been provided. -->
</div>
```

## Migration

[See MIGRATION.md](./Migration.md)

## Behaviors

This component has no state.
This control will have no interactions.
This control will have no effect on screen readers.

Content, if provided, will self determine it's behaviors.

## Accessibility

Since the divider is not a focusable element itself, this control doesn't require any accessibility roles or special behavior applied to it. The descendant content when wrapped from the divider must handle any required accessibility behaviors itself when appropriate.
