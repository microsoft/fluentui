# Slider

## Component Description

The Slider component allows users to quickly select a value by dragging an icon across a bar. It is often used when setting values with a relaxed precision such as audio volume and screen brightness.

## Design Spec

[Link to Design Spec in Figma](https://www.figma.com/file/IBCBJxEbPKS7CvLHG55Wn9/Slider?node-id=513%3A510&t=hCOhOiQJVCVNVVJP-0)

## Engineering Spec

### Inputs

- [List all inputs into the component]
- [e.g. @attr public paused: boolean | false]
- @attr size: "small" "medium" | "medium"
- @attr vertical: boolean | false
- @attr value: number
- @attr min: number
- @attr max: number
- @attr step: number
  - If set, slider appearance has ticks for each step value
- @attr default-value: number
- @attr disabled: boolean | false
- @attr step:number | 1
- @attr mode: "single-value" "range" | "single-value"

### Outputs

None

### Events

- @onChange

### Slots

- default: the primary slot intended for the `input` element
- thumb: the draggable element of the slider
- lower-thumb: same as `thumb`, but used in `range` mode
- upper-thumb: same as `thumb`, but used in `range` mode
- track: the slider's base and used to display the min/max selectable values
- progress-track: the progress indicator when in `range` mode

### CSS Variables

None

### Interactions

#### thumb

- On :hover a tooltip appears indicating the current value of the slider

#### track

- Clicking on the track moves the thumb to the location of mouse click

## Accessibility

- [x] Find the matching component through WCAG's patterns: https://www.w3.org/WAI/ARIA/apg/patterns/
  - https://www.w3.org/WAI/ARIA/apg/patterns/slider/
- [x] Are there any accessibility elements unique to this component?
- [x] List ARIA attributes
  - [ ] role="slider" in FAST
  - [ ] aria-valuenow in FAST
  - [ ] aria-valuemin in FAST
  - [ ] aria-valuemax in FAST
  - [ ] aria-orientation (if vertical) in FAST
- [ ] Does the component support 400% zoom?
- [ ] What keyboard behaviors does the component support?
  - [ ] Up / Right : Increments slider by Step amount
  - [ ] Down / Left: Decrements slider by Step amount
  - [ ] PageUp/Up/Right & Shift : Increments the value of the slider by 10 \_ step.
  - [ ] PageDown /Down/Left & Shift : Decrements the value of the slider by 10 \_ step.
  - [ ] Home : Sets value to the min prop.
  - [ ] End : Sets value to the max prop.

## Preparation

- [x] [Find the base FAST Component](https://explore.fast.design/components/) this component will inherit from and document
  - [FAST Component](https://explore.fast.design/components/fast-slider)
- [ ] [Check the Fluent UI React V9 Component Spec](https://github.com/microsoft/fluentui/tree/master/specs) for differences and document
  - [Fluent Slider Spec](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-slider/docs/Spec.md)
  - no `defaultValue` attribute, instead only `value` that specifies the initial selected range of the slider
  - `rail` renamed to `track`
  - No value indicators to the left/right of slider in FAST. These should be present in Fluent version.
- [x] [Fluent UI React V9 Storybook](https://aka.ms/fluentui-storybook) for implementation differences and document
  - [Fluent React V9 Slider](https://master--628d031b55e942004ac95df1.chromatic.com/?path=/docs/components-slider--default)
- [x] [Open GitHub issues related to component](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#find-open-issues-on-github)
  - [Slider](https://master--628d031b55e942004ac95df1.chromatic.com/?path=/docs/components-slider--default)
- [ ] (Optional) [Draft implementation](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#draft-implementation)
  - [link to draft implementation, if applicable]
- [x] [Component Spec authored](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#component-spec)
- [ ] And [reviewed](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#spec-review)

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
  - [ ] Review and add any missing Storybook stories
  - [ ] Finalize migration guide
  - [ ] In package.json: Remove the alpha/beta tag from the version number in package.json
  - [ ] In package.json: Change beachball's `disallowedChangeTypes` to `"major", "prerelease"`
