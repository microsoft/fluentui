# AvatarGroup Spec

## Background

The AvatarGroup component represents multiple people or entities. Avatar groups can be represented in a stacked layout, pie layout, and grid layout.

## Prior Art

### OpenUI

There's no current research in OpenUI's website.

| Library                                                                               | Name         | Notes |
| ------------------------------------------------------------------------------------- | ------------ | ----- |
| [Fluent UI v8](https://developer.microsoft.com/en-us/fluentui#/controls/web/facepile) | Facepile     |       |
| [Attlassian](https://atlassian.design/components/avatar-group/examples)               | Avatar group |       |
| [Sales Force](https://www.lightningdesignsystem.com/components/avatar-group/)         | Avatar Group |       |
| [Ant Design](https://ant.design/components/avatar/)                                   | Avatar.Group |       |
| [Primer React](https://primer.style/react/AvatarStack)                                | AvatarStack  |       |

### Comparison v8 and v0

There's only one existent component similar to AvatarGroup in v8. v0 doesn't have an equivalent of this component.

- v8 - [Facepile](https://developer.microsoft.com/en-us/fluentui#/controls/web/facepile)

- _Link to Open UI research_
- _Link to comparison of v7 and v0_
- _Link to GitHub epic issue for the converged component_

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
