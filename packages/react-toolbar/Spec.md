# @fluentui/react-toolbar Spec

## Background

### Definition

`Toolbar` is a surface that houses commands that operate on the content of the window, panel, or parent region it resides above. `Toolbar` is one of the most visible and recognizable way to surface commands, and can be an intuitive method for interacting with content on the page; however, if overloaded or poorly organized, they can be difficult to use and hide valuable commands from your user. `Toolbar` can also display a search box for finding content, hold simple commands as well as menus, or display the status of ongoing actions.

## Prior Art

As a part of the spec definitions in Fluent UI, a research effort has been made through [Open UI](https://open-ui.org/). The current research proposal is available as an open source contribution undergoing review ([research proposal](https://github.com/openui/open-ui/pull/452))

## Comparison of `@fluentui/react` and `@fluentui/react-northstar`

- All mentions of v7 or v8 == `@fluentui/react` ([docsite](https://developer.microsoft.com/en-us/fluentui#/))
- All mentions of v0 == `@fluentui/react-northstar` ([docsite](https://fluentsite.z22.web.core.windows.net/))

The main difference between `@fluentui/react`'s `CommandBar` and `@fluentui/react-northstar`'s `Toolbar` is the right group of commands present in `CommandBar` which will not remove items on overflow.

v0 `Toolbar` has support to children API with static components in `Toolbar` as `Toolbar.Button` etc...

## Variants

The only layout variation is size differences, there are 2 sizes `medium` which is the default and `small`.

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
