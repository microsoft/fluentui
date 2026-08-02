import * as React from 'react';
import { MenuButton } from '@fluentui/react-button';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import type { Meta } from '@storybook/react-webpack5';
import { getStoryVariant, RTL } from '../../utilities';
import { buttonId, steps, useStyles } from './utils';
import type { StoryParameters } from 'storywright';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export default {
  title: 'MenuButton Converged',
  component: MenuButton,
  parameters: { storyWright: { steps } } satisfies StoryParameters,
} satisfies Meta<typeof MenuButton>;

export const Default = () => <MenuButton id={buttonId}>Hello, world</MenuButton>;

export const DefaultRTL = getStoryVariant(Default, RTL);

export const Circular = () => (
  <MenuButton id={buttonId} shape="circular">
    Hello, world
  </MenuButton>
);

export const Outline = () => (
  <MenuButton id={buttonId} appearance="outline">
    Hello, world
  </MenuButton>
);

export const Primary = () => (
  <MenuButton id={buttonId} appearance="primary">
    Hello, world
  </MenuButton>
);

export const Subtle = () => (
  <MenuButton id={buttonId} appearance="subtle">
    Hello, world
  </MenuButton>
);

export const Transparent = () => (
  <MenuButton id={buttonId} appearance="transparent">
    Hello, world
  </MenuButton>
);

export const Disabled = () => (
  <MenuButton id={buttonId} disabled>
    Hello, world
  </MenuButton>
);

export const OutlineDisabled = () => (
  <MenuButton id={buttonId} appearance="outline" disabled>
    Hello, world
  </MenuButton>
);

export const PrimaryDisabled = () => (
  <MenuButton id={buttonId} appearance="primary" disabled>
    Hello, world
  </MenuButton>
);

export const SubtleDisabled = () => (
  <MenuButton id={buttonId} appearance="subtle" disabled>
    Hello, world
  </MenuButton>
);

export const TransparentDisabled = () => (
  <MenuButton id={buttonId} appearance="transparent" disabled>
    Hello, world
  </MenuButton>
);

export const SizeSmall = () => (
  <MenuButton id={buttonId} icon={<CalendarMonth />} size="small">
    Hello, world
  </MenuButton>
);

SizeSmall.storyName = 'Size small';

export const SizeLarge = () => (
  <MenuButton id={buttonId} icon={<CalendarMonth />} size="large">
    Hello, world
  </MenuButton>
);

SizeLarge.storyName = 'Size large';

export const SizeSmallWithLongTextWrapping = () => {
  const styles = useStyles();
  return (
    <MenuButton id={buttonId} className={styles.longText} icon={<CalendarMonth />} size="small">
      Long text wraps after it hits the max width of the component
    </MenuButton>
  );
};

SizeSmallWithLongTextWrapping.storyName = 'Size small - with long text wrapping';

export const SizeMediumWithLongTextWrapping = () => {
  const styles = useStyles();
  return (
    <MenuButton id={buttonId} className={styles.longText} icon={<CalendarMonth />} size="medium">
      Long text wraps after it hits the max width of the component
    </MenuButton>
  );
};

SizeMediumWithLongTextWrapping.storyName = 'Size medium - with long text wrapping';

export const SizeLargeWithLongTextWrapping = () => {
  const styles = useStyles();
  return (
    <MenuButton id={buttonId} className={styles.longText} icon={<CalendarMonth />} size="large">
      Long text wraps after it hits the max width of the component
    </MenuButton>
  );
};

SizeLargeWithLongTextWrapping.storyName = 'Size large - with long text wrapping';

export const WithIcon = () => (
  <MenuButton id={buttonId} icon={<CalendarMonth />}>
    Hello, world
  </MenuButton>
);

WithIcon.storyName = 'With icon';

export const IconOnly = () => <MenuButton id={buttonId} icon={<CalendarMonth />} />;

IconOnly.storyName = 'Icon only';

/*
 * S-J state-matrix story (griffel-zero-plan.md §2.2): `useMenuButtonStyles_unstable` keys
 * the `expanded` slice off `state.root['aria-expanded']`, and that slice is nothing but
 * the filled<->regular bundled-icon swap — no story above combines it with a bundled
 * icon, so the `open` leg of the swap matrix had no pixel evidence. Passing the
 * attribute directly renders the open-trigger state without popup scaffolding.
 */
export const WithIconExpanded = () => (
  <MenuButton id={buttonId} icon={<CalendarMonth />} aria-expanded>
    Hello, world
  </MenuButton>
);

WithIconExpanded.storyName = 'With icon expanded';

export const CircularAndIconOnly = () => <MenuButton id={buttonId} shape="circular" icon={<CalendarMonth />} />;

CircularAndIconOnly.storyName = 'Circular and icon only';
