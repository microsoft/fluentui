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
  - Rest
  - Hover
  - HoverDismiss
  - Focus
  - FocusDismiss
  - Pressed
  - PressedDismiss
  - Toggled
  - Disabled
- Interactive
  - Togglable
  - Dismissable
  - Draggable (user provided)
  - Menu (composed)
  - Right click (composed)

## Components

<Tag> A Tag </Tag>
<TagButton> Click Me </TagButton>

## API

### Slots

#### Tag

- root : span
- image
- dismiss

#### TagButton

- root : span, takes action props due to primary slot
- image
- action (primary)
- dismiss

### Props

#### Shared

Appearance

- size
- shape
- appearance
- disabled

Dismiss

- dismissable
- onDismiss

#### TagButton

Toggle (or checked)

- toggleable: boolean
- defaultToggled: boolean
- toggled: boolean
- onToggle: function

## Structure

### Simple Tag

```tsx
<Tag>Simple Tag</Tag>
<Tab as="li">Simple List Tag</Tag>
```

```html
<span>Simple Tag</span>
<li>Simple Tag</li>
```

### Tag with image

```tsx
<Tag image="https://foo.com/image.jpg"> Tag with image </Tag>
```

```html
<span>
  <span role="presentation" aria-hidden="true"><img alt /></span>
  Tag with image
</span>
```

### Tag with icon

```tsx
<Tag image={<MyFluentIcon />}> Tag with icon </Tag>
```

```html
<span>
  <span role="presentation" aria-hidden="true"><svg /></span>
  Tag with icon
</span>
```

### TagButton

```tsx
<TagButton onClick={handleClick}> Tag button</Tag>
```

```html
<span><button type="button">Tag with button</button></span>
```

### TagButton as anchor

```tsx
 <TagButton as="a" href="#">Tag with link</Tag>
```

```html
<span><a href="#">Tag with link</a></span>
```

### Toggleable TagButton

```tsx
 <TagButton toggleable defaultToggled={true}>Uncontrolled toggle tag</Tag>
 <TagButton toggled={isToggled} onToggle={handleToggle} >Controlled toggle tag</Tag>
```

```html
<span><button aria-pressed="true" type="button">Toggleable TagButton</button></span>
```

### Dismissable TagButton

```tsx
 <TagButton dismissable onDismiss={handleDismiss}>Dismissable TagButton</Tag>
```

```html
<span>
  <button id="action" type="button">Toggleable TagButton</button>
  <button id="dismiss" aria-label="remove" aria-labelledby="dismiss action" type="button">x</button>
</span>
```

### Dismissable TagButton with custom dismiss icon

```tsx
 <TagButton
  onClick={handleClick}
  dismissable
  onDismiss={handleDismiss}
  dismiss={<MyDismissIcon/>}
  >
    Dismissable TagButton
  </Tag>
```

```html
<span
  ><button type="button">Dismissable TagButton with custom dismiss icon</button><button type="button"><svg /></button
></span>
```

### Dismissable Tag with Menu on primary action

```tsx
<Menu>
  <MenuTrigger disableButtonEnhancement>
    <TagButton dismissable>Tag menu and dismiss button</Tag>
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

| v0         | v9            |
| ---------- | ------------- | -------------- |
| actionable | use TagButton |
| selectable | toggleable    | (might change) |
| selected   | toggled       |

## Behaviors

_Explain how the component will behave in use, including:_

Tag

- _Component States_
  - no changable states
- _Interaction_
  - _Keyboard_
    - Tag can be focused if dismissable
    - Pressing enter or delete will call onDismiss if dismissable
  - _Cursor_
    - Clicking on tag will focus dismiss button
    - Clicking on dismiss will call onDismiss
  - _Touch_
    - Touching the tag will focus dismiss button if dismissable
    - Touching dismiss button will call onDismiss if dismissable
  - _Screen readers_

TagButton

- _Component States_
  - Toggleable TagButtons can be switched between toggled true and false
- _Interaction_
  - _Keyboard_
    - TagButtons are always tab stops
    - If dismissable, both primary action and dismiss action are seperate tab stops
  - _Cursor_
    - Action and dismiss slots have individual hover/pressed styles and perform different actions
  - _Touch_
    - Same as cursor
  - _Screen readers_

## Accessibility

TBD

## Not addressed yet

TagGroup
Multi/Single Select TagGroups
