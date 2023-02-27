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
- @attr public shadow: boolean | false

**options**

- @attr public fit: 'none' | 'center' | 'contain' | 'cover' | 'default'
- @attr public shape: 'square' | 'rounded' | 'circular'

### Slots

1 slot for developer to add <img/> element.

## Accessibility

The image element requires an alt tag when not used in role: presentation.

## Preparation

This will extend the FASTElement.

Open GitHub issues related to Image component

- [Feature request](https://github.com/microsoft/fluentui/issues/26452)
- [Bug](https://github.com/microsoft/fluentui/issues/26399)

## Implementation

### CSS Guidance

- [x] Uses design tokens for styling

An optional border-radius can be expressed using the following design tokens:

- borderRadiusSmall,
- borderRadiusMedium,
- borderRadiusLarge
- borderRadiusXLarge

An optional 16px margin can be added to the image to separate it from surrounding content.
