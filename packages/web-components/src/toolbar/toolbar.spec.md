# Toolbar

## Component Description

A toolbar is a container for grouping a set of controls, such as buttons, menubuttons, or checkboxes.

When a set of controls is visually presented as a group, the toolbar role can be used to communicate the presence and purpose of the grouping to screen reader users. Grouping controls into toolbars can also be an effective way of reducing the number of tab stops in the keyboard interface.

## Design Spec

[Link to Design Spec in Figma](https://www.figma.com/file/QfHyx6ApwFEcw5q4pM9CSZ/Toolbar?node-id=2351-6672&t=MuajdFxoCBjwlK4w-0)

[Link to Fluent 2 Storybook](https://master--628d031b55e942004ac95df1.chromatic.com/?path=/docs/components-toolbar--default)

## Engineering Spec

### Inputs

- @attr orientation: "horizontal" "vertical" | "horizontal"
- @attr size: "small" "medium" "large" | "medium"

### Outputs

### Slots

- label: Content which appears as the label for the toolbar.
- start: Content which appears at the start of the toolbar, before the default slotted items.
- default: Content which appears in the default location of the toolbar, left-aligned.
- end: Content which appears at the end of the toolbar, right aligned.

### CSS Variables

None

## Interactions

Interactions are inherited from FAST Toolbar component.

| Name             | Description                             |
| ---------------- | --------------------------------------- |
| `clickHandler`   | Sets the active index                   |
| `focusinHandler` | Sets focus on element with active index |
| `keydownHandler` | Handles keydown events on the toolbar   |

## Accessibility

- [x] Find the matching component through WCAG's patterns: https://www.w3.org/WAI/ARIA/apg/patterns/
  - https://www.w3.org/WAI/ARIA/apg/patterns/toolbar.html
- [x] Are there any accessibility elements unique to this component?
- [x] List ARIA attributes
  - [x] role="toolbar" in FAST
  - [x] aria-orientation="vertical" in FAST
- [ ] Does the component support 400% zoom?
- [ ] What keyboard behaviors does the component support?
  - [x] Tab : Moves focus to the next focusable element in the toolbar.
  - [x] Shift + Tab : Moves focus to the previous focusable element in the toolbar.
  - [x] Arrow keys : Moves focus to the next/previous focusable element in the toolbar.

## Preparation

- [x] Find the base FAST Component
  - This component will inherit from [FAST Toolbar](https://explore.fast.design/components/fast-toolbar)
- [x] Check the [Fluent UI React V9 Component Spec](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-toolbar/docs/Spec.md) for differences and document:

  - Differences between FAST Toolbar component and Fluent Toolbar component spec:

    - React Toolbar component contains custom components: `ToolbarButton`, `ToolbarDivider`, `ToolbarGroup`, `ToolbarRadioButton`, `ToolbarRadioGroup`, `ToolbarToggleButton`; whereas FASTToolbar does not.
    - React Toolbar component has a `size` attribute that can be set to "small", "medium", or "large". FASTToolbar does not have this attribute.
    - React Toolbar component has a component: `ToolbarItemGroup`. This looks like it is made to contain radio buttons and checkbox elements. FASTToolbar does not have this component.

- [x] Fluent UI React V9 Storybook for implementation differences and document:

  - [Fluent React Toolbar](https://master--628d031b55e942004ac95df1.chromatic.com/?path=/docs/components-toolbar--default) has Overflow Items and corresponding More (ellipses) button. This aligns with the Fluent Toolbar spec. The FASTToolbar component however does not implement this. We could either work to include this feature or leave it up to the developer to implement.

    - If we exclude this feature, the burden goes to developers to implement. This gives the developer more flexibility.
    - If we include this feature, we are committing to an increased degree of complexity to account for layout and content scenarios outside our control. Therefore, this has potential to become brittle.

- [x] Open GitHub issues related to component
  - [Toolbar overflow menu is misaligned/shifting rest of a page when clicked](https://github.com/microsoft/fluent-ui-react/issues/2355)
  - [Toolbar with menu: trigger button always opens menu instead of toggling it](https://github.com/microsoft/fluent-ui-react/issues/2327)
  - [RFC: move components to functional components](https://github.com/microsoft/fluent-ui-react/issues/2269)
  - [Popup clinging to left border of background for trigger components close to border](https://github.com/microsoft/fluent-ui-react/issues/2129)
  - [Popped out example is broken](https://github.com/microsoft/fluent-ui-react/issues/1946)
  - [PropTypes errors when ToolbarItem children is used](https://github.com/microsoft/fluent-ui-react/issues/1799)
  - [ShorthandCollection does not contain proper definition](https://github.com/microsoft/fluent-ui-react/issues/1664)
  - [Focusable components should expose a public focus method](https://github.com/microsoft/fluent-ui-react/issues/1555)
- [x] [Component Spec authored](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#component-spec)
  - [ ] And [reviewed](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#spec-review)
