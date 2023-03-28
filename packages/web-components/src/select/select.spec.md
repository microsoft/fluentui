# Select

## Component Description

Select is a list in which the selected item is always visible while other items are visible on demand by clicking a dropdown button.

Select uses the browser native for the options list. Use a Select when the user can only select one option and there is no need for formatted text.

## Design Spec

[Link to Design Spec in Figma](https://www.figma.com/file/0vOH481cv1VQyfQIX9JALn/Select?node-id=1319-163&t=nn2xgT4ieHjbkqQW-11)

## Engineering Spec

### Inputs

- @attr appearance: "outline" "underline" "filled-darker" "filled-lighter" | "outline"
- @attr size: "small" "medium" "large" | "medium"
-

### Outputs

None

### Events

- @change: Called when the user changes the select element's value by selecting an option

### Slots

- default: the list of options, either `<option>` or elements with the `option` role
- icon: the icon, typically a down arrow

### CSS Variables

None

## Accessibility

- [x] Find the matching component through WCAG's patterns: https://www.w3.org/WAI/ARIA/apg/patterns/
  - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
- [x] Are there any accessibility elements unique to this component?
- [x] List ARIA attributes
  - [x] role="option" for elements that are not `option` elements
- [x] Does the component support 400% zoom?
- [ ] What keyboard behaviors does the component support?
  - [ ] Up / Down to choose value
  - [ ] Enter to select chosen value

## Preparation

- [x] [Find the base FAST Component](https://explore.fast.design/components/) this component will inherit from and document
  - [FAST Select Component](https://explore.fast.design/components/fast-select)
- [] [Check the Fluent UI React V9 Component Spec](https://github.com/microsoft/fluentui/tree/master/specs) for differences and document
  - No spec available
- [x] [Fluent UI React V9 Storybook](https://aka.ms/fluentui-storybook) for implementation differences and document
  - [Fluent React V9 Select](https://master--628d031b55e942004ac95df1.chromatic.com/?path=/docs/components-select--default)
  - Differences
    - FAST Select has an `indicator` slot that is named `icon` in Fluent Select
    - FAST Select has a few slots that aren't present in the Fluent Select
      - No `start` slot for the an icon prepending the control
      - No `end` slot for an icon appending the control
- [x] [Open GitHub issues related to component](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#find-open-issues-on-github)
  - [Select](https://github.com/orgs/microsoft/projects/652/views/2?pane=issue&itemId=18315933)
- [ ] (Optional) [Draft implementation](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#draft-implementation)
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
