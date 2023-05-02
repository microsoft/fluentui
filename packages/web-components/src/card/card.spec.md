# Slider

## Component Description

A card is a container that holds information and actions related to a single concept or object, like a document or a contact.

## Design Spec

[Link to Design Spec in Figma](https://www.figma.com/file/berhUBA6mJV9sCPpjgfKRj/Card?node-id=1520-2077&t=65kUw9Qr7VEhg1ra-11)

## Engineering Spec

### Inputs

- @attr size: "small" "medium" "large" | "medium"
- @attr orientation: "horizontal" "vertical" | "vertical"
- @attr appearance: "filled" "filled-alternative" "outline" "subtle" | "filled"

### Outputs

None

### Events

- None yet

### Slots

- default: the focal point of the card, its body
- header: The header area of a card, which represents a Fluent UI compliant card header
- footer: The footer area of a card, which represents a Fluent UI compliant card footer. Uses a flex layout to organize actions the user can take with a card.
- preview: Used inside of a card and allows the user to better visualize what the card's contents are

### CSS Variables

None

### Interactions

- None yet
- Will be adding the ability to select a card via an internal checkbox that renders when the card is set to selectable

## Accessibility

- [x] Find the matching component through WCAG's patterns: https://www.w3.org/WAI/ARIA/apg/patterns/
  - https://www.w3.org/WAI/ARIA/apg/patterns/slider/
- [x] Are there any accessibility elements unique to this component?
  - [x] No
- [x] Does the component support 400% zoom?
  - [x] Yes
- [x] What keyboard behaviors does the component support?
  - None yet, possibly some with selection

## Preparation

- [x] [Find the base FAST Component](https://explore.fast.design/components/) this component will inherit from and document
  - [FAST Card Component](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/card/card.spec.md)
- [x] [Check the Fluent UI React V9 Component Spec](https://github.com/microsoft/fluentui/tree/master/specs) for differences and document
  - No Fluent UI React spec
  - Initial implementation will not be selectable
  - No checkbox, selected, defaultSelected attributes
- [x] [Fluent UI React V9 Storybook](https://aka.ms/fluentui-storybook) for implementation differences and document
  - [Fluent React V9 Card](https://master--628d031b55e942004ac95df1.chromatic.com/?path=/docs/components-card-card--default)
- [x] [Open GitHub issues related to component](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#find-open-issues-on-github)
  - [Card](https://github.com/microsoft/fluentui/issues/26719)
- [x] (Optional) [Draft implementation](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#draft-implementation)
  - [link to draft implementation, if applicable]
- [x] [Component Spec authored](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#component-spec)
  - [ ] And [reviewed](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#spec-review)

## Implementation

- [ ] Initial conformance and unit tests (validate basic functionality)
- [ ] [Initial documentation](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#documentation)
  - [ ] [Storybook stories](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#storybook-stories)
  - [ ] README.md covering basic usage
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
  - [ ] Review and add any missing Storybook stories
  - [ ] Finalize migration guide
  - [ ] In package.json: Remove the alpha/beta tag from the version number in package.json
  - [ ] In package.json: Change beachball's `disallowedChangeTypes` to `"major", "prerelease"`
