# Divider Spec

## Background

The divider control is to replace the Separator control currently in use. Its purpose is to visual separate content.
Adding minor structural updates and new engineering practices and update the naming conventions to match naming conventions to OpenUI.

## Prior Art

[Github Epic Convergance Issue #16254](https://github.com/microsoft/fluentui/issues/16254)

[Github Convergance Issue #15759](https://github.com/microsoft/fluentui/issues/15759)

[Fluent UI Separator](https://developer.microsoft.com/en-us/fluentui#/controls/web/separator)

[Open UI Component Matrix](https://open-ui.org/analysis/component-matrix)

[Ant Design Divider](https://ant.design/components/divider/)

[Fast Divider](https://explore.fast.design/components/fast-divider)

[Semantic UI Divider](https://semantic-ui.com/elements/divider.html)

## Comparison of v8 and v0

- v8 - [Separator](https://developer.microsoft.com/en-us/fluentui#/controls/web/separator)
- v0 - [Divider](https://fluentsite.z22.web.core.windows.net/0.51.4/components/divider/definition)

## Sample Code

Basic Examples:

```html
<Divider />
<Divider vertical="true" />
<Divider>This is a divider with content</Divider>
```

## Variants

The divider will have two main variants, a horzontal and vertical render. The control is the same with the optional property `vertical="true"` defining the rendering type. As per current definition, content can only be added if the divider is horizontal (TBD).

Standard default horizontal

```html
<Divider />
```

Vertical

```html
<Divider vertical="true" />
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

Fitted

```html
<Divider fitted />
```

Size

```html
<Divider size="3" />
```

Layout

```html
<Divider layout="inset" />
```

## API

From [Divider.types.tsx](http://about:blank)

### Slots

- content (?)

### Props

```ts
export interface DividerProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  tokens?: RecursivePartial<DividerTokens>;

  /**
   * A divider can justify the content. Center is default.
   */
  alignContent?: 'start' | 'end' | 'center';

  appearance?: 'default' | 'subtle' | 'brand' | 'strong';

  children?: any;

  /* A divider can have a overriding color */
  color?: string;

  /* important will emphasis the content */
  important?: boolean;

  inset?: boolean;

  /* The size is a multiplier value for the size */
  size?: SizeValue;

  /* A divider can be horizontal (default) or verticle*/
  vertical?: boolean;

  /* Overrides for custom appearances */
  height?: string;

  width?: string;

  fontSize?: string;

  fontWeight?: string;

  fontColor?: string;

  margin?: string;
}
```

## Styling Tokens

TBD

```ts
export type DividerTokens = ColorTokens & FontTokens & {};
```

## Structure

<div class="root">
  <!-- ::before to handle the divider line for with or without content -->
  <div>Content</div>
  <!-- ::after to handle the post divider line if content exists -->
</div>

## Migration

The divider control is a direct replacement of the current Separator control, all current properties will remain intact, however the tag name will need to be updated from `<Separator/>` to `<Divider/>`

Migration from V0 will require removing the content property and nesting that content as a child of the node ex.

```
<Divider content="My Content">
<Divider>My Content</Divider>

```

## Behaviors

This component has no state.
This control will have no interactions.
This control will have no affect on screen readers.

Content if provided, will self determine it's behaviors.

## Accessibility

Since the divider is not a focusable element itself, there doesn't need to have an accessilibity role for this control. The descendant content when wrapped from the divider must handle any accessibility information itself when appropriate.
