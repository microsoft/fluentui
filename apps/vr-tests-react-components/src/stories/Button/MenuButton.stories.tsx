import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { MenuButton } from '@fluentui/react-button';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { makeStyles } from '@griffel/react';
import { ComponentMeta } from '@storybook/react';
import { getStoryVariant, RTL } from '../../utilities/index';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const steps = new Screener.Steps()
  .snapshot('default', { cropTo: '.testWrapper' })
  .hover('#button-id')
  .snapshot('hover', { cropTo: '.testWrapper' })
  .mouseDown('#button-id')
  .snapshot('pressed', { cropTo: '.testWrapper' })
  .end();

const buttonId = 'button-id';

const useStyles = makeStyles({
  longText: {
    width: '280px',
  },
});

export default {
  title: 'MenuButton Converged',
  component: MenuButton,
  decorators: [story => <Screener steps={steps}>{story()}</Screener>],
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
