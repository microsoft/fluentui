# Components/Persona

A Persona is a visual representation of a person or status that showcases an Avatar, PresenceBadge, or an Avatar with a PresenceBadge.

## Props

| Name             | Type                                                                                                                                         | Required                                                                                                                       | Default                            | Description                                                                                                                                                |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------- | ---------- | --- | --- | ---------------------------------------------------------------------------------------------------------------------------- |
| `avatar`         | `WithSlotShorthandValue<Omit<ComponentProps<AvatarSlots>, "color"> & { active?: "active"                                                     | "inactive"                                                                                                                     | "unset"; activeAppearance?: "ring" | "shadow"                                                                                                                                                   | "ring-shadow"; ... 4 more ...; size?: AvatarSize                                                                                                                                                                        | undefined; } & RefAttributes<...>> | null                                                                                                            | undefined` | No  |     | Avatar to display. If a PresenceBadge and an Avatar are provided, the Avatar will display the PresenceBadge as its presence. |
| `presence`       | `WithSlotShorthandValue<Omit<ComponentProps<Pick<BadgeSlots, "root"                                                                          | "icon">>, "color"> & Pick<BadgeProps, "size"> & { status?: PresenceBadgeStatus; outOfOffice?: boolean; } & RefAttributes<...>> | null                               | undefined`                                                                                                                                                 | No                                                                                                                                                                                                                      |                                    | PresenceBadge to display. If `presenceOnly` is true, the PresenceBadge will be displayed instead of the Avatar. |
| `primaryText`    | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`                                                                                                                          | No                                 |                                                                                                                                                            | The first line of text in the Persona, larger than the rest of the lines. `primaryText` defaults to the `name` prop. We recomend to only use `name`, use `primaryText` when the text is different than the `name` prop. |
| `secondaryText`  | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`                                                                                                                          | No                                 |                                                                                                                                                            | The second line of text in the Persona.                                                                                                                                                                                 |
| `tertiaryText`   | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`                                                                                                                          | No                                 |                                                                                                                                                            | The third line of text in the Persona.                                                                                                                                                                                  |
| `quaternaryText` | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`                                                                                                                          | No                                 |                                                                                                                                                            | The fourth line of text in the Persona.                                                                                                                                                                                 |
| `as`             | `"div"`                                                                                                                                      | No                                                                                                                             |                                    |                                                                                                                                                            |
| `name`           | `string`                                                                                                                                     | No                                                                                                                             |                                    | The name of the person or entity represented by the Persona. When `primaryText` is not provided, this will be used as the default value for `primaryText`. |
| `presenceOnly`   | `boolean`                                                                                                                                    | No                                                                                                                             | false                              | Whether to display only the presence.                                                                                                                      |
| `size`           | `"small" "medium" "large" "extra-small" "extra-large" "huge"`                                                                                | No                                                                                                                             | medium                             | The size of a Persona and its text.                                                                                                                        |
| `textPosition`   | `"before" "after" "below"`                                                                                                                   | No                                                                                                                             | after                              | The position of the text relative to the avatar/presence.                                                                                                  |
| `textAlignment`  | `"center" "start"`                                                                                                                           | No                                                                                                                             | start                              | The vertical alignment of the text relative to the avatar/presence.                                                                                        |
| `ref`            | `Ref<HTMLDivElement>`                                                                                                                        | No                                                                                                                             |                                    |                                                                                                                                                            |

## Examples

### Avatar Size

A Persona supports different sizes, medium being the default.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Persona } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, max-content)',
    columnGap: '10px',
    rowGap: '10px',
  },
});

export const AvatarSize = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Persona
        presence={{ status: 'available' }}
        size="extra-small"
        name="Kevin Sturgis"
        avatar={{ color: 'colorful' }}
        secondaryText="Available"
      />

      <Persona
        presence={{ status: 'available' }}
        size="small"
        name="Kevin Sturgis"
        avatar={{ color: 'colorful' }}
        secondaryText="Available"
      />

      <Persona
        presence={{ status: 'available' }}
        size="medium"
        name="Kevin Sturgis"
        avatar={{ color: 'colorful' }}
        secondaryText="Available"
      />

      <Persona
        presence={{ status: 'available' }}
        size="large"
        name="Kevin Sturgis"
        avatar={{ color: 'colorful' }}
        secondaryText="Available"
      />

      <Persona
        presence={{ status: 'available' }}
        size="extra-large"
        name="Kevin Sturgis"
        avatar={{ color: 'colorful' }}
        secondaryText="Available"
      />

      <Persona
        presence={{ status: 'available' }}
        size="huge"
        name="Kevin Sturgis"
        avatar={{ color: 'colorful' }}
        secondaryText="Available"
      />
    </div>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Persona } from '@fluentui/react-components';
import type { PersonaProps } from '@fluentui/react-components';

export const Default = (props: Partial<PersonaProps>): JSXElement => {
  return (
    <Persona
      name="Kevin Sturgis"
      secondaryText="Available"
      presence={{ status: 'available' }}
      avatar={{
        image: {
          src: 'https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png',
        },
      }}
      {...props}
    />
  );
};
```

### Presence Previous Behavior

PresenceBadge maps its presence to the behavior in v8. If the previous behavior is desired, it is
possible to override the icon and className to match it. Note that Persona maps to one size
smaller, such as `huge` to `large` and `medium` to `small`. As the size prop shows, Persona does not
support tiny.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  makeStyles,
  Persona,
  presenceAvailableRegular,
  presenceOfflineRegular,
  tokens,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  statusAway: {
    color: tokens.colorPaletteMarigoldBackground3,
  },
  statusOffline: {
    color: tokens.colorNeutralForeground3,
  },

  root: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: 'repeat(2, max-content)',
    gridTemplateRows: 'repeat(3, auto)',
    columnGap: '20px',
    rowGap: '10px',
  },
});

export const PresencePreviousBehavior = (): JSXElement => {
  const styles = useStyles();
  const AwayFilledIcon = presenceAvailableRegular.small;
  const OfflineRegularIcon = presenceOfflineRegular.small;

  return (
    <div className={styles.root}>
      <span>Current Behavior</span>
      <Persona presence={{ status: 'away', outOfOffice: true }} name="Kevin Sturgis" secondaryText="Away - OOF" />
      <Persona presence={{ status: 'offline', outOfOffice: true }} name="Kevin Sturgis" secondaryText="Offline - OOF" />

      <span>Previous Behavior</span>
      <Persona
        presence={{
          status: 'away',
          outOfOffice: true,
          icon: <AwayFilledIcon />,
          className: styles.statusAway,
        }}
        name="Kevin Sturgis"
        secondaryText="Away - OOF"
      />

      <Persona
        presence={{
          status: 'offline',
          outOfOffice: true,
          icon: <OfflineRegularIcon />,
          className: styles.statusOffline,
        }}
        name="Kevin Sturgis"
        secondaryText="Offline - OOF"
      />
    </div>
  );
};
```

### Presence Size

A Persona supports different sizes, medium being the default.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Persona } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, max-content)',
    columnGap: '10px',
    rowGap: '10px',
  },
});

export const PresenceSize = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Persona
        size="extra-small"
        presenceOnly
        presence={{ status: 'available' }}
        name="Kevin Sturgis"
        secondaryText="Available"
      />

      <Persona
        size="small"
        presenceOnly
        presence={{ status: 'available' }}
        name="Kevin Sturgis"
        secondaryText="Available"
      />

      <Persona
        size="medium"
        presenceOnly
        presence={{ status: 'available' }}
        name="Kevin Sturgis"
        secondaryText="Available"
      />

      <Persona
        size="large"
        presenceOnly
        presence={{ status: 'available' }}
        name="Kevin Sturgis"
        secondaryText="Available"
      />

      <Persona
        size="extra-large"
        presenceOnly
        presence={{ status: 'available' }}
        name="Kevin Sturgis"
        secondaryText="Available"
      />

      <Persona
        size="huge"
        presenceOnly
        presence={{ status: 'available' }}
        name="Kevin Sturgis"
        secondaryText="Available"
      />
    </div>
  );
};
```

### Text Alignment

A Persona supports two text alignments, `start` being the default position.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Persona } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    justifyItems: 'center',
  },
});

export const TextAlignment = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Persona
        textAlignment="start"
        name="Kevin Sturgis"
        presence={{ status: 'available' }}
        secondaryText="Available"
        tertiaryText="Software Engineer"
        quaternaryText="Microsoft"
      />

      <Persona
        textAlignment="center"
        name="Kevin Sturgis"
        presence={{ status: 'available' }}
        secondaryText="Available"
        tertiaryText="Software Engineer"
        quaternaryText="Microsoft"
      />
    </div>
  );
};
```

### Text Position

A Persona supports three text positions, `after` being the default position.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Persona } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    justifyItems: 'center',
  },
});

export const TextPosition = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Persona textPosition="after" name="Kevin Sturgis" presence={{ status: 'available' }} secondaryText="Available" />
      <Persona textPosition="below" name="Kevin Sturgis" presence={{ status: 'available' }} secondaryText="Available" />
      <Persona
        textPosition="before"
        name="Kevin Sturgis"
        presence={{ status: 'available' }}
        secondaryText="Available"
      />
    </div>
  );
};
```
