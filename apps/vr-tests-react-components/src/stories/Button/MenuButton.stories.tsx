import * as React from 'react';
import { MenuButton } from '@fluentui/react-button';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { ComponentMeta } from '@storybook/react';
import { getStoryVariant, withStoryWrightSteps, RTL } from '../../utilities';
import { buttonId, steps, useStyles } from './utils';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export default {
  title: 'MenuButton Converged',
  component: MenuButton,
  decorators: [story => withStoryWrightSteps({ story, steps })],
} as ComponentMeta<typeof MenuButton>;

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

export const CircularAndIconOnly = () => <MenuButton id={buttonId} shape="circular" icon={<CalendarMonth />} />;

CircularAndIconOnly.storyName = 'Circular and icon only';
