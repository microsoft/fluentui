# [Pills]()

## Background

Pills should be used when representing an input, as a way to filter content, or to represent an attribute.

## Prior Art

- [Evergreen](https://evergreen.segment.com/components/badge-and-pill/)
- [Lightning](https://www.lightningdesignsystem.com/components/pills/)
- [Material UI](https://material-ui.com/components/chips/#chip)
- [OpenUI Research](https://github.com/WICG/open-ui/pull/259)

## Sample Code

```jsx
<Pill>Item 1</Pill>
<Pill clickable>Item 2</Pill>
<Pills><Pill>Item 1</Pill></Pills>
<TogglePill>On</TogglePill>
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

export interface Pills extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /** Object with callbacks for generating announcements for item selection and removal. */
  getA11ySelectionMessage?: {
    /**
     * Callback that creates custom accessibility message a screen reader narrates on item added to selection.
     * @param item - Pill added element.
     */
    onAdd?: (item: ShorthandValue<PillProps>) => string;
    /**
     * Callback that creates custom accessibility message a screen reader narrates on item removed from selection.
     * @param item - Pill removed element.
     */
    onRemove?: (item: ShorthandValue<PillProps>) => string;
  };

  /** A label for selected items listbox. */
  a11ySelectedItemsMessage?: string;

  /**
   * Callback that provides status announcement message with number of items in the list, using Arrow Up/Down keys to navigate through them and, if multiple, using Arrow Left/Right to navigate through selected items.
   */
  getA11yStatusMessage?: () => string;
}

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

  /** A Pill can be clickable */
  actionable?: boolean;

  /** A callback to be called when Pill is clicked */
  onClick?: function;

  /**
   * A button shorthand for the dismiss action slot. To use this slot the pill should be
   * dismissible.
   */
  dismissIcon?: ShorthandProps<HTMLElement>;
}

export type TogglePillProps = Omit<PillProps, 'actionable'>;
```

## Structure

- _**Public**_

```jsx
<Pill />

<Pill actionable />

<Pills>
  <Pill />
</Pills>

<TogglePill />
```

- _**DOM**_

```html
<span>
  ...
</span>

<span role="button">
  ...
</span>

<div role="listbox">
  <span role="option">
    ...
  </span>
</div>

<span role="switch" aria-checked>
  ...
</span>
```

## Migration

- _Migration from v8_

There's no components related to `Pill` in V8

- _Migration from v0_

`Dropdown` component should use `Pills` over `DropdownSelectedItem`.

### Pill with dismiss

#### Accessibility

- Tab key to set focus on the Pill
- Arrow keys navigates between `Pill`
- Esc key dismiss the `Pill`

#### Keyboard Navigation

| key                | state    | title                                                                         |
| ------------------ | -------- | ----------------------------------------------------------------------------- |
| left/right/up/down | OnFocus  | Role “button” or "option", aria-describedby=”Press enter or delete to remove” |
| Delete/Backspace   | OnDelete | The pill is removed since there is only one primary action                    |
| Backspace/Ctrl + X | OnDelete | Backspace/Ctrl + X                                                            |

### Pill with popup

#### Accessibility

- Popup opens after Xms of mouse hover state
- Clicking in the Pill open popup and clicking outside should dimiss it

#### Keyboard Navigation

| key                | state    | title                                                                   |
| ------------------ | -------- | ----------------------------------------------------------------------- |
| left/right/up/down | OnFocus  | Role "button" or "option", aria-label=”Press enter or delete to remove” |
| Esc                | OnFocus  | Dismis popup                                                            |
| Enter/Space        | OnFocus  | Open Popup                                                              |
| Backspace/Ctrl + X | OnDelete | Backspace/Ctrl + X                                                      |

### Pill with right click (invoking context menu)

#### Accessibility

- Right click anywhere on pill surface invokes content menu. Context menu appears close to cursor location on pill
- Clicking or tapping anywhere outside of menu to dismiss

#### Keyboard Navigation

| key       | state   | title               |
| --------- | ------- | ------------------- |
| Esc       | OnFocus | Dismis context menu |
| Shift+F10 | OnFocus | Open context menu   |

### Pill with toggle

#### Accessibility

- Click toggles Pill's selected state

#### Keyboard Navigation

| key         | state   | title                 |
| ----------- | ------- | --------------------- |
| Enter/Space | OnFocus | Toggle selected state |
