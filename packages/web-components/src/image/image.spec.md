# Fluent Image Component

## Component Description

Images, like photos and illustrations, help reinforce a message and express your product or app’s style.

## Design Spec

[Image Spec in Figma](https://www.figma.com/file/05wt6TAsEmgsCVZfPrpcWx/Image?t=uEvu1KnTefdTZHJC-6)

## Engineering Spec

### Inputs

**content**

- @attr public alt: string | Requires description if image role is not set to presentation.
- @attr public role: string
- @attr public src: string

**booleans**

- @attr public block: boolean | false
- @attr public border: boolean | false
- @attr public margin: boolean | false
- @attr public shadow: boolean | false

**options**

- @attr public border-radius: 'small' | 'medium' | 'large' | 'x-large'
- @attr public fit: 'none' | 'center' | 'contain' | 'cover' | 'default'
- @attr public shape: 'square' | 'rounded' | 'circular'

### Slots

1 slot for developer to add <img/> element.

## Accessibility

The image element requires an alt tag when not used in role: presentation.

## Preparation

This will extend the FASTElement.

This appears to be indentical to the [Fluent UI React V9 Image component](https://master--628d031b55e942004ac95df1.chromatic.com/?path=/docs/components-image--default) in terms of props except for the following:

margin: optional 16px margin

However, when looking at the [component code](https://github.com/microsoft/fluentui/blob/master/packages/react/src/components/Image), they differ significantly.

Open GitHub issues related to Image component

- [Feature request](https://github.com/microsoft/fluentui/issues/26452)
- [Bug](https://github.com/microsoft/fluentui/issues/26399)

## Implementation

- [?] README.md covering basic usage

- [x] Uses design tokens for styling
- [?] Renders correctly in High Contrast mode
