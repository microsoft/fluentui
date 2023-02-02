# Menu & Menu Item

A popup or contextual menu displays a list of options on a temporary surface. They are invoked when users interact with a button, action, or other control.

## Design Spec

[Link to Menu Design Spec in Figma](https://www.figma.com/file/jFWrkFq61GDdOhPlsz6AtX/Menu?node-id=1528%3A5102&t=XtW4laeEzgVFIl1E-0)

## Engineering Spec

Fluent WC3 Menu extends from the FAST Menu [FAST Menu](https://explore.fast.design/components/fast-menu) and is intended to be as close to the Fluent UI React 9 Menu implementation as possible. However, due to the nature of web components there will not be 100% parity between the two.

<hr />
<br />

### **Menu**

### Inputs

- extends HTML Element attributes

### Outputs

- none

### Events

- none

### Slots

- default slot for items

### CSS Variables

<br />
<hr />
<br />

### **Menu Item**

### Inputs

- role - an enum representing the menu items' role
  - menuitem
  - menuitemcheckbox
  - menuitemradio
- disabled - the menu item is disabled
- checked - sets the checked value for menuitemcheckbox or menuitemradio items

### Outputs

- none

### Events

- click (event) - event for when the item has been clicked or invoked via keyboard
- change (event) - event for when the item has been clicked or invoked via keyboard, and will be prevented if the menu item is disabled
- expanded-change (event) - event for when the item has been expanded or collapsed

### Slots

- before - slot which precedes content
- default - slot for the content (the default slot for the item)
- after - slot which comes after content
- submenu - the slot used to generate a submenu
- radio-indicator - slot for radio item selection indicator
- checkbox-indicator - slot for the checkbox selection indicator
- expand-collapse-glyph - slot for the expand/collapse glyph for nested menus

### CSS Variables

<hr />

## Accessibility

- [ ] Find the matching component through WCAG's patterns: https://www.w3.org/WAI/ARIA/apg/patterns/https://www.w3.org/WAI/ARIA/apg/patterns/
- [ ] Are there any accessibility elements unique to this component?
- [ ] List ARIA attributes
  - [ ] ARIA attribute
- [ ] Does the component support 400% zoom?

## Preparation

- [x] [Find the base FAST Component](https://explore.fast.design/components/fast-accordion) this component will inherit from and document
  - [FAST Component]()
- [x] [Check the Fluent UI React V9 Component Spec](https://github.com/microsoft/fluentui/tree/master/specs) for differences and document
  - No spec available
- [x] [Fluent UI React V9 Storybook](https://aka.ms/fluentui-storybook) for implementation differences and document

  - To reserve slots for icons and checkmarks in the React implementation the user must pass `true` through the `hasCheckmarks` and `hasIcons` props on the Menu parent. The fast implementation makes these slots always available.
  - In FuiR9 default checked items are passed through the `defaultCheckedValues` prop on the parent Menu component. In the FAST implementation default checked items are set on each Menu Item component.
  - Icons
    - Ic

- [ ] [Open GitHub issues related to component](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#find-open-issues-on-github)
  - [link to each issue]
- [ ] (Optional) [Draft implementation](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#draft-implementation)
  - [link to draft implementation, if applicable]
- [ ] [Component Spec authored](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#component-spec) and [reviewed](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#spec-review)

## Implementation

- [ ] Initial conformance and unit tests (validate basic functionality)
- [ ] [Initial documentation](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#documentation)
  - [ ] [Storybook stories](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#storybook-stories)
  - [ ] README.md covering basic usage
- [ ] [Component released as unstable](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#unstable-release) from `@fluentui/web-components/unstable`
- [ ] Uses design tokens for styling
- [ ] Renders correctly in High Contrast mode

## Validation

- [ ] [Add tests](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#tests)
  - [ ] Unit and conformance tests
  - [ ] Bundle size fixtures
  - [ ] Performance test scenario
  - [ ] Accessibility behavior tests
  - [ ] Create an issue and run [manual accessibility tests](https://github.com/microsoft/fluentui/wiki/Manual-Accessibility-Review-Checklist): [link to issue]
- [ ] [Validate with partners](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#validation)
- [ ] [Finalize documentation](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#finalize-documentation)
  - [ ] Review and add any missing storybook stories
  - [ ] Finalize migration guide
  - [ ] In package.json: Remove the alpha/beta tag from the version number in package.json
  - [ ] In package.json: Change beachball's `disallowedChangeTypes` to `"major", "prerelease"`
