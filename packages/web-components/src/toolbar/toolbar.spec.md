# Toolbar

## Component Description

A Toolbar is a container for grouping a set of controls: action controls (e.g. button, icon button), input fields, dropdown, and menu button. Each control will be a web component.

Checkbox too?

The actions and input fields on a toolbar can include dropdowns.

## Design Spec

[Link to Design Spec in Figma](https://www.figma.com/file/QfHyx6ApwFEcw5q4pM9CSZ/Toolbar?node-id=2351-6672&t=MuajdFxoCBjwlK4w-0)

[Link to Fluent 2 Spec](https://master--628d031b55e942004ac95df1.chromatic.com/?path=/docs/components-toolbar--default)

## Engineering Spec

### Inputs

- @attr appearance: "static" | "contextual"
- @attr size: "small" "medium" | "medium"
- @attr vertical: boolean | false
  -- FAST uses `orientation`: enum { horizontal, vertical }

### Outputs

### Slots

- start: Content which appears at the start of the toolbar, before the default slotted items.
- default: Content which appears in the default location of the toolbar, left-aligned.
- end: Content which appears at the end of the toolbar, right aligned.

### CSS Variables

Design tokens? All the colors and sizes?

## Interactions

## Accessibility

- [x] Find the matching component through WCAG's patterns: https://www.w3.org/WAI/ARIA/apg/patterns/
  - https://www.w3.org/WAI/ARIA/apg/patterns/toolbar.html
- [x] Are there any accessibility elements unique to this component?
- [x] List ARIA attributes
  - [x] role="toolbar" in FAST
  - [x] aria-orientation="vertical" in FAST
- [ ] Does the component support 400% zoom?
- [ ] What keyboard behaviors does the component support?
  - [ ] Tab : Moves focus to the next focusable element in the toolbar.
  - [ ] Shift + Tab : Moves focus to the previous focusable element in the toolbar.
  - [ ] Arrow keys : Moves focus to the next/previous focusable element in the toolbar.

## Preparation
