# @fluentui/react-tags Spec

## Background

The `@fluentui/react-tags` component is designed to allow users to visualize, interact with, and manage multiple tags. It is useful in scenarios such as selecting multiple options from a list, categorizing items, or adding metadata.

## Prior Art

[Open UI #726](https://github.com/openui/open-ui/pull/726)
[#26001](https://github.com/microsoft/fluentui/issues/26001)

## Sample Code

```jsx
<Tag>Content</Tag>

<InteractionTag>
  <InteractionTagPrimary>Content</InteractionTagPrimary>
</InteractionTag>

<TagGroup>
  <Tag>Tag 1</Tag>
  <Tag>Tag 2</Tag>
  <Tag>Tag 3</Tag>
</TagGroup>
```

## Variants

### Appearance

- appearance="filled": default appearance.
- appearance="outline": the tag is emphasized through the styling of its content and borders.
- appearance="brand": the component is styled with brand tokens.

### Shape

- shape="rounded": default shape. The component has rounded corners.
- shape="circular": The component has completely round corners.

### Sizes

Three different sizes are supported: `medium` (default), `small` and `extra-small`.

## API

[Tag.type.ts](../src/components/Tag/Tag.types.ts)
[InteractionTag.type.ts](../src/components/InteractionTag/InteractionTag.types.ts)
[TagGroup.type.ts](../src/components/TagGroup/TagGroup.types.ts)

## Structure

### Tag Structure

```tsx
// without dismiss icon
<span>
  <span>{iconOrMedia}</span>
  <span>{primaryText}</span>
  <span>{secondaryText}</span>
</span>

// with dismiss icon
<button>
  <span>{iconOrMedia}</span>
  <span>{primaryText}</span>
  <span>{secondaryText}</span>
  <span>{dismissIcon}</span>
</button>
```

### InteractionTag Structure

```tsx
<div>
  <button>
    <span>{iconOrMedia}</span>
    <span>{primaryText}</span>
    <span>{secondaryText}</span>
  </button>
  <button>{dismissIcon}</button>
</div>
```

### TagGroup Structure

TagGroup is a simple div wrapper around the children.

## Migration

### Migrate from V0 Pill component

Property mapping:

| v0 Pill      | v9 Tag                                    |
| ------------ | ----------------------------------------- |
| `action`     | use `InteractionTag`                      |
| `appearance` | `appearance`                              |
| `content`    | `children`                                |
| `disabled`   | `disabled`                                |
| `icon`       | `icon`                                    |
| `image`      | `media`                                   |
| `onDismiss`  | wrap with `<TagGroup onDismiss={handler}` |
| `size`       | `size`                                    |

V0 Pill can be selectable, but v9 Tag is not selectable. A Picker component is planned to incorporate the selection behavior.

## Behaviors

### States

Tag/InteractionTag has enabled/disabled states. The enabled states changes styling on hover and press.

Note that on hover, Tag only changes styling on the dismiss icon. InteractionTag changes styling on the entire component.

### Keyboard Interaction

A Tag without a dismiss icon is not focusable. A Tag with a dismiss icon is focusable.

InteractionTag is one button when it's not dismissible. And a dismissible InteractionTag has two focus stops, on its primary button and on its secondary button.

TagGroup wraps multiple Tag/InteractionTag and applies arrow navigation.

#### Keyboard Interaction for dismiss

When TagGroup contains a collection of Tag/InteractionTag that can be dismissed, the dismiss happens on <kbd>Space</kbd>, <kbd>Enter</kbd>, <kbd>BackSpace</kbd> or <kbd>Delete</kbd> key.
When a Tag is dismissed, focus moves to the next Tag. If there's no next focusable Tag, focus moves on the previous Tag.

## Accessibility

Dismissible Tag should have `role='img'` on its dismissIcon slot. `aria-label` is required to provide information to screen readers about the dismiss action.

Dismissible InteractionTag are composed of two buttons. Therefore it should have two focus stop. `aria-label` is required to provide information to screen readers about the dismiss action. By default InteractionTag has `aria-labelledby` attribute combining the id values from both the InteractionTagPrimary and InteractionTagSecondary components, allowing the accessible name to be computed from both.

By default TagGroup has `role='listbox'` and `role='option'` for its children. But when using `TagGroup` with non-actionable `Tag` (i.e. `Tag` without dismiss icon), `TagGroup` should be set to `list` role, and each `Tag` should have the `listitem` role.
