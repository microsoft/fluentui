# Popover

A popover is a small surface that appears when someone interacts with a component to give nonessential, contextual information without blocking them.

Popovers can have structured content and interactive components. If you need to show a more complex layout or block the page behind, try a dialog. For unstructured plain text, try a tooltip.

## Design Guidelines

[Fluent Design Guidelines](https://www.figma.com/file/j3IVtJidhjbqUzKulEeA5o/Popover?type=design&node-id=1%3A90&mode=design&t=AqijKCsBtv7FoJ0k-1)

## DOM Attributes

| name             | description                                                                      | type                                      |
| ---------------- | -------------------------------------------------------------------------------- | ----------------------------------------- |
| open             | Controls the invocation / visibility of the popover                              | boolean                                   |
| open-on-hover    | Enables the invocation of the popover on hover                                   | boolean                                   |
| open-on-context  | Enables the invocation of the popover on context click                           | boolean                                   |
| anchor           | The id of the element that spawns the popover                                    | string                                    |
| appearance       | A popover can appear styled with brand or inverted. Defaults to brand.           | "brand" \| "inverted"                     |
| beak             | Displays the arrow or "beak" that points to the anchor.                          | boolean                                   |
| size             | Determines popover padding and arrow size                                        | "small" \| "medium" \| "large"            |
| popover-align    | Alignment for the component. Only has an effect if used with the position option | "start" \| "end" \| "top" \| "bottom      |
| popover-position | Position for the component. Position has higher priority than popoverAlign.      | "above" \| "below" \| "before" \| "after" |
| positioning      | Configures the position of the Popover in relation to the anchor element         | PositioningShorthand                      |
| cover-target     | Covers the target when invoking popover                                          | boolean                                   |
| offset-x         | x-axis offset modifier for popover location                                      | number                                    |
| offset-y         | y-axis offset modifier for popover location                                      | number                                    |
| pinned           | Disabled automatic repositioning                                                 | boolean                                   |

## Prior Art

_differences in language_

| difference           | changed or omitted? | description                                                                                                                                                                                                                                                    |
| -------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| beak vs withArrow    | changed             | the React implementation uses the terminology withArrow. This differs from the design guidelines which uses "beak" to describe the arrow. This implementation stays true to the design language                                                                |
| bi-directionality    | omitted             | the FluentUI guidelines specifies that if a foreign language is used that reads from RTL or LTR the floating position of the component will automatically change. Localization has not been built into this component, therefore this feature has been omitted |
| positioning language | changed             | The FluentUI guidelines has confusing language concerning the positioning of the popover. Fluent UI React has altered the language to simplify it. The web component will follow the React language for positioning. More on this below.                       |

| FluentUI React - PositioningProps\* | FluentUI Web Component                                                          | notes                                                                                                                                      |
| ----------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| align                               | Achieved through the positioning attribute or popover-align attribute           | React prop type Alignment = 'top' \| 'bottom' \| 'start' \| 'end' \| 'center'                                                              |
| arrowPadding                        | Achieved through CSS                                                            |                                                                                                                                            |
| autoSize                            | Omitted - not in design guidelines                                              | Applies styles on the positioned element to fit it within the available space in viewport                                                  |
| coverTarget                         | DOM Attribute                                                                   | Modifies position and alignment to cover the target                                                                                        |
| flipBoundary                        | Omitted - design guidelines specify the triggering element as the flip boundary | The element which will define the boundaries of the positioned element for the flip behavior                                               |
| offset                              | Split into two DOM attributes offset-x and offset-y                             | Lets you displace a positioned element from its reference element.                                                                         |
| overflowBoundary                    | Omitted - the boundary element is the trigger element                           |                                                                                                                                            |
| overflowBoundaryPadding             | Omitted - not in design guidelines                                              | Applies a padding to the overflow boundary, so that overflow is detected earlier before the positioned surface hits the overflow boundary. |
| pinned                              | Achieved through DOM Attribute                                                  | Disables automatic repositioning                                                                                                           |
| position                            | Achieved through the positioning attribute or the popover-position attribute    | "above" \| "below" \| "before" \| "after"                                                                                                  |
| strategy                            | Achieved through CSS                                                            | Specifies the type of CSS position property to use.                                                                                        |
| useTransform                        | Omitted - not in design guidelines                                              | Modifies whether popover is positioned using transform.                                                                                    |
| matchTargetSize                     | Omitted - not in design guidelines                                              | When set, the positioned element matches the chosen dimension(s) of the target element                                                     |

\*[Positioning Shorthand](https://react.fluentui.dev/?path=/docs/concepts-developer-positioning-components--default#shorthand-positions)

### type Placement (floating-ui) vs PositionShorthand (FluentUI)

The popover web component uses floating-ui (a javascript npm package) to implement the design guidelines. FluentUI Design guidelines have two concepts in regard to positioning:

1. Position - "above" | "below" | "before" | "after"
2. Alignment - "start" | "end" | "center"

Below is a maping of the floating ui Placement type to the FluentUI PositioningShorthand type. There are some differences in language, but the meanings in the ui are the same. For the sake of clarity the web component implementation precisely matches the language of the react implementation:

| Floating-ui - Placement | FluentUI React - PositioningShorthand\* | FluentUI Web Component - follows React pattern | FluentUI Design Guidelines | notes |
| ----------------------- | --------------------------------------- | ---------------------------------------------- | -------------------------- | ----- |
| top                     | above                                   | above                                          | above-center               |       |
| top-start               | above-start                             | above-start                                    | above-start                |       |
| top-end                 | above-end                               | above-end                                      | above-end                  |       |
| right                   | after                                   | after                                          | end-middle                 |       |
| right-start             | after-top                               | after-top                                      | end-top                    |       |
| right-end               | after-bottom                            | after-bottom                                   | end-bottom                 |       |
| bottom                  | below                                   | below                                          | below-center               |       |
| bottom-start            | below-start                             | below-start                                    | below-start                |       |
| bottom-end              | below-end                               | below-end                                      | below-end                  |       |
| left                    | before                                  | before                                         | start-middle               |       |
| left-start              | before-top                              | before-top                                     | start-top                  |       |
| left-end                | before-bottom                           | before-bottom                                  | start-bottom               |       |

### Prior work

Component dev implementation work was initially began by Miro Stastny. With his permission, we are picking up where he left off. [His PR here](https://github.com/microsoft/fluentui/pull/26984/files#diff-696924c0eb6e18cb4283373ccf8c3cb8713a2cc1e5b32ccc2f907616803e2f63)

## Usage:

```html
<fluent-popover anchor="button-trigger" beak>
  <fluent-button id="button-trigger"></fluent-button>
</fluent-popover>
```
