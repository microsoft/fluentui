# @fluentui/react-text Spec

## Background

- Explain what Text is

## Prior Art

- Explain how Text worked for Fabric/Stardust
- Explain our new approach (Title, SubTitle, Caption and Text as default)

## Comparison of [Fabric Text](https://developer.microsoft.com/en-us/fluentui#/controls/web/text) and [Stardust Text](https://fluentsite.z22.web.core.windows.net/0.56.0/components/text/definition)

| Purpose                                                                                                          | Fabric  | Northstar     | Matching |
| ---------------------------------------------------------------------------------------------------------------- | ------- | ------------- | -------- |
| Renders Text as a block element                                                                                  | block   |               |          |
| Determines whether text should be wrapped or not                                                                 | nowrap  |               |          |
| Set font size for text                                                                                           | variant |               |          |
| Accessibility behavior if overridden by the user.                                                                |         | accessibility |          |
| Align text content.                                                                                              |         | align         |          |
| An element type to render as (string or component).                                                              | as      | as            |          |
| At mentions can be formatted to draw users' attention. Mentions for "me" can be formatted to appear differently. |         | atMention     |          |
| Additional CSS class name(s) to apply.                                                                           |         | className     |          |
| A component can have a color.                                                                                    |         | color         |          |
| Shorthand for primary content.                                                                                   |         | content       |          |
| -                                                                                                                |         | design        |          |
| Set as disabled Text component                                                                                   |         | disabled      |          |
| Set as error Text component                                                                                      |         | error         |          |
| The text can appear more important and draw user's attention                                                     |         | important     |          |
| The size for the Text component                                                                                  |         | size          |          |
| Additional CSS styles to apply to the component instance.                                                        |         | styles        |          |
| Set as success Text component                                                                                    |         | success       |          |
| The text can signify a temporary state                                                                           |         | temporary     |          |
| Set as timestamp Text component                                                                                  |         | timestamp     |          |
| Truncates text as needed                                                                                         |         | truncated     |          |
| Override for theme site variables to allow modifications of component styling via themes.                        |         | variables     |          |
| The weight for the Text component                                                                                |         | weight        |          |

## API Proposal

- Explain in depth props
- Explain in depth new wrapper components
- Default values and fancy new interface (weight, color, alignment)

## Sample Code

```
<Text> This is a Text component </Text>

<Text variant={'medium'}> Text </Text>

<Text block> Text </Text>

<Text nowrap> Text with ellipsis</Text>

```
