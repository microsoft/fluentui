# @fluentui/react-list-preview Spec

## Background

A List is a component that displays a group of sequential components in one dimension. The layout can be vertical (default), horizontal or grid with completely custom template.

If you are displaying more than one dimension of the data, the List probably isn't the proper component to use, instead, consider using Table or DataGrid.

The List supports plain list items, interactive list items with one action or multiple actions. It also has support for single and multi selection built in. This can be utilized in either uncontrolled or controlled way.

All of the List scenarios are also accessible, as the whole component was built with accessibility in mind. It is easily navigable with a keyboard and supports different screen reader applications.

## Prior Art

- [Fluent UI v0 docs](https://fluentsite.z22.web.core.windows.net/components/list/definition)
- [Fluent UI v8 docs](https://developer.microsoft.com/en-us/fluentui#/controls/web/list)
- [Open UI research](https://open-ui.org/components/list.research/)

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
