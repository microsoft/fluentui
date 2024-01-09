# Popover

A popover is a small surface that appears when someone interacts with a component to give nonessential, contextual information without blocking them.

Popovers can have structured content and interactive components. If you need to show a more complex layout or block the page behind, try a dialog. For unstructured plain text, try a tooltip.

## Design Guidelines

[Fluent Design Guidelines](https://www.figma.com/file/j3IVtJidhjbqUzKulEeA5o/Popover?type=design&node-id=1%3A90&mode=design&t=AqijKCsBtv7FoJ0k-1)

## DOM Attributes

| name            | description                                                              | type                           |
| --------------- | ------------------------------------------------------------------------ | ------------------------------ |
| open            | Controls the invocation / visibility of the popover                      | boolean                        |
| open-on-hover   | Invokes the popover on hover                                             | boolean                        |
| open-on-context | Invokes the popover on context click                                     | boolean                        |
| anchor          | The id of the element that spawns the popover                            | string                         |
| appearance      | A popover can appear styled with brand or inverted. Defaults to brand.   | "brand" \| "inverted"          |
| beak            | Displays the arrow or "beak" that points to the anchor.                  | boolean                        |
| size            | Determines popover padding and arrow size                                | "small" \| "medium" \| "large" |
| popover-align   |                                                                          |                                |
| position        | Configures the position of the Popover in relation to the anchor element | Placement                      |

### type Placement (floating-ui) vs PositionShorthand (FluentUI)

FluentUI Design guidelines have two concepts in regard to positioning:

1. Position
2. Alignment

The popover implementation uses floating-ui to control the popover. Below is a maping of the floatingui Placement type to the FluentUI PositioningShorthand type

| floating ui - Placement | FluentUI - PositioningShorthand\* |
| ----------------------- | --------------------------------- |
| top                     | above-center                      |
| top-start               | above-start                       |
| top-end                 | above-end                         |
| right                   | end-middle                        |
| right-start             | end-top                           |
| right-end               | end-bottom                        |
| bottom                  | below-center                      |
| bottom-start            | below-start                       |
| bottom-end              | below-end                         |
| left                    | start-middle                      |
| left-start              | start-top                         |
| left-end                | start-bottom                      |

\*[Positioning Shorthand](https://react.fluentui.dev/?path=/docs/concepts-developer-positioning-components--default#shorthand-positions)

## Prior Art

| difference        | changed or omitted? | description                                                                                                                                                                                                                                                    |
| ----------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| beak vs withArrow | changed             | the React implementation uses the terminology withArrow. This differs from the design guidelines which uses "beak" to describe the arrow. This implementation stays true to the design language                                                                |
| bi-directionality | omitted             | the FluentUI guidelines specifies that if a foreign language is used that reads from RTL or LTR the floating position of the component will automatically change. Localization has not been built into this component, therefore this feature has been omitted |
|                   |                     |                                                                                                                                                                                                                                                                |
