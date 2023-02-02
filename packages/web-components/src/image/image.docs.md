# Fluent Image Component

## Component Description

Images, like photos and illustrations, help reinforce a message and express your product or app’s style.

## Design Spec

[Image Spec in Figma](https://www.figma.com/file/05wt6TAsEmgsCVZfPrpcWx/Image?t=uEvu1KnTefdTZHJC-6)

## Engineering Spec

### Inputs

**booleans**

- @attr public block: boolean | false
- @attr public border: boolean | false
- @attr public shadow: boolean | false
- @attr public margin: boolean | false

**options**

- @attr public borderRadius: 'small', 'medium', 'large' | 'x-large'
- @attr public fit: 'none' | 'center' | 'contain' | 'cover' | 'default'
- @attr public shape: 'square' | 'rounded' | 'circular'

**content**

- @attr public alt: string | Requires description if image role is not set to presentation.
- @attr public role: 'presentation' | null
- @attr public src: string

### Slots

None needed

## Accessibility

The image element requires an alt tag when not used in role: presentation.

## Preparation

This will extend the FASTElement.

[Fluent UI React V9 Image component](https://master--628d031b55e942004ac95df1.chromatic.com/?path=/docs/components-image--default)

- This appears to be indentical in terms of props.

Open GitHub issues related to Image component

- [Feature request](https://github.com/microsoft/fluentui/issues/26452)
- [Bug](https://github.com/microsoft/fluentui/issues/26399)

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
