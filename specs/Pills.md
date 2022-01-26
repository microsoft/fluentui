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
export interface PillGroupProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<PillGroupBehaviorProps>;
}

export interface PillProps extends UIComponentProps, ContentComponentProps<ShorthandValue<BoxProps>> {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<PillBehaviorProps>;

  /**
   * A Pill can be sized.
   */
  size?: Extract<SizeValue, 'smaller' | 'small' | 'medium'>;

  /**
   * A Pill can be rectangular
   */
  rectangular?: boolean;

  /**
   * A Pill can be filled, inverted or outline
   */
  appearance?: 'filled' | 'inverted' | 'outline';

  /**
   * A Pill can be disbled
   */
  disabled?: boolean;

  /**
   * A Pill can be actionable
   */
  actionable?: boolean;

  /**
   * A PillAction shorthand for the action slot.
   */
  action?: ShorthandValue<PillActionProps>;

  /**
   * A PillAction shorthand for the action slot.
   */
  icon?: ShorthandValue<PillIconProps>;

  /**
   * A PillImage shorthand for the image slot.
   */
  image?: ShorthandValue<PillImageProps>;

  /**
   * Called after user will dismiss the Pill.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onDismiss?: ComponentEventHandler<PillProps>;

  /**
   * A Pill can be selectable
   */
  selectable?: boolean;

  /**
   * A Pill state for selection
   */
  selected?: boolean;

  /**
   * A Pill can be selected by default
   */
  defaultSelected?: boolean;

  /**
   * A Pill can have custom selected indicator
   */
  selectedIndicator?: ShorthandValue<PillIconProps>;

  /**
   * Called after user change selected state
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onSelectionChange?: ComponentEventHandler<PillProps>;
}
```

## Structure

- _**Public**_

```jsx
<Pill />

<Pill actionable />

<Pills>
  <Pill />
</Pills>
```

- _**DOM**_

```html
<span> ... </span>

<span role="button"> ... </span>

<div role="listbox">
  <span role="option"> ... </span>
</div>
```

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
