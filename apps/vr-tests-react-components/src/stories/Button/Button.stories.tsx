import * as React from 'react';
import { Button } from '@fluentui/react-button';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { ComponentMeta } from '@storybook/react';
import { getStoryVariant, withStoryWrightSteps, DARK_MODE, HIGH_CONTRAST, RTL } from '../../utilities';
import { buttonId, steps, useStyles } from './utils';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export default {
  title: 'Button Converged',
  Component: Button,
  decorators: [story => withStoryWrightSteps({ story, steps })],
} as ComponentMeta<typeof Button>;

export const Default = () => <Button id={buttonId}>Hello, world</Button>;

export const DefaultRTL = getStoryVariant(Default, RTL);
export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);
export const DefaultHighContrast = getStoryVariant(Default, HIGH_CONTRAST);

export const AsAnAnchor = () => (
  <Button id={buttonId} as="a" href="#">
    Hello, world
  </Button>
);

AsAnAnchor.storyName = 'As an anchor';

export const Circular = () => (
  <Button id={buttonId} shape="circular">
    Hello, world
  </Button>
);

export const Outline = () => (
  <Button id={buttonId} appearance="outline">
    Hello, world
  </Button>
);

export const Primary = () => (
  <Button id={buttonId} appearance="primary">
    Hello, world
  </Button>
);

export const PrimaryHighContrast = getStoryVariant(Primary, HIGH_CONTRAST);
export const PrimaryDarkMode = getStoryVariant(Primary, DARK_MODE);

export const Subtle = () => (
  <Button id={buttonId} appearance="subtle">
    Hello, world
  </Button>
);

export const SubtleHighContrast = getStoryVariant(Subtle, HIGH_CONTRAST);
export const SubtleDarkMode = getStoryVariant(Subtle, DARK_MODE);

export const Transparent = () => (
  <Button id={buttonId} appearance="transparent">
    Hello, world
  </Button>
);

export const TransparentHighContrast = getStoryVariant(Transparent, HIGH_CONTRAST);
export const TransparentDarkMode = getStoryVariant(Transparent, DARK_MODE);

export const Disabled = () => (
  <Button id={buttonId} disabled>
    Hello, world
  </Button>
);

export const DisabledHighContrast = getStoryVariant(Disabled, HIGH_CONTRAST);
export const DisabledDarkMode = getStoryVariant(Disabled, DARK_MODE);

export const OutlineDisabled = () => (
  <Button id={buttonId} appearance="outline" disabled>
    Hello, world
  </Button>
);

export const OutlineDisabledHighContrast = getStoryVariant(OutlineDisabled, HIGH_CONTRAST);
export const OutlineDisabledDarkMode = getStoryVariant(OutlineDisabled, DARK_MODE);

export const PrimaryDisabled = () => (
  <Button id={buttonId} appearance="primary" disabled>
    Hello, world
  </Button>
);

export const PrimaryDisabledHighContrast = getStoryVariant(PrimaryDisabled, HIGH_CONTRAST);
export const PrimaryDisabledDarkMode = getStoryVariant(PrimaryDisabled, DARK_MODE);

export const SubtleDisabled = () => (
  <Button id={buttonId} appearance="subtle" disabled>
    Hello, world
  </Button>
);

export const SubtleDisabledHighContrast = getStoryVariant(SubtleDisabled, HIGH_CONTRAST);
export const SubtleDisabledDarkMode = getStoryVariant(SubtleDisabled, DARK_MODE);

export const TransparentDisabled = () => (
  <Button id={buttonId} appearance="transparent" disabled>
    Hello, world
  </Button>
);

export const TransparentDisabledHighContrast = getStoryVariant(TransparentDisabled, HIGH_CONTRAST);
export const TransparentDisabledDarkMode = getStoryVariant(TransparentDisabled, DARK_MODE);

export const SizeSmall = () => (
  <Button id={buttonId} icon={<CalendarMonth />} size="small">
    Hello, world
  </Button>
);

SizeSmall.storyName = 'Size small';

export const SizeLarge = () => (
  <Button id={buttonId} icon={<CalendarMonth />} size="large">
    Hello, world
  </Button>
);

SizeLarge.storyName = 'Size large';

export const SizeSmallWithLongTextWrapping = () => {
  const styles = useStyles();
  return (
    <Button id={buttonId} className={styles.longText} icon={<CalendarMonth />} size="small">
      Long text wraps after it hits the max width of the component
    </Button>
  );
};

SizeSmallWithLongTextWrapping.storyName = 'Size small - with long text wrapping';

export const SizeMediumWithLongTextWrapping = () => {
  const styles = useStyles();
  return (
    <Button id={buttonId} className={styles.longText} icon={<CalendarMonth />} size="medium">
      Long text wraps after it hits the max width of the component
    </Button>
  );
};

SizeMediumWithLongTextWrapping.storyName = 'Size medium - with long text wrapping';

export const SizeLargeWithLongTextWrapping = () => {
  const styles = useStyles();
  return (
    <Button id={buttonId} className={styles.longText} icon={<CalendarMonth />} size="large">
      Long text wraps after it hits the max width of the component
    </Button>
  );
};

SizeLargeWithLongTextWrapping.storyName = 'Size large - with long text wrapping';

export const WithIconBeforeContent = () => (
  <Button id={buttonId} icon={<CalendarMonth />}>
    Hello, world
  </Button>
);

WithIconBeforeContent.storyName = 'With icon before content';

export const WithIconBeforeContentRTL = getStoryVariant(WithIconBeforeContent, RTL);

export const WithIconAfterContent = () => (
  <Button id={buttonId} icon={<CalendarMonth />} iconPosition="after">
    Hello, world
  </Button>
);

WithIconAfterContent.storyName = 'With icon after content';

export const WithIconAfterContentRTL = getStoryVariant(WithIconAfterContent, RTL);

export const IconOnly = () => <Button id={buttonId} icon={<CalendarMonth />} />;

IconOnly.storyName = 'Icon only';

export const CircularAndIconOnly = () => <Button id={buttonId} shape="circular" icon={<CalendarMonth />} />;

CircularAndIconOnly.storyName = 'Circular and icon only';

export const CircularAndIconOnlyRTL = getStoryVariant(CircularAndIconOnly, RTL);
