# [Pills]()

## Background

PIlls should be used when representing an input, as a way to filter content, or to represent an attribute.

## Prior Art

- [Evergreen](https://evergreen.segment.com/components/badge-and-pill/)
- [Lightning](https://www.lightningdesignsystem.com/components/pills/)
- [OpenUI Research]()

## Sample Code

```jsx
<Pills>
  <Pill>Item 1</Pill>
  <Pill>Item 2</Pill>
</Pills>
```

## Variants

- Shape: `circular`, `rounded`
- Size: `smaller`, `small`, `medium`
- Appearance: `Filled Grey (filled)`, `Filled White (inverted)`, `Outline`

## PROPS

```typescript
export type PillShape = 'rounded' | 'circular';

export type PillAppearence = 'filled' | 'inverted' | 'outline';

export type SizeValue = 'smaller' | 'small' | 'medium';

export interface PillProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * A Pill can be sized.
   */
  size?: SizeValue;

  /**
   * A Pill can be circular or rounded
   */
  shape?: PillShape;

  /**
   * A Pill can be filled, inverted or outline
   */
  appearance?: PillVariant;

  /**
   * Media slot
   */
  media?: ShorthandProps<HTMLElement>;

  /**
   * Details that will appear as second line
   */
  details?: ShorthandProps<HTMLElement>;

  /** A Pill can be dismissible. */
  dismissible?: boolean;

  /** A Pill can be disabled. */
  disabled?: boolean;

  /** A Pill can be selected. */
  selected?: boolean;

  /** A Pill can be draggable  */
  draggable?: boolean;

  /**
   * A button shorthand for the dismiss action slot. To use this slot the pill should be
   * dismissible.
   */
  dismissAction?: ShorthandValue<AlertDismissActionProps>;
}
```

## Structure

- _**Public**_

```jsx
<Pills>
  <Pill />
</Pills>
```

- _**Internal**_

```jsx
<ElementType >
  <li>
    <span>
      {children}
    </span>
  <li>
</ElementType>
```

- _**DOM**_

```html
<div role="list" aria-label>
  <li role="presentation">
    <span role="button">
      ...
    </span>
  </li>
</div>
```

## Migration

- _Migration from v8_

...

- _Migration from v0_

`Dropdown` component should use `Pills` over `DropdownSelectedItem`.

### Pill with dismiss

#### Accessibility

- Each pill is of role="button"
- Tab key to set focus on the Pill
- Tab key moves focus to next `Pill`
- Esc key dismiss the `Pill`

#### Keyboard Navigation

| key                | state    | title                                                              |
| ------------------ | -------- | ------------------------------------------------------------------ |
| left/right         | OnFocus  | Role= “button”, aria-describedby=”Press enter or delete to remove” |
| Enter/Delete       | OnDelete | The pill is removed since there is only one primary action         |
| Backspace/Ctrl + X | OnDelete | Backspace/Ctrl + X                                                 |

### Pill with popup

#### Accessibility

- Each pill is of role="button"
- Popup opens after 500ms of mouse hover state
- Clicking in the Pill open popup and clicking outside should dimiss it

#### Keyboard Navigation

| key                | state    | title                                                              |
| ------------------ | -------- | ------------------------------------------------------------------ |
| Esc                | OnFocus  | Dismis popup                                                       |
| Enter              | OnFocus  | Open Popup                                                         |
| Backspace/Ctrl + X | OnDelete | Backspace/Ctrl + X                                                 |
| left/right         | OnFocus  | Role= “button”, aria-describedby=”Press enter or delete to remove” |

### Pill with right click (invoking context menu)

#### Accessibility

- Each pill is of role="button"
- Right click anywhere on card surface invokes content menu. Context menu appears close to cursor location on card
- Clicking or tapping anywhere outside of menu to dismiss

#### Keyboard Navigation

| key       | state    | title                          |
| --------- | -------- | ------------------------------ |
| Esc       | OnFocus  | Dismis context menu            |
| Shift+F10 | OnFocus  | Open context menu              |
| up/down   | Expanded | Navigates context menu options |

### Pill with toggle

#### Accessibility

- Each pill is of role="button"
- Click toggles Pill's selected state

#### Keyboard Navigation

| key   | state   | title                 |
| ----- | ------- | --------------------- |
| Enter | OnFocus | Toggle selected state |
