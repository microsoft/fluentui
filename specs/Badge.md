# [Badge](https://github.com/microsoft/fluentui/issues/16925)

## Background

A badge is an additional visual discriptor for UI elements.It can be used to denote numerical value, status or general information.

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

## API

| Property Name | Type   | Default Value | Description                         |
| ------------- | ------ | ------------- | ----------------------------------- |
| `size`        | `enum` | `medium`      | The Badge size                      |
| `shape`       | `enum` | `rounded`     | The Badge can have different shapes |
| `variant`     | `enum` | `filled`      | The Badge different style variants  |

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
<span class="ui-badge">
  ...
</span>
```

## Migration

- _Migration from v8_

Initially the `PersonaPresence` enum that is used to create the `Badge` in the `Persona` component can still be used to define the set of options that can be passed to the new `Badge` component.
Optionally it can support both simultaneously by adding new shorthand `Badge` prop to `Persona` and allowing it to be the `badge` slot over the `presence` or `Badge` could be used separately and share same container as
`Persona` component.

- _Migration from v0_

`Badge` can be passed to `Avatar`'s `badge` prop or be used by sharing same container.

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

#### API

| Property Name | Type      | Default Value | Description                                                                                |
| ------------- | --------- | ------------- | ------------------------------------------------------------------------------------------ |
| `size`        | `enum`    | `medium`      | The Badge size                                                                             |
| `status`      | `enum`    | `available`   | The Badge status representation                                                            |
| `inOffice`    | `boolean` | `true`        | The Badge can be represented in different ways depeding if user is in or out of the office |

### Counter Badge

A Counter Badge is a visual indicator for numeric values such as tallies and scores.

#### API

| Property Name   | Type      | Default Value | Description                                                    |
| --------------- | --------- | ------------- | -------------------------------------------------------------- |
| `size`          | `enum`    | `medium`      | The Badge size                                                 |
| `shape`         | `enum`    | `circular`    | The Badge can have different shapes                            |
| `variation`     | `enum`    | `filled`      | The Badge different style variants                             |
| `color`         | `enum`    | `accent`      | The Badge has a pre defined set of colors                      |
| `overflowCount` | `number`  | `99`          | `+` is displayed when count is larger than the specifed count. |
| `showZero`      | `boolean` | `true`        | If badge should display number if count is 0                   |
| `count`         | `number`  | `0`           | value to be displayed                                          |
