# @fluentui/react-tags

**React Tags components for [Fluent UI React](https://react.fluentui.dev/)**

- `Tag` provides visual representation of an attribute, person or asset.
- `InteractionTag` follows the same characteristics as `Tag`, but with the added functionality of having a primary interaction.
- `TagGroup` is used to group multiple tags together.

## Usage

To import Tag:

```js
import { Tag, TagGroup, InteractionTag } from '@fluentui/react-components';
```

### Examples

### Tag

```jsx
// basic
<Tag>Content</Tag>
// with icon
<Tag icon={<SVGIcon />}>Content</Tag>
// different appearance
<Tag appearance='outlined'>Content</Tag>
// with dismiss icon
<Tag dismissible>Content</Tag>
// different size
<Tag size="small">Content</Tag>
```

### InteractionTag

```jsx
// basic
<InteractionTag>
  <InteractionTagPrimary>Content</InteractionTagPrimary>
</InteractionTag>

// with icon
<InteractionTag>
  <InteractionTagPrimary icon={<SVGIcon />}>Content</InteractionTagPrimary>
</InteractionTag>

// different appearance
<InteractionTag appearance="outlined">
  <InteractionTagPrimary>Content</InteractionTagPrimary>
</InteractionTag>

// with secondary action
<InteractionTag>
  <InteractionTagPrimary hasSecondaryAction>Content</InteractionTagPrimary>
  <InteractionTagSecondary />
</InteractionTag>

// different size
<InteractionTag size="small">
  <InteractionTagPrimary>Content</InteractionTagPrimary>
</InteractionTag>
```

### TagGroup

```jsx
<TagGroup>
  <Tag>Tag 1</Tag>
  <Tag>Tag 2</Tag>
  <Tag>Tag 3</Tag>
</TagGroup>
```
