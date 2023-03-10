# SliderLabel

## Description

A label element intended to be used with the Slider component. Ability to hide the mark or provide a custom label element is baked in.

## Design Spec

[Link to Design Spec in Figma](https://www.figma.com/file/IBCBJxEbPKS7CvLHG55Wn9/Slider?node-id=1639%3A12700&t=1cp8zLuAuXd8cLBk-11)

## Engineering Spec

### Inputs

- @attr position | number - The location of the label relative to the minimum and maximum values of the slider
- @attr hide-mark | boolean - Whether or not to hide the mark on the rail

### Slots

- label - replaceable with custom DOM element(s)

### CSS Parts

- label - how to style the label element by each label mark

## Accessibility

- [x] Find the matching component through WCAG's patterns: https://www.w3.org/WAI/ARIA/apg/patterns/
- [x] Are there any accessibility elements unique to this component?
  - No
- [x] Does the component support 400% zoom?

## Preparation

- [x] [Find the base FAST Component](https://explore.fast.design/components/) this component will inherit from and document
  - [Slider + SliderLabel Spec](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/slider/slider.spec.md)
- [x] [Check the Fluent UI React V9 Component Spec](https://github.com/microsoft/fluentui/tree/master/specs) for differences and document
  - [Link to Spec](https://github.com/microsoft/fluentui/blob/master/specs/Slider.md)
  - SliderLabel doesn't exist as an independent component in Fluent
- [x] [Fluent UI React V9 Storybook](https://aka.ms/fluentui-storybook) for implementation differences and document
  - [Link to Storybook Component](https://master--628d031b55e942004ac95df1.chromatic.com/?path=/docs/components-slider--default)
  - Fluent React SliderLabel doesn't allow the display of individual values on each tick mark on rail
  - Fluent React Slider only displays value of the labels on the ends of the rail
  - SliderLabel doesn't exist as an independent component in Fluent
- [x] [Open GitHub issues related to component](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#find-open-issues-on-github)
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
