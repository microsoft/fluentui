# @fluentui/react-text Spec

## Background

Text is a typography and styling abstraction component that can be used to ensure the consistency of all text across your application.

Fabric used the `variant` prop to set any styling/format to the Text component, while also providing other utilities like `nowrap` and `block`.

```jsx
<Text>This is a Text component</Text>

<Text variant="medium">Text</Text>

<Text block>Text</Text>

<Text nowrap>Text with ellipsis</Text>
```

Stardust's approach provides a more open API, allowing the user to customize `Text` to their own specific needs.

```jsx
<Text weight="light" content="This text is light." />

<Text color="green" content="Green text" />

<Text align="end" content="Text aligned to end" />

<Text error content="There has been an error." />

<Text disabled content="This feature has been disabled." />
```

## Prior Art

- [Open UI research](https://github.com/openui/open-ui/pull/351)
- [Convergence epic](https://github.com/microsoft/fluentui/issues/16847)

## Comparison of [Fabric Text](https://developer.microsoft.com/en-us/fluentui#/controls/web/text) and [Stardust Text](https://fluentsite.z22.web.core.windows.net/0.56.0/components/text/definition)

| Purpose                                                                                                          | Fabric  | Northstar     | Matching             |
| ---------------------------------------------------------------------------------------------------------------- | ------- | ------------- | -------------------- |
| An element type to render as (string or component).                                                              | as      | as            | Matching             |
| Truncates text as needed                                                                                         | nowrap  | truncated     | Matching             |
| Set font size for text                                                                                           | variant | size          | Matching             |
| Renders Text as a block element                                                                                  | block   |               | Missing in Northstar |
| Accessibility behavior if overridden by the user.                                                                |         | accessibility | Missing in Fabric    |
| Align text content.                                                                                              |         | align         | Missing in Fabric    |
| At mentions can be formatted to draw users' attention. Mentions for "me" can be formatted to appear differently. |         | atMention     | Missing in Fabric    |
| A component can have a color.                                                                                    |         | color         | Missing in Fabric    |
| Shorthand for primary content.                                                                                   |         | content       | Missing in Fabric    |
| Set as disabled Text component                                                                                   |         | disabled      | Missing in Fabric    |
| Set as error Text component                                                                                      |         | error         | Missing in Fabric    |
| The text can appear more important and draw user's attention                                                     |         | important     | Missing in Fabric    |
| Set as success Text component                                                                                    |         | success       | Missing in Fabric    |
| The text can signify a temporary state                                                                           |         | temporary     | Missing in Fabric    |
| Set as timestamp Text component                                                                                  |         | timestamp     | Missing in Fabric    |
| Override for theme site variables to allow modifications of component styling via themes.                        |         | variables     | Missing in Fabric    |
| The weight for the Text component                                                                                |         | weight        | Missing in Fabric    |
| Additional CSS class name(s) to apply.                                                                           |         | className     | Missing in Fabric    |
| Additional CSS styles to apply to the component instance.                                                        |         | styles        | Missing in Fabric    |
| -                                                                                                                |         | design        | Missing in Fabric    |

## API Proposal

The new Text will provide props to customize text according to the standards defined by Fluent design. The component will not be tied down to specific application usage, like Stardust did, for example, with `mention` and `timestamp` props, and will allow a bigger degree of freedom when customizing, unlike we did in Fabric.
We're also introducing a new concept of wrappers for the main design variants (i.e. 'Title', 'Subtitle', 'Caption') to improve readability and semantics of the code. The wrappers are expected to have fixed styles in terms of size and font family, but flexible for the other supported props in Text.
These wrappers follow the Fluent UI language so for any deviation, regarding the fixed styles mentioned above, should use the Text component instead, given that this is fully customizable.

| Property      | Type                                                                   | Default value | Comments |
| ------------- | ---------------------------------------------------------------------- | ------------- | -------- |
| as            | "span" \| "p" \| "h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "pre" | "span"        |          |
| wrap          | boolean                                                                | true          |          |
| truncate      | boolean                                                                | false         |          |
| block         | boolean                                                                | false         |          |
| italic        | boolean                                                                | false         |          |
| underline     | boolean                                                                | false         |          |
| strikethrough | boolean                                                                | false         |          |
| size          | number - 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000             | 300           |          |
| font          | string - "base" \| "monospace" \| "numeric"                            | "base"        |          |
| weight        | string - "regular" \| "medium" \| "semibold"                           | "regular"     |          |
| align         | string - "start" \| "center" \| "end" \| "justify"                     | "start"       |          |

### make-styles rules

Finally, we're also making available the styling used internally in Text for a lightweight styling solution if you want to avoid using Text or the added JavaScript layers of Text/wrappers.
This is achieved with the `make-styles` rules being available to the user so that they can follow the Fluent design standards for Typography.

## Sample Code

### Using Text

```jsx
<Text weight="semibold" size={1000}>This text is semibold and huge.</Text>

<Text align="end" italic>Text aligned to the end</Text>

<Text strikethrough>This text has a strikethrough.</Text>
```

### Using the wrappers

```jsx
<Display bold>This text is huge.</Display>
<LargeTitle>This is a large title.</LargeTitle>
<Title as="h1">Title</Title>
<Subtitle as="h2">Sub title</Subtitle>
<Caption>Captioned</Caption>
```

### Using styles directly

```jsx
import { typographyStyles } from '@fluentui/react-text';

const useStyles = makeStyles({
  root: typographyStyles.title,
  caption: typographyStyles.caption,
});

const Test = () => {
  const styles = useStyles();

  return (
    <>
      <p className={styles.root}>
        <span>I am styled like a title</span>
        <span className={styles.caption}>I am styled like a caption</span>
      </p>
    </>
  );
};
```

## Behaviours

### Screen readers

#### Truncate

When using a screen reader, truncated text will be read completely, as truncation is used strictly to prevent text overflow.

Sample:

```jsx
<Text truncate>This is a very long text that will be truncated.</Text>
```

Visual result:

```
This is a very long text...
```

Screen reader:

```
This is a very long text that will be truncated.
```

## Accesibility

Accessibility is included in the entirety of the spec and there are no specific themes to address here.
