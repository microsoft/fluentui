# Facepile → AvatarGroup Migration

## Architecture Change

v8 `Facepile` accepts a `personas` array prop and an `overflowPersonas` array.

v9 `AvatarGroup` uses three components:

- `AvatarGroup` — main container (inline items)
- `AvatarGroupItem` — replaces individual `Persona` items
- `AvatarGroupPopover` — renders the overflow button + popover with overflow items

Use `partitionAvatarGroupItems` to split a list into inline vs overflow items based on layout.

## Before / After Example

### Before

```tsx
import { Facepile, IFacepilePersona } from '@fluentui/react';
import { facepilePersonas } from '@fluentui/example-data';
import { PersonaSize } from '@fluentui/react/lib/Persona';

const personas: IFacepilePersona[] = facepilePersonas.slice(0, 3);
const overflowPersonas = facepilePersonas.slice(3);

<Facepile personaSize={PersonaSize.size32} personas={personas} overflowPersonas={overflowPersonas} />;
```

### After

```tsx
import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
  partitionAvatarGroupItems,
} from '@fluentui/react-components';

const names = [
  'Johnie McConnell',
  'Allan Munger',
  'Erik Nason',
  'Kristin Patterson',
  'Daisy Phillips',
  'Carole Poland',
];

const { inlineItems, overflowItems } = partitionAvatarGroupItems({ items: names });

<AvatarGroup size={32}>
  {inlineItems.map(name => (
    <AvatarGroupItem name={name} key={name} />
  ))}
  {overflowItems.length > 0 && (
    <AvatarGroupPopover>
      {overflowItems.map(name => (
        <AvatarGroupItem name={name} key={name} />
      ))}
    </AvatarGroupPopover>
  )}
</AvatarGroup>;
```

## partitionAvatarGroupItems Options

```ts
const { inlineItems, overflowItems } = partitionAvatarGroupItems({
  items: names,
  layout: 'spread', // 'spread' | 'stack' | 'pie' — controls overflow behavior
  maxInlineItems: 5, // override max inline count (default depends on layout)
});
```

## Facepile → AvatarGroup Prop Mapping

| v8 `IFacepileProps`      | v9                                          | Notes                                          |
| ------------------------ | ------------------------------------------- | ---------------------------------------------- |
| `personas`               | `children` (`AvatarGroupItem` elements)     | Use `partitionAvatarGroupItems` to split items |
| `overflowPersonas`       | `AvatarGroupPopover` children               |                                                |
| `personaSize`            | `size` on `AvatarGroup`                     | Numeric pixel value                            |
| `maxDisplayablePersonas` | `maxAvatars` in `partitionAvatarGroupItems` |                                                |
| `getPersonaProps`        | `AvatarGroupItem` props                     | Pass props directly to each `AvatarGroupItem`  |
| `onRenderPersona`        | Render custom `AvatarGroupItem`             |                                                |
| `onRenderPersonaCoin`    | `avatar` slot on `AvatarGroupItem`          |                                                |
| `overflowButtonProps`    | `AvatarGroupPopover` props                  |                                                |
| `overflowButtonType`     | `indicator` prop on `AvatarGroupPopover`    |                                                |
| `addButtonProps`         | —                                           | Not available in v9                            |
| `showAddButton`          | —                                           | Not available in v9                            |
| `showTooltip`            | —                                           | Tooltips handled differently in v9             |
| `className`              | `className`                                 |                                                |
| `styles`                 | `className`                                 |                                                |
