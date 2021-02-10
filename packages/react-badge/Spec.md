# Badge

## Background

A badge is an additional visual discriptor for UI elements.It can be used to denote numerical value, status or general information.

## Prior Art

- [OpenUI Research](https://open-ui.org/components/badge.research)

## Sample Code

```jsx
  <Badge>
    <Text>My Custom Badge</Text>
  </Badge>
  <Badge
    status="success"
    style={{ position: 'absolute', top: -4, right: -4 }}
  />
```

## Variants

`Badge` can have several variations.

- Appearance: `default`, `rounded` and `circular`
- Size: `smallest`, `smaller`, `small`, `medium`, `large`, `larger`.
- Styles: `filled`, `outline`, `ghost`, `tint`, `inverted filled`

## API

| Property Name | Type      | Default Value | Description                  |
| ------------- | --------- | ------------- | ---------------------------- |
| `size`        | `enum`    | `medium`      | The Badge size               |
| `status`      | `enum`    | `none`        | The Badge status color       |
| `rounded`     | `boolean` | `false`       | If Badge has rounded corners |
| `circular`    | `boolean` | `false`       | If Badge is circular         |
| `filled`      | `boolean` | `true`        | If Badge is filled           |
| `outline`     | `boolean` | `false`       | If Badge is outlined         |
| `ghost`       | `boolean` | `false`       | If Badge is ghost            |
| `inverted`    | `boolean` | `false`       | If Badge is inverted         |
| `tint`        | `boolean` | `false`       | If badge is tint             |

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

`Badge` can be passed to `Avatar`'s `status` prop or be used by sharing same container.

- _Specific Badges_

`Badge` is base component that can be used to create custom `Badge` such as `PresenceBadge` or `CounterBadge` with specific behaviors.

## Behaviors

- Badges don't receive focus

  - Badge information would be surfaced as part of the control that it is associated with, badges themselves do not receive focus meaning they are not directly accessible by screenreaders.
    If the combination of icon and badge communicates some meaningful information, that information should be surfaced in another way through screenreader or tooltip on the component the badge is associated with.

- Screen Readers

  - Badges should be given a meaningful description. This description will be applied, via “aria-describedby” to the element decorated by the Badge. For example, "Chat, 6 unread" or similar.
    General guidance is that the badge icon is marked as “aria-hidden” by default.

- Badge shouldn't rely only on color information

  - Include meaningful descriptions when using color to represent meaning in a badge. If relying on color only [unread dot] ensure that non-visual information is included using aria-describedby
