import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { CompoundButton } from '@fluentui/react-button';
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
  title: 'CompoundButton Converged',
  component: CompoundButton,
  decorators: [story => <Screener steps={steps}>{story()}</Screener>],
} as ComponentMeta<typeof CompoundButton>;

export const Outline = () => (
  <CompoundButton id={buttonId} secondaryContent="This is some secondary text" appearance="outline">
    Hello, world
  </CompoundButton>
);

export const Primary = () => (
  <CompoundButton id={buttonId} secondaryContent="This is some secondary text" appearance="primary">
    Hello, world
  </CompoundButton>
);

export const Subtle = () => (
  <CompoundButton id={buttonId} secondaryContent="This is some secondary text" appearance="subtle">
    Hello, world
  </CompoundButton>
);

export const Transparent = () => (
  <CompoundButton id={buttonId} secondaryContent="This is some secondary text" appearance="transparent">
    Hello, world
  </CompoundButton>
);

export const Disabled = () => (
  <CompoundButton id={buttonId} secondaryContent="This is some secondary text" disabled>
    Hello, world
  </CompoundButton>
);

export const OutlineDisabled = () => (
  <CompoundButton id={buttonId} secondaryContent="This is some secondary text" appearance="outline" disabled>
    Hello, world
  </CompoundButton>
);

export const PrimaryDisabled = () => (
  <CompoundButton id={buttonId} secondaryContent="This is some secondary text" appearance="primary" disabled>
    Hello, world
  </CompoundButton>
);

export const SubtleDisabled = () => (
  <CompoundButton id={buttonId} secondaryContent="This is some secondary text" appearance="subtle" disabled>
    Hello, world
  </CompoundButton>
);

export const TransparentDisabled = () => (
  <CompoundButton id={buttonId} secondaryContent="This is some secondary text" appearance="transparent" disabled>
    Hello, world
  </CompoundButton>
);

export const Circular = () => (
  <CompoundButton shape="circular" id={buttonId} secondaryContent="This is some secondary text">
    Hello, world
  </CompoundButton>
);

export const SizeSmall = () => (
  <CompoundButton id={buttonId} secondaryContent="This is some secondary text" icon={<CalendarMonth />} size="small">
    Hello, world
  </CompoundButton>
);

SizeSmall.storyName = 'Size small';

export const SizeLarge = () => (
  <CompoundButton id={buttonId} secondaryContent="This is some secondary text" icon={<CalendarMonth />} size="large">
    Hello, world
  </CompoundButton>
);

SizeLarge.storyName = 'Size large';

export const SizeSmallWithLongTextWrapping = () => {
  const styles = useStyles();
  return (
    <CompoundButton
      id={buttonId}
      className={styles.longText}
      secondaryContent="This is some secondary text"
      icon={<CalendarMonth />}
      size="small"
    >
      Long text wraps after it hits the max width of the component
    </CompoundButton>
  );
};

SizeSmallWithLongTextWrapping.storyName = 'Size small - with long text wrapping';

export const SizeMediumWithLongTextWrapping = () => {
  const styles = useStyles();
  return (
    <CompoundButton
      id={buttonId}
      className={styles.longText}
      secondaryContent="This is some secondary text"
      icon={<CalendarMonth />}
      size="medium"
    >
      Long text wraps after it hits the max width of the component
    </CompoundButton>
  );
};

SizeMediumWithLongTextWrapping.storyName = 'Size medium - with long text wrapping';

export const SizeLargeWithLongTextWrapping = () => {
  const styles = useStyles();
  return (
    <CompoundButton
      id={buttonId}
      className={styles.longText}
      secondaryContent="This is some secondary text"
      icon={<CalendarMonth />}
      size="large"
    >
      Long text wraps after it hits the max width of the component
    </CompoundButton>
  );
};

SizeLargeWithLongTextWrapping.storyName = 'Size large - with long text wrapping';

export const IconOnly = () => <CompoundButton id={buttonId} icon={<CalendarMonth />} />;

IconOnly.storyName = 'Icon only';

export const CircularAndIconOnly = () => <CompoundButton id={buttonId} shape="circular" icon={<CalendarMonth />} />;

CircularAndIconOnly.storyName = 'Circular and icon only';

export const CircularAndIconOnlyRTL = getStoryVariant(CircularAndIconOnly, RTL);
