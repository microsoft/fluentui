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

## Sample Code

## Variants

## API Proposal

- Explain in depth props
- Explain in depth new wrapper components
- Default values and fancy new interface (weight, color, alignment)
- Explain our new approach (Title, SubTitle, Caption and Text as default)

## Structure

## Behaviours

## Accesibility
