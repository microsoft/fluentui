# Popover

A popover is a small surface that appears when someone interacts with a component to give nonessential, contextual information without blocking them.

Popovers can have structured content and interactive components. If you need to show a more complex layout or block the page behind, try a dialog. For unstructured plain text, try a tooltip.

## Design Guidelines

[Fluent Design Guidelines](https://www.figma.com/file/j3IVtJidhjbqUzKulEeA5o/Popover?type=design&node-id=1%3A90&mode=design&t=AqijKCsBtv7FoJ0k-1)

## Background and Motivations

The design guidelines demonstrate a highly flexible and feature rich popover in the form of a styled DOM element. Creating elements like this which respond to changes in the screen size and the location of the anchoring element are complex and fairly labor intensive to develop.

Presently, due to the maturity of web technologies, and because its such a well used pattern, there aren't many different approaches to implementation of a popover. One outshines all the competitors: [Floating-UI](https://floating-ui.com/docs/getting-started).

FluentUI React uses floating-ui to achieve many of the features illustrated in the Fluent UI design guidelines. At first glance, it seems like a natural choice for implmentation. It has a proven track record, uses vanilla javascript, can be easily utilized for web components, will work in any browser, and is relatively small (7kb). Given its popularity and robustness, why wouldn't we utilize the Floating-UI? In short, because there are newer options that provide longevity and performance.

[Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) a Native browser popover, is the less obvious but more modern solution to building popovers. There is a caveat that it's not supported in Firefox yet, however a polyfill is available.

The Popover API has one main advantage over Floating-UI - no javascript. It's the most lightweight solution possible for creating a popover. In addition to being lightweight there are other reasons to decouple from a third party library like floating ui:

1. It makes meeting the fluent design guidelines an exercise in styling. This also means that popover could be ported to other design systems.
1. Upgrades us to the latest web standards - Neither Popover API and CSS Anchored Positioning are fully available yet, but we can subscribe to their language and api now.
1. Handle positioning (the most complex part of the popover) without third party Javascript Apis - which may be more work, but will give us a foundation that doesn't rely on tools we did not develop ourselves (We are Microsoft and should not need to rely on third party Javascript packages to meet our requirements).

## Engineering Strategy

Popover is built with the Popover API, Popover Polyfill API, and CSS Anchor Positioning (which will also require our own polyfill)

## Referenced Technologies

- [Floating-UI](https://floating-ui.com/docs/getting-started) - A well proven extremely robust javascript framework for controlling floating elements like popovers.
- [Browser Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/) -
  > "The Popover API provides developers with a standard, consistent, flexible mechanism for displaying popover content on top of other page content. Popover content can be controlled either declaratively using HTML attributes, or via JavaScript. This article provides a detailed guide to using all of its features."
- [oddbird/Popover API polyfill](https://github.com/oddbird/popover-polyfill) - for filling firefox users
- [CSS Anchor Positioning](https://drafts.csswg.org/css-anchor-position/)
  > "a positioned element can size and position itself relative to one or more anchor elements elsewhere on the page."
- [oddbird/CSS Anchor positioning polyfill](https://github.com/oddbird/css-anchor-positioning)
- [CSS Anchor Positioning Comments Interop 2024](https://github.com/orgs/web-platform-tests/projects/3/views/1?pane=issue&itemId=39322729)

## DOM Attributes

| name             | description                                                                      | type                                      |
| ---------------- | -------------------------------------------------------------------------------- | ----------------------------------------- |
| open             | Controls the invocation / visibility of the popover                              | boolean                                   |
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

_differences coming from Fluent UI React_

| difference           | changed or omitted? | description                                                                                                                                                                                                                                                    |
| -------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| beak vs withArrow    | changed             | the React implementation uses the terminology withArrow. This differs from the design guidelines which uses "beak" to describe the arrow. This implementation stays true to the design language                                                                |
| bi-directionality    | omitted             | the FluentUI guidelines specifies that if a foreign language is used that reads from RTL or LTR the floating position of the component will automatically change. Localization has not been built into this component, therefore this feature has been omitted |
| positioning language | changed             | The FluentUI guidelines has confusing language concerning the positioning of the popover. Fluent UI React has altered the language to simplify it. The web component will follow the React language for positioning. More on this below.                       |
| open-on-hover        | omitted             | Enables the invocation of the popover on hover                                                                                                                                                                                                                 |
| open-on-context      | omitted             | Enables the invocation of the popover on context click                                                                                                                                                                                                         |

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
