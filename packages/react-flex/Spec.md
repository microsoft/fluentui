# Flex

## Background

Flex is a container-type component with the strict purpose of abstracting the implementation of a CSS flexbox in order to define the layout of its children components.

## Prior Art

Although layout seems to vary highly between the currently available component libraries, a consensus was reached through Open UI research over what Flex is and what current examples of approaches in different design systems.
You can see the published research [here](https://open-ui.org/components/flex.research) and the discussion [here](https://github.com/WICG/open-ui/pull/264).

Convergence tracking history can be found on [this](https://github.com/microsoft/fluentui/issues/16791) Github epic

## Comparison of `@fluentui/react` and `@fluentui/react-northstar`

The immediate difference between Fluent UI React (Stack) and Northstar (Flex) is the default orientation.
While Flex opts to be exclusively an abstraction of CSS flexbox, Stack works like a pile by default (top to bottom, left to right) but offering the same features as Flex.
Below is a table of prop comparison:

### Stack/Flex

| Purpose                                     | Stack              | Flex      | Matching                                           | Proposal                                |
| ------------------------------------------- | ------------------ | --------- | -------------------------------------------------- | --------------------------------------- |
| Changing the direction                      | `horizontal`       | `column`  | <span style="color:red">opposite</span>            | `direction` (abstract `flow-direction`) |
| Horizontal alignment                        | `horizontalAlign`  | `hAlign`  | <span style="color:yellow">different naming</span> | `horizontalAlign`                       |
| Vertical alignment                          | `verticalAlign`    | `vAlign`  | <span style="color:yellow">different naming</span> | `verticalAlign`                         |
| Grow the items to fill to the parent's size | `verticalFill`     | `fill`    | <span style="color:yellow">different naming</span> | `fill`                                  |
| Allowing wrapping of the items              | `wrap`             | `wrap`    | <span style="color:green">matching</span>          | `wrap`                                  |
| Define the padding of the container         | `padding`          | `padding` | <span style="color:green">matching</span>          | `padding`                               |
| Override of the component to render         | `as`               | `as`      | <span style="color:green">matching</span>          | `as`                                    |
| Show gray backgrounds to debug positioning  | -                  | `debug`   | <span style="color:red">Stack missing</span>       | _drop prop_                             |
| Reverse the direction                       | `reversed`         | -         | <span style="color:red">Flex missing</span>        | _drop in favor or `direction`_          |
|                                             | `childrenGap`      | `gap`     |                                                    |                                         |
|                                             | `gap` [DEPRECATED] |           |                                                    |                                         |
|                                             |                    | space     |                                                    |                                         |
|                                             | grow               | -         |                                                    |                                         |
|                                             | disableShrink      | -         |                                                    |                                         |
|                                             | maxHeight          | -         |                                                    |                                         |
|                                             | maxWidth           | -         |                                                    |                                         |
|                                             | -                  | className |                                                    |                                         |
|                                             | -                  | design    |                                                    |                                         |
|                                             | -                  | inline    |                                                    |                                         |
|                                             | -                  | styles    |                                                    |                                         |
|                                             | tokens             | variables |                                                    |                                         |

### StackItem/FlexItem

| Stack         | Flex          | Matching | Proposal |
| ------------- | ------------- | -------- | -------- |
| align         | align         |
| className     | className     |
| disableShrink |
|               | design        |
|               | flexDirection |
| grow          | grow          |
|               | push          |
| shrink        | shrink        |
|               | size          |
|               | styles        |
|               | variables     |
| verticalFill  |

### Proposal for changes

| Component | Old Property               | New Property      | Values                                                                                                           | Resoning                                                                                                                                                                                                                                              |
| --------- | -------------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Flex      | `horizontal`/`vertical`    | `direction`       | "`row`", "`row-reverse`", "`column`", "`column-reverse`"                                                         | To further cement the idea of Flex being an abstraction to flexbox, this would bring a closer experience while also being less biased on our interpretation of the default direction as well as merging the idea of reversing to the standard in CSS. |
| Flex      | `horizontalAlign`/`hAlign` | `horizontalAlign` | "`start`", "`center`","`end`", " `space-between`", "`space-around`", "`space-evenly`", "`baseline`", "`stretch`" | This gives the user a more verbose and easily recognizable idea for what the prop does.                                                                                                                                                               |
| Flex      | `verticalAlign`/`vAlign`   | `verticalAlign`   | "`start`", "`center`","`end`", " `space-between`", "`space-around`", "`space-evenly`", "`baseline`", "`stretch`" | This gives the user a more verbose and easily recognizable idea for what the prop does.                                                                                                                                                               |
| FlexItem  | `childrenGap`/`gap`        | `padding`         | pixel / percentage                                                                                               | This brings the user to a more known concept of spacing already used in CSS and on the container component, bringing coherence.                                                                                                                       |

---

- All mentions of v7 or v8 == `@fluentui/react` ([docsite](https://developer.microsoft.com/en-us/fluentui#/))
- All mentions of v0 == `@fluentui/react-northstar` ([docsite](https://fluentsite.z22.web.core.windows.net/))

The most relevant comparison that can be achieved between the two libraries is between `ContextualMenu` in v7 and a combination of `Menu`, `Popup` and `ToolbarItem` in v0.

v0 suffers from a consistency issue that the control used in `Menu` and the menu variant of `ToolbarItem` are not actually the same component and have different behavior. However, semantically for the purposes of this spec, they representthe same control that will be implemented.

Note that the below code samples are not meant to be complete, but to highlight differences between the two libraries. Please refer to official docsites for actual API references.

---

---

---

## Sample Code

_Provide some representative example code that uses the proposed API for the component_

## Variants

_Describe visual or functional variants of this control, if applicable. For example, a slider could have a 2D variant._

## API

_List the **Props** and **Slots** proposed for the component. Ideally this would just be a link to the component's `.types.ts` file_

## Structure

- _**Public**_
- _**Internal**_
- _**DOM** - how the component will be rendered as HTML elements_

## Migration

_Describe what will need to be done to upgrade from the existing implementations:_

- _Migration from v8_
- _Migration from v0_

## Behaviors

_Explain how the component will behave in use, including:_

- _Component States_
- _Interaction_
  - _Keyboard_
  - _Cursor_
  - _Touch_
  - _Screen readers_

## Accessibility

Base accessibility information is included in the design document. After the spec is filled and review, outcomes from it need to be communicated to design and incorporated in the design document.

- Decide whether to use **native element** or folow **ARIA** and provide reasons
- Identify the **[ARIA](https://www.w3.org/TR/wai-aria-practices-1.2/) pattern** and, if the component is listed there, follow its specification as possible.
- Identify accessibility **variants**, the `role` ([ARIA roles](https://www.w3.org/TR/wai-aria-1.1/#role_definitions)) of the component, its `slots` and `aria-*` props.
- Describe the **keyboard navigation**: Tab Oder and Arrow Key Navigation. Describe any other keyboard **shortcuts** used
- Specify texts for **state change announcements** - [ARIA live regions
  ](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) (number of available items in dropdown, error messages, confirmations, ...)
- Identify UI parts that appear on **hover or focus** and specify keyboard and screen reader interaction with them
- List cases when **focus** needs to be **trapped** in sections of the UI (for dialogs and popups or for hierarchical navigation)
- List cases when **focus** needs to be **moved programatically** (if parts of the UI are appearing/disappearing or other cases)
