# [Badge](https://github.com/microsoft/fluentui/issues/16925)

## Background

A badge is an additional visual descriptor for UI elements. It can be used to denote numerical value, status or general information.

## Prior Art

- [OpenUI Research](https://open-ui.org/components/badge.research)

## Sample Code

```jsx
  <Badge>
    My Custom Badge
  </Badge>
  <Badge
    style={{ position: 'absolute', top: -4, right: -4 }}
  />
```

## Variants

`Badge` can have several variations.

- Appearance: `default`, `rounded` and `circular`
- Size: `smallest`, `smaller`, `small`, `medium`, `large`, `larger`.
- Styles: `filled`, `outline`, `ghost`, `tint`, `inverted filled`

## PROPS

```typescript
type BadgeAppearance = 'filled' | 'outline' | 'ghost' | 'tint';

type BadgeShape = 'rounded' | 'square' | 'circular';

type BadgeSize = 'smallest' | 'smaller' | 'small' | 'medium' | 'large' | 'larger' | 'largest';

interface BadgeProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * A Badge can be sized.
   */
  size?: BadgeSize;

  /**
   * A Badge can be square, circular or rounded
   */
  shape?: BadgeShape;

  /**
   * A Badge can be filled, outline, ghost, inverted
   */
  appearance?: BadgeAppearance;

  /**
   * Icon slot
   */
  icon?: ShorthandProps<HTMLElement>;

  /**
   * Position for Icon to be rendered
   */
  iconPosition?: 'before' | 'after';
}
```

## Structure

- _**Public**_

```jsx
<Badge />
```

- _**Internal**_

```jsx
<ElementType>{children}</ElementType>
```

- _**DOM**_

```html
<span class="ui-badge"> ... </span>
```

## Migration

- _Migration from v8_

`Badge` can be passed to `Avatar`'s `badge` slot. The `PresenceBadge` will be the best replacement for `Persona` presence mapping status, icon and colors.

- _Migration from v0_

`Badge` can be passed to `Avatar`'s `badge` slot.

## Behaviors

- Badges don't receive focus

  - Badge information would be surfaced as part of the control that it is associated with, badges themselves do not receive focus meaning they are not directly accessible by screenreaders.
    If the combination of icon and badge communicates some meaningful information, that information should be surfaced in another way through screenreader or tooltip on the component the badge is associated with.

- Screen Readers

  - Badges should be given a meaningful description. This description will be applied, via “aria-describedby” to the element decorated by the Badge. For example, "Chat, 6 unread" or similar.
    General guidance is that the badge icon is marked as “aria-hidden” by default.

- Badge shouldn't rely only on color information

  - Include meaningful descriptions when using color to represent meaning in a badge. If relying on color only [unread dot] ensure that non-visual information is included using aria-describedby

## Variants

`Badge` is base component that can be used to create custom `Badge` such as `PresenceBadge` or `CounterBadge` with specific behaviors.

### Presence Badge

A Presence Badge represents someone's availbility or status

```typescript
/**
 * {@docCategory PresenceBadge}
 */
export type PresenceBadgeStatus = 'busy' | 'oof' | 'away' | 'available' | 'offline';

/**
 * {@docCategory PresenceBadge}
 */
export interface PresenceBadgeProps extends Omit<BadgeProps, 'shape' | 'appearance'> {
  /**
   * A PresenceBadge can represent several status
   * @defaultvalue available
   */
  status?: PresenceBadgeStatus;
  /**
   * A PresenceBadge can represent status of someone out of the office
   * @defaultvalue true
   */
  inOffice?: boolean;
}

/**
 * {@docCategory Badge}
 */
export interface PresenceBadgeState extends BadgeState {
  /**
   * A PresenceBadge can represent several status
   * @defaultvalue available
   */
  status: PresenceBadgeStatus;
  /**
   * A PresenceBadge can represent status of someone out of the office
   * @defaultvalue true
   */
  inOffice: boolean;
}
```

### Counter Badge

A Counter Badge is a visual indicator for numeric values such as tallies and scores.

```typescript
/**
 * {@docCategory CounterBadge}
 */
export type CounterBadgeColors = 'accent' | 'warning' | 'important' | 'severe' | 'informative';

/**
 * {@docCategory CounterBadge}
 */
export interface CounterBadgeProps extends Omit<BadgeProps, 'appearance' | 'shape'> {
  /**
   * A Badge can be circular or rounded
   * @defaultvalue circular
   */
  shape?: Extract<BadgeShape, 'rounded' | 'circular'>;

  /**
   * A Badge can be filled, ghost
   * @defaultvalue filled
   */
  appearance?: Extract<BadgeAppearance, 'filled' | 'ghost'>;

  /**
   * A Badge can have color variations
   * @defaultvalue accent
   */
  color?: CounterBadgeColors;

  /**
   * Max number to be displayed
   * @defaultvalue 99
   */
  overflowCount?: number;

  /**
   * Value diplayed by the Badge
   * @defaultvalue 0
   */
  count?: number;

  /**
   * If the badge should be shown when count is 0
   * @defaultvalue false
   */
  showZero?: boolean;

  /**
   * If a dot badge should be displayed
   * @defaultvalue false
   */
  dot?: boolean;
}
```
