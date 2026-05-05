# Components/Avatar

An Avatar is a graphical representation of a user, team, or entity.

Avatar can display an image, icon, or initials, and supports various sizes and shapes.

## Props

| Name               | Type                                                                                                                                                                                                                                                                                                               | Required                                                                                                                       | Default  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ------------------------------------------- |
| `image`            | `({ as?: "img"; } & Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "children"> & { ...; })                                                                                                                                                                                         | null`                                                                                                                          | No       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | The Avatar's image. Usage e.g.: `image={{ src: '...' }}`                                                                                                                                                                                                              |
| `as`               | `"span"`                                                                                                                                                                                                                                                                                                           | No                                                                                                                             |          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `initials`         | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }>                                                                                                                                                                       | null`                                                                                                                          | No       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | (optional) Custom initials. It is usually not necessary to specify custom initials; by default they will be derived from the `name` prop, using the `getInitials` function. The initials are displayed when there is no image (including while the image is loading). |
| `icon`             | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }>                                                                                                                                                                       | null`                                                                                                                          | No       | `PersonRegular` (the default icon's size depends on the Avatar's size)                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Icon to be displayed when the avatar doesn't have an image or initials.                                                                                                                                                                                               |
| `badge`            | `WithSlotShorthandValue<Omit<ComponentProps<Pick<BadgeSlots, "root"                                                                                                                                                                                                                                                | "icon">>, "color"> & Pick<BadgeProps, "size"> & { status?: PresenceBadgeStatus; outOfOffice?: boolean; } & RefAttributes<...>> | null     | undefined`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | No                                                                                                                                                                                                                                                                    |     | Badge to show the avatar's presence status. |
| `active`           | `"active" "inactive" "unset"`                                                                                                                                                                                                                                                                                      | No                                                                                                                             | unset    | Optional activity indicator _ active: the avatar will be decorated according to activeAppearance _ inactive: the avatar will be reduced in size and partially transparent \* unset: normal display                                                                                                                                                                                                                                                                                                                                                  |
| `activeAppearance` | `"ring" "shadow" "ring-shadow"`                                                                                                                                                                                                                                                                                    | No                                                                                                                             | ring     | The appearance when `active="active"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `color`            | `"anchor" "neutral" "brand" "colorful" "dark-red" "cranberry" "red" "pumpkin" "peach" "marigold" "gold" "brass" "brown" "forest" "seafoam" "dark-green" "light-teal" "teal" "steel" "blue" "royal-blue" "cornflower" "navy" "lavender" "purple" "grape" "lilac" "pink" "magenta" "plum" "beige" "mink" "platinum"` | No                                                                                                                             | neutral  | The color when displaying either an icon or initials. _ neutral (default): gray _ brand: color from the brand palette _ colorful: picks a color from a set of pre-defined colors, based on a hash of the name (or idForColor if provided) _ [AvatarNamedColor]: a specific color from the theme                                                                                                                                                                                                                                                     |
| `idForColor`       | `string`                                                                                                                                                                                                                                                                                                           | No                                                                                                                             |          | Specify a string to be used instead of the name, to determine which color to use when color="colorful". Use this when a name is not available, but there is another unique identifier that can be used instead.                                                                                                                                                                                                                                                                                                                                     |
| `name`             | `string`                                                                                                                                                                                                                                                                                                           | No                                                                                                                             |          | The name of the person or entity represented by this Avatar. This should always be provided if it is available. The name is used to determine the initials displayed when there is no image. It is also provided to accessibility tools.                                                                                                                                                                                                                                                                                                            |
| `shape`            | `"circular" "square"`                                                                                                                                                                                                                                                                                              | No                                                                                                                             | circular | The avatar can have a circular or square shape.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `size`             | `16 20 24 28 32 36 40 48 56 64 72 96 120 128`                                                                                                                                                                                                                                                                      | No                                                                                                                             | 32       | Size of the avatar in pixels. Size is restricted to a limited set of supported values recommended for most uses (see `AvatarSizeValue`) and based on design guidelines for the Avatar control. Note: At size 16, if initials are displayed, only the first initial will be rendered. If a non-supported size is needed, set `size` to the next-smaller supported size, and set `width` and `height` to override the rendered size. For example, to set the avatar to 45px in size: `<Avatar size={40} style={{ width: '45px', height: '45px' }} />` |
| `ref`              | `Ref<HTMLSpanElement>`                                                                                                                                                                                                                                                                                             | No                                                                                                                             |          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

## Examples

### Active

An avatar can communicate whether a user is currently active (for example, speaking or typing). Avatar supports `active`, `inactive`, and `unset`. The default is `unset`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Avatar } from '@fluentui/react-components';

export const Active = (): JSXElement => (
  <div style={{ display: 'flex', gap: '20px' }}>
    <Avatar active="active" name="Ashley McCarthy" />
    <Avatar active="inactive" name="Isaac Fielder" badge={{ status: 'away' }} />
  </div>
);
```

### Active Appearance

An avatar can have different appearances when `active="active"`. Avatar supports `ring`, `shadow`, and `ring-shadow`. The default is `ring`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Avatar } from '@fluentui/react-components';

export const ActiveAppearance = (): JSXElement => (
  <div style={{ display: 'flex', gap: '20px' }}>
    <Avatar active="active" activeAppearance="ring" name="Ring" />
    <Avatar active="active" activeAppearance="shadow" name="Shadow" />
    <Avatar active="active" activeAppearance="ring-shadow" name="Ring Shadow" />
  </div>
);
```

### Badge

An avatar can have a badge to indicate presence status. See the PresenceBadge component for more info.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Avatar } from '@fluentui/react-components';

export const Badge = (): JSXElement => (
  <>
    <Avatar name="Lydia Bauer" badge={{ status: 'available' }} />
    <Avatar name="Amanda Brady" badge={{ status: 'busy' }} />
    <Avatar name="Henry Brill" badge={{ status: 'out-of-office' }} />
    <Avatar name="Robin Counts" badge={{ status: 'away' }} />
    <Avatar name="Tim Deboer" badge={{ status: 'offline' }} />
    <Avatar name="Cameron Evans" badge={{ status: 'do-not-disturb' }} />
    <Avatar name="Wanda Howard" badge={{ status: 'blocked' }} />
    <Avatar name="Mona Kane" badge={{ status: 'available', outOfOffice: true }} />
    <Avatar name="Allan Munger" badge={{ status: 'busy', outOfOffice: true }} />
    <Avatar name="Erik Nason" badge={{ status: 'out-of-office', outOfOffice: true }} />
    <Avatar name="Daisy Phillips" badge={{ status: 'away', outOfOffice: true }} />
    <Avatar name="Kevin Sturgis" badge={{ status: 'offline', outOfOffice: true }} />
    <Avatar name="Elliot Woodward" badge={{ status: 'do-not-disturb', outOfOffice: true }} />
    <Avatar name="Wanda Howard" badge={{ status: 'blocked', outOfOffice: true }} />
  </>
);
```

### Badge Icon

An Avatar can have a custom icon inside the badge.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Avatar } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

export const BadgeIcon = (): JSXElement => <Avatar name="John Doe" badge={{ icon: <CalendarMonthRegular /> }} />;
```

### Color: brand

An avatar can use the brand color from the theme's palette.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Avatar } from '@fluentui/react-components';

export const ColorBrand = (): JSXElement => <Avatar color="brand" initials="BR" name="brand color avatar" />;
```

### Color: colorful

An avatar can have the color be automatically picked based on the `name` prop (or `idForColor` can be used if a name is not available).

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Avatar } from '@fluentui/react-components';
import { GuestRegular } from '@fluentui/react-icons';

export const ColorColorful = (): JSXElement => (
  <>
    <Avatar color="colorful" name="Katri Athokas" />
    <Avatar color="colorful" name="Elvia Atkins" />
    <Avatar color="colorful" name="Cameron Evans" />
    <Avatar color="colorful" name="Wanda Howard" />
    <Avatar color="colorful" name="Mona Kane" />
    <Avatar color="colorful" name="Allan Munger" />
    <Avatar color="colorful" name="Daisy Phillips" />
    <Avatar color="colorful" name="Robert Tolbert" />
    <Avatar color="colorful" name="Kevin Sturgis" />
    <Avatar color="colorful" name="Elliot Woodward" />
    <Avatar color="colorful" idForColor="id-123" icon={<GuestRegular />} aria-label="Guest" />
    <Avatar color="colorful" idForColor="42" icon={<GuestRegular />} aria-label="Guest" />
    <Avatar color="colorful" idForColor="93" icon={<GuestRegular />} aria-label="Guest" />
    <Avatar color="colorful" idForColor="Guest-23" icon={<GuestRegular />} aria-label="Guest" />
  </>
);
```

### Color: named color

An avatar can have a specific named color from the theme's color palette (e.g. `seafoam`, `grape`, or `pumpkin`)

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Avatar } from '@fluentui/react-components';

export const ColorPalette = (): JSXElement => (
  <>
    <Avatar initials="DR" color="dark-red" name="darkRed avatar" />
    <Avatar initials="CR" color="cranberry" name="cranberry avatar" />
    <Avatar initials="RE" color="red" name="red avatar" />
    <Avatar initials="PU" color="pumpkin" name="pumpkin avatar" />
    <Avatar initials="PE" color="peach" name="peach avatar" />
    <Avatar initials="MA" color="marigold" name="marigold avatar" />
    <Avatar initials="GO" color="gold" name="gold avatar" />
    <Avatar initials="BS" color="brass" name="brass avatar" />
    <Avatar initials="BR" color="brown" name="brown avatar" />
    <Avatar initials="FO" color="forest" name="forest avatar" />
    <Avatar initials="SE" color="seafoam" name="seafoam avatar" />
    <Avatar initials="DG" color="dark-green" name="darkGreen avatar" />
    <Avatar initials="LT" color="light-teal" name="lightTeal avatar" />
    <Avatar initials="TE" color="teal" name="teal avatar" />
    <Avatar initials="ST" color="steel" name="steel avatar" />
    <Avatar initials="BL" color="blue" name="blue avatar" />
    <Avatar initials="RB" color="royal-blue" name="royalBlue avatar" />
    <Avatar initials="CO" color="cornflower" name="cornflower avatar" />
    <Avatar initials="NA" color="navy" name="navy avatar" />
    <Avatar initials="LA" color="lavender" name="lavender avatar" />
    <Avatar initials="PU" color="purple" name="purple avatar" />
    <Avatar initials="GR" color="grape" name="grape avatar" />
    <Avatar initials="LI" color="lilac" name="lilac avatar" />
    <Avatar initials="PI" color="pink" name="pink avatar" />
    <Avatar initials="MA" color="magenta" name="magenta avatar" />
    <Avatar initials="PL" color="plum" name="plum avatar" />
    <Avatar initials="BE" color="beige" name="beige avatar" />
    <Avatar initials="MI" color="mink" name="mink avatar" />
    <Avatar initials="PL" color="platinum" name="platinum avatar" />
    <Avatar initials="AN" color="anchor" name="anchor avatar" />
  </>
);
```

### Default

```tsx
import type { ArgTypes } from '@storybook/react-webpack5';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Avatar } from '@fluentui/react-components';
import type { AvatarProps } from '@fluentui/react-components';

export const Default = (props: Partial<AvatarProps>): JSXElement => <Avatar aria-label="Guest" {...props} />;

const argTypes: ArgTypes = {
  initials: {
    control: {
      type: 'text',
    },
  },
  badge: {
    control: {
      type: 'inline-radio',
      options: [{ status: 'away' }, { status: 'busy' }],
    },
  },
  size: {
    control: {
      type: 'select',
      options: [16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96, 120, 128],
    },
  },
  name: {
    control: {
      type: 'text',
    },
  },
};
```

### Icon

An avatar can display an icon. The icon will only be shown when there is no image or initials available.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  BriefcaseRegular,
  CalendarLtrRegular,
  ConferenceRoomRegular,
  GuestRegular,
  PeopleRegular,
  PeopleTeamRegular,
  PersonCallRegular,
} from '@fluentui/react-icons';

import { Avatar } from '@fluentui/react-components';

export const Icon = (): JSXElement => (
  <>
    <Avatar icon={<GuestRegular />} aria-label="Guest" />
    <Avatar icon={<PeopleRegular />} aria-label="Group" />
    <Avatar icon={<PeopleTeamRegular />} shape="square" aria-label="Team" />
    <Avatar icon={<PersonCallRegular />} aria-label="Phone Contact" />
    <Avatar icon={<CalendarLtrRegular />} aria-label="Meeting" />
    <Avatar icon={<BriefcaseRegular />} shape="square" aria-label="Tenant" />
    <Avatar icon={<ConferenceRoomRegular />} shape="square" aria-label="Room" />
  </>
);
```

### Image

An avatar can display an image.<br/>It is recommended to also include a name in addition to the image: the initials from the name are displayed while the image is loading, and the name makes the Avatar accessible to screen readers.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Avatar } from '@fluentui/react-components';

export const Image = (): JSXElement => (
  <Avatar
    name="Katri Athokas"
    image={{
      src: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg',
    }}
  />
);
```

### Initials: Custom Initials

An avatar can display custom initials by setting the initials prop. It is generally recommended to use
the `name` prop instead, as that will automatically determine the initials and display them.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Avatar } from '@fluentui/react-components';

export const Initials = (): JSXElement => <Avatar name="Cecil Robin Folk" initials="CRF" />;
```

### Name

The name is used to determine the initials displayed by the Avatar. It is also read by screen readers.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Avatar } from '@fluentui/react-components';

export const Name = (): JSXElement => <Avatar name="Ashley McCarthy" />;
```

### Size

An avatar supports a range of sizes from 16 to 128. The default is 32.

Avoid using sizes 16 and 20 for interactive Avatars, or ensure that there is at least 8px or 4px spacing respectively to meet WCAG target size requirements.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Avatar } from '@fluentui/react-components';

export const Size = (): JSXElement => (
  <>
    <Avatar initials="16" size={16} />
    <Avatar initials="20" size={20} />
    <Avatar initials="24" size={24} />
    <Avatar initials="28" size={28} />
    <Avatar initials="32" size={32} />
    <Avatar initials="36" size={36} />
    <Avatar initials="40" size={40} />
    <Avatar initials="48" size={48} />
    <Avatar initials="56" size={56} />
    <Avatar initials="64" size={64} />
    <Avatar initials="72" size={72} />
    <Avatar initials="96" size={96} />
    <Avatar initials="120" size={120} />
    <Avatar initials="128" size={128} />
  </>
);
```

### Shape: square

An avatar can have a square shape.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Avatar } from '@fluentui/react-components';
import { PeopleTeamRegular } from '@fluentui/react-icons';

export const Square = (): JSXElement => (
  <Avatar shape="square" aria-label="square avatar" icon={<PeopleTeamRegular />} />
);
```
