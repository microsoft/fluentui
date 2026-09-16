# Persona Migration

v9 `Persona` uses a slot-based API. Text lines are slots (`primaryText`, `secondaryText`, etc.); avatar and presence are composed via `Avatar` and `PresenceBadge` slots rather than flat image/initials props.

## Prop Mapping

| v8 `IPersonaProps`     | v9 `PersonaProps`                         | Notes                                                                 |
| ---------------------- | ----------------------------------------- | --------------------------------------------------------------------- |
| `text` / `primaryText` | `name` (or `primaryText` slot)            | `name` is the default for `primaryText`; use slots for custom content |
| `secondaryText`        | `secondaryText` slot                      |                                                                       |
| `tertiaryText`         | `tertiaryText` slot                       |                                                                       |
| `optionalText`         | `quaternaryText` slot                     | Renamed                                                               |
| `imageUrl`             | `avatar={{ image: { src: '...' } }}`      | Passed as shorthand to the `avatar` slot                              |
| `imageInitials`        | `avatar={{ initials: '...' }}`            |                                                                       |
| `initialsColor`        | `avatar={{ color: '...' }}`               | v9 uses token-based colors or `"colorful"`                            |
| `presence`             | `presence={{ status: '...' }}`            | `PersonaPresence` enum → string status (see table below)              |
| `presenceTitle`        | `presence={{ title: '...' }}`             |                                                                       |
| `size`                 | `size`                                    | Different enum — see size table below                                 |
| `hidePersonaDetails`   | `textPosition="below"` or omit text slots | Use slot composition                                                  |
| `showSecondaryText`    | Include `secondaryText` slot              | v9 shows it unconditionally when provided                             |
| `coinSize`             | `size` on the `avatar` slot               | Use token sizes                                                       |
| `styles`               | `className` + `makeStyles`                |                                                                       |
| `theme`                | —                                         | Use `FluentProvider`                                                  |
| `componentRef`         | `ref`                                     |                                                                       |

## Presence Status Mapping

| v8 `PersonaPresence`      | v9 `status`          |
| ------------------------- | -------------------- |
| `PersonaPresence.online`  | `"available"`        |
| `PersonaPresence.away`    | `"away"`             |
| `PersonaPresence.busy`    | `"busy"`             |
| `PersonaPresence.dnd`     | `"do-not-disturb"`   |
| `PersonaPresence.blocked` | `"blocked"`          |
| `PersonaPresence.offline` | `"offline"`          |
| `PersonaPresence.none`    | omit `presence` prop |

## Size Mapping

| v8 `PersonaSize`      | v9 `size`            |
| --------------------- | -------------------- |
| `PersonaSize.size8`   | `"extra-small"`      |
| `PersonaSize.size24`  | `"extra-small"`      |
| `PersonaSize.size32`  | `"small"`            |
| `PersonaSize.size40`  | `"medium"` (default) |
| `PersonaSize.size48`  | `"medium"`           |
| `PersonaSize.size56`  | `"large"`            |
| `PersonaSize.size72`  | `"extra-large"`      |
| `PersonaSize.size100` | `"huge"`             |
| `PersonaSize.size120` | `"huge"`             |

## Before / After

### Before

```tsx
import { Persona, PersonaSize, PersonaPresence } from '@fluentui/react';
<Persona
  text="Alice Northwood"
  secondaryText="Software Engineer"
  imageUrl={avatarSrc}
  size={PersonaSize.size48}
  presence={PersonaPresence.online}
/>;
```

### After

```tsx
import { Persona } from '@fluentui/react-components';
<Persona
  name="Alice Northwood"
  secondaryText="Software Engineer"
  avatar={{ image: { src: avatarSrc } }}
  size="medium"
  presence={{ status: 'available' }}
/>;
```

## Text Position

```tsx
// v9 — text below avatar (was hidePersonaDetails=false + layout)
<Persona name="Alice Northwood" secondaryText="Engineer" textPosition="below" size="large" />
```
