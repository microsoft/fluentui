# @fluentui/react-tags Spec

## Background

A tag is an object that represent an input, a filter, a category or an attribute. Tags should be used when representing an input, as a way to filter content, or to represent an attribute.

## Prior Art

- [Evergreen](https://evergreen.segment.com/components/badges)
- [Lightning](https://www.lightningdesignsystem.com/components/pills/)
- [Material UI](https://material-ui.com/components/chips/#chip)
- [OpenUI Research](https://github.com/WICG/open-ui/pull/259)

## Sample Code

_Provide some representative example code that uses the proposed API for the component_

## Variants

- Content
  - Basic with text
  - With icon
  - With image
  - With image and icon
  - With two lines of text
- Transforms
  - RTL
  - With truncation
- Size
  - Extra-small
  - Small
  - Medium (default)
- Shape
  - Rounded rectangle
  - Circle
- Style
  - Filled-darker
  - Filled-lighter
  - Tint
  - Outline
- States
  - rest
  - hover
  - hover dismiss
  - Focus
  - focus dismiss
  - pressed
  - pressed aismiss
  - disabled
  - checked
- Interactive
  - Dismissable
  - Draggable (user provided)
  - Menu (composed)
  - Right click (composed)

## Components

<Tag> A Tag </Tag>

## API

### Slots

- root: span
- content: span (primary)
  - image
  - icon
  - secondary ? (not sure on how to approach this yet)
- dismiss

### Props

Appearance

- size
- shape
- appearance
- disabled
- checked

Dismiss

- dismissable
- onDismiss

## Structure

(classes denote slot name other than root)

### Simple Tag

```tsx
<Tag>Simple Tag</Tag>
<Tag secondary="The secondary text">Simple Tag with secondary text</Tag>
<Tab as="li">Simple List Tag</Tag>
```

```html
<span> <span class="content"> Simple Tag </span></span>
<span>
  <span class="content"> Simple Tag <span class="secondary">The secondary text</span></span></span
>
<li><span class="content"> Simple Tag </span></li>
```

### Dismissable Tag

```tsx
<Tag dismissable>Simple Tag</Tag>
```

```html
<span>
  <span id="content" class="content"> Simple Tag </span>
  <button id="dismiss" class="dismiss" aria-label="remove" aria-labelledby="dismiss content" type="button">x</button>
</span>
```

### Tag with image

```tsx
<Tag image="https://foo.com/image.jpg"> Tag with image </Tag>
```

```html
<span>
  <span class="content">
    <span class="image" role="presentation" aria-hidden="true">
      <img alt />
    </span>
    Tag with image
  </span>
</span>
```

### Tag with icon

```tsx
<Tag image={<MyFluentIcon />}> Tag with icon </Tag>
```

```html
<span>
  <span class="content">
    <span role="presentation" aria-hidden="true">
      <svg></svg>
    </span>
    Tag with icon
  </span>
</span>
```

### Tag button

```tsx
<Tag as="button" onClick={handleClick}>
  {' '}
  Tag button
</Tag>
```

```html
<span>
  <button type="button" onClick="{handleClick}" class="content">Tag with button</button>
</span>
```

### Tag button as anchor

```tsx
<Tag as="a" href="#">
  Tag with link
</Tag>
```

```html
<span>
  <a href="#" class="content"> Tag with link </a>
</span>
```

### Toggleable Tag button

```tsx
<Tag as="button" onClick={toggleChecked} checked={checked}>
  Checked Tag
</Tag>
```

```html
<span>
  <button class="content" onClick="{toggleChecked}" aria-pressed="true" type="button">Toggleable Tag button</button>
</span>
```

### Dismissable Tag button

```tsx
<Tag as="button" dismissable onDismiss={handleDismiss}>
  Dismissable Tag button
</Tag>
```

```html
<span>
  <button id="content" type="button">Toggleable Tag button</button>
  <button id="dismiss" class="dismiss" aria-label="remove" aria-labelledby="dismiss action" type="button">x</button>
</span>
```

### Dismissable Tag button with custom dismiss icon

```tsx
<Tag as="button" onClick={handleClick} dismissable onDismiss={handleDismiss} dismiss={<MyDismissIcon />}>
  Dismissable Tag button
</Tag>
```

```html
<span>
  <button id="content" class="content" type="button">Dismissable Tag button with custom dismiss icon</button>
  <button id="dismiss" class="dismiss" aria-label="remove" aria-labelledby="dismiss action" type="button">
    <svg></svg>
  </button>
</span>
```

### Dismissable Tag with Menu on primary action

```tsx
<Menu>
  <MenuTrigger disableButtonEnhancement>
    <Tag dismissable>Tag menu and dismiss button</Tag>
  </MenuTrigger>
  <MenuPopover>
    <MenuList>
      <MenuItem>Item a</MenuItem>
      <MenuItem>Item b</MenuItem>
    </MenuList>
  </MenuPopover>
</Menu>
```

## Migration

_Describe what will need to be done to upgrade from the existing implementations:_

- _Migration from v8_

No equivalent component in v8

- _Migration from v0_

https://fluentsite.z22.web.core.windows.net/0.65.0/components/pill/definition

| v0         | v9             |
| ---------- | -------------- | -------------- |
| actionable | use Tag button |
| selectable | toggleable     | (might change) |
| selected   | toggled        |

## Behaviors

_Explain how the component will behave in use, including:_

Tag

- _Component States_
  - no changable internal state
- _Interaction_
  - _Keyboard_
    - Regular Tag (content as span) without dimiss is not focusable
    - Regular Tag with dismiss will have focusable dismiss button
    - Content slot can be focused if as button or anchor
      - If also dismissable, Tag is two tab stops
    - Pressing delete will call onDismiss if either button is focused
  - _Cursor_
    - Clicking on regular Tag will focus dismiss button
    - Clicking on dismiss will call onDismiss
  - _Touch_
    - Touching a regular tag will focus dismiss button if dismissable
    - Touching dismiss button will call onDismiss if dismissable
    - Touching Tag as button/anchor will call content's onClick
  - _Screen readers_

## Accessibility

TBD

## Not addressed yet

TagGroup
Multi/Single Select TagGroups
