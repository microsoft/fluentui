# @fluentui/react-search Spec

## Background

`SearchBox` is a text input field abstracting `<input type="search" />`.

## Prior Art

- [Ant Design](https://ant.design/components/input)
- [Carbon](https://carbondesignsystem.com/components/search/usage/)
- [Lightning Design](https://www.lightningdesignsystem.com/components/input/)
- [Material UI](https://mui.com/material-ui/react-text-field/)
- [Spectrum](https://react-spectrum.adobe.com/react-spectrum/SearchField.html)

### Comparison of v8 and v0

#### v8

The v8 SearchBox component is implemented as a text input field that lacks a type attribute.

The v8 component supports a customizable leading icon, with the default being a search icon. The leading icon is hidden when search box is in focus by default. When the search box is in focus, the leading icon disappears to allow the search content to span the entire width of the search box. The disappearance and reappearance of the leading icon can be animated as sliding in and out from the left side of the search box. The unfocused view lacks support for any content at the end. When in focus and the search box is not empty, a clear button appears at the end of the search bar that is present in the tab order.

The v8 component spans the entire width of its parent component. There are only three visual variants of the v8 component: default and underlined. The v8 component can be disabled.

[Documentation for v8 SearchBox](https://developer.microsoft.com/en-us/fluentui#/controls/web/searchbox)

```
<SearchBox
    ariaLabel="SearchBox"
    placeholder="Search"
    onSearch={newValue => console.log('value is ' + newValue)}
/>
```

#### v0

Because v0 does not have a designated search component, search functionalities fall upon the Input component. The v0 Input component is implemented as a text input field with `type="text"`. If the input is search, the input will include `role="search"`.

The v0 component supports an icon positioned at either the beginning or the end of the input. If the input is made clearable, the clear icon will replace the custom icon when there is content in the input box and it is in focus. The v0 component can be used inline with text. The v0 component has a slot for an input label, which can additionally be placed inline or inside of the component.

[Documentation for v0 Input](https://fluentsite.z22.web.core.windows.net/0.59.0/components/input/definition)

```
<Input
    icon={<SearchIcon />}
    iconPosition="start"
    label="Search"
    placeholder="Search..."
/>
```

## Sample Code

_Provide some representative example code that uses the proposed API for the component_

## Variants

### Visual variants

Search supports the same appearance variants as Input, as follows:

- `outline` (default): the field has a full outline, with a slightly darker underline on the bottom
- `underline`: the field has an underline on the bottom only
- `filledDarker`: the field has a gray background and no underline/outline
- `filledLighter`: the field has a white background and no underline/outline (for use on top of gray/colored backgrounds)

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

We don't implement enter to search, this would come from the consuming team
The clear button is not in the tab order and should not receive focus

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
