# Icon Migration

## Naming Convention

v8 uses string icon names via `iconProps={{ iconName: 'Add' }}`.
v9 uses SVG React components from `@fluentui/react-icons`:

```tsx
// v8
import { DefaultButton } from '@fluentui/react';
<DefaultButton iconProps={{ iconName: 'Add' }} text="Add item" />;

// v9
import { Button } from '@fluentui/react-components';
import { AddRegular } from '@fluentui/react-icons';
<Button icon={<AddRegular />}>Add item</Button>;
```

## Regular vs Filled

- Use `Regular` (outline) by default
- Use `Filled` for selected, active, or toggled states

```tsx
import { StarRegular, StarFilled } from '@fluentui/react-icons';
<Button icon={isStarred ? <StarFilled /> : <StarRegular />} />;
```

## Common v8 iconName → v9 Component

| v8 `iconName`     | v9 Component            | Notes                   |
| ----------------- | ----------------------- | ----------------------- |
| `Add`             | `AddRegular`            |                         |
| `AddFriend`       | `PersonAddRegular`      |                         |
| `ArrowDown`       | `ArrowDownRegular`      |                         |
| `ArrowLeft`       | `ArrowLeftRegular`      |                         |
| `ArrowRight`      | `ArrowRightRegular`     |                         |
| `ArrowUp`         | `ArrowUpRegular`        |                         |
| `Attach`          | `AttachRegular`         |                         |
| `Back`            | `ArrowLeftRegular`      |                         |
| `Cancel`          | `DismissRegular`        | Renamed                 |
| `CheckMark`       | `CheckmarkRegular`      | Renamed (lowercase 'm') |
| `ChevronDown`     | `ChevronDownRegular`    |                         |
| `ChevronLeft`     | `ChevronLeftRegular`    |                         |
| `ChevronRight`    | `ChevronRightRegular`   |                         |
| `ChevronUp`       | `ChevronUpRegular`      |                         |
| `CircleRing`      | `CircleRegular`         | Renamed                 |
| `Clear`           | `DismissRegular`        | Renamed                 |
| `Close`           | `DismissRegular`        | Renamed                 |
| `Copy`            | `CopyRegular`           |                         |
| `Delete`          | `DeleteRegular`         |                         |
| `Download`        | `ArrowDownloadRegular`  | Renamed                 |
| `Edit`            | `EditRegular`           |                         |
| `Error`           | `ErrorCircleRegular`    | Renamed                 |
| `Filter`          | `FilterRegular`         |                         |
| `Forward`         | `ArrowRightRegular`     |                         |
| `Globe`           | `GlobeRegular`          |                         |
| `Home`            | `HomeRegular`           |                         |
| `Info`            | `InfoRegular`           |                         |
| `Link`            | `LinkRegular`           |                         |
| `List`            | `ListRegular`           |                         |
| `Mail`            | `MailRegular`           |                         |
| `More`            | `MoreHorizontalRegular` | Renamed                 |
| `MoreVertical`    | `MoreVerticalRegular`   |                         |
| `OpenInNewWindow` | `OpenRegular`           | Renamed                 |
| `People`          | `PeopleRegular`         |                         |
| `Pin`             | `PinRegular`            |                         |
| `Print`           | `PrintRegular`          |                         |
| `Refresh`         | `ArrowClockwiseRegular` | Renamed                 |
| `Save`            | `SaveRegular`           |                         |
| `Search`          | `SearchRegular`         |                         |
| `Send`            | `SendRegular`           |                         |
| `Settings`        | `SettingsRegular`       |                         |
| `Share`           | `ShareRegular`          |                         |
| `Star`            | `StarRegular`           |                         |
| `Tag`             | `TagRegular`            |                         |
| `Unknown`         | `QuestionCircleRegular` | Renamed                 |
| `Upload`          | `ArrowUploadRegular`    | Renamed                 |
| `User`            | `PersonRegular`         | Renamed                 |
| `Warning`         | `WarningRegular`        |                         |

## Finding Icon Names

If an icon name isn't in the table above, the pattern is usually:

1. Convert `PascalCase` iconName to the same name + `Regular` suffix
2. Check [Fluent UI Icons](https://react.fluentui.dev/?path=/story/icons-catalog--docs) for the full catalog

Search the icons package:

```sh
# Find icons matching a keyword (grep the type declarations)
grep -r "export.*Regular" node_modules/@fluentui/react-icons/lib/components/ 2>/dev/null | grep -i "dismiss" | head -10

# Alternative: search the index type file
grep "Dismiss" node_modules/@fluentui/react-icons/lib/index.d.ts 2>/dev/null | head -10
```

The online catalog is authoritative: https://react.fluentui.dev/?path=/story/icons-catalog--docs

## Standalone Icon Usage

```tsx
// v8
import { Icon } from '@fluentui/react';
<Icon iconName="Add" />

// v9
import { AddRegular } from '@fluentui/react-icons';
<AddRegular />

// With custom size/color
<AddRegular fontSize={24} style={{ color: 'blue' }} />
```
