import * as React from 'react';
import { SplitButton } from '@fluentui/react-button';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import type { Meta } from '@storybook/react';
import { getStoryVariant, DARK_MODE, HIGH_CONTRAST, RTL } from '../../utilities';
import { buttonId, steps, useStyles } from './utils';
import type { StoryParameters } from 'storywright';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export default {
  title: 'SplitButton Converged',
  component: SplitButton,
  parameters: { storyWright: { steps } } satisfies StoryParameters,
} satisfies Meta<typeof SplitButton>;

export const Default = () => <SplitButton id={buttonId}>Hello, world</SplitButton>;

export const DefaultRTL = getStoryVariant(Default, RTL);
export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);
export const DefaultHighContrast = getStoryVariant(Default, HIGH_CONTRAST);

export const Circular = () => (
  <SplitButton id={buttonId} shape="circular">
    Hello, world
  </SplitButton>
);

export const Square = () => (
  <SplitButton id={buttonId} shape="square">
    Hello, world
  </SplitButton>
);

export const Rounded = () => (
  <SplitButton id={buttonId} shape="rounded">
    Hello, world
  </SplitButton>
);

export const Outline = () => (
  <SplitButton id={buttonId} appearance="outline">
    Hello, world
  </SplitButton>
);

export const Primary = () => (
  <SplitButton id={buttonId} appearance="primary">
    Hello, world
  </SplitButton>
);

export const PrimaryHighContrast = getStoryVariant(Primary, HIGH_CONTRAST);
export const PrimaryDarkMode = getStoryVariant(Primary, DARK_MODE);

export const Subtle = () => (
  <SplitButton id={buttonId} appearance="subtle">
    Hello, world
  </SplitButton>
);

export const SubtleHighContrast = getStoryVariant(Subtle, HIGH_CONTRAST);
export const SubtleDarkMode = getStoryVariant(Subtle, DARK_MODE);

export const Transparent = () => (
  <SplitButton id={buttonId} appearance="transparent">
    Hello, world
  </SplitButton>
);

export const TransparentHighContrast = getStoryVariant(Transparent, HIGH_CONTRAST);
export const TransparentDarkMode = getStoryVariant(Transparent, DARK_MODE);

export const Disabled = () => (
  <SplitButton id={buttonId} disabled>
    Hello, world
  </SplitButton>
);

export const DisabledHighContrast = getStoryVariant(Disabled, HIGH_CONTRAST);
export const DisabledDarkMode = getStoryVariant(Disabled, DARK_MODE);

export const OutlineDisabled = () => (
  <SplitButton id={buttonId} appearance="outline" disabled>
    Hello, world
  </SplitButton>
);

export const OutlineDisabledHighContrast = getStoryVariant(OutlineDisabled, HIGH_CONTRAST);
export const OutlineDisabledDarkMode = getStoryVariant(OutlineDisabled, DARK_MODE);

export const PrimaryDisabled = () => (
  <SplitButton id={buttonId} appearance="primary" disabled>
    Hello, world
  </SplitButton>
);

export const PrimaryDisabledHighContrast = getStoryVariant(PrimaryDisabled, HIGH_CONTRAST);
export const PrimaryDisabledDarkMode = getStoryVariant(PrimaryDisabled, DARK_MODE);

export const SubtleDisabled = () => (
  <SplitButton id={buttonId} appearance="subtle" disabled>
    Hello, world
  </SplitButton>
);

export const SubtleDisabledHighContrast = getStoryVariant(SubtleDisabled, HIGH_CONTRAST);
export const SubtleDisabledDarkMode = getStoryVariant(SubtleDisabled, DARK_MODE);

export const TransparentDisabled = () => (
  <SplitButton id={buttonId} appearance="transparent" disabled>
    Hello, world
  </SplitButton>
);

export const TransparentDisabledHighContrast = getStoryVariant(TransparentDisabled, HIGH_CONTRAST);
export const TransparentDisabledDarkMode = getStoryVariant(TransparentDisabled, DARK_MODE);

export const SizeSmall = () => (
  <SplitButton id={buttonId} icon={<CalendarMonth />} size="small">
    Hello, world
  </SplitButton>
);

SizeSmall.storyName = 'Size small';

export const SizeLarge = () => (
  <SplitButton id={buttonId} icon={<CalendarMonth />} size="large">
    Hello, world
  </SplitButton>
);

SizeLarge.storyName = 'Size large';

export const SizeSmallWithLongTextWrapping = () => {
  const styles = useStyles();
  return (
    <SplitButton id={buttonId} className={styles.longText} icon={<CalendarMonth />} size="small">
      Long text wraps after it hits the max width of the component
    </SplitButton>
  );
};

SizeSmallWithLongTextWrapping.storyName = 'Size small - with long text wrapping';

export const SizeMediumWithLongTextWrapping = () => {
  const styles = useStyles();
  return (
    <SplitButton id={buttonId} className={styles.longText} icon={<CalendarMonth />} size="medium">
      Long text wraps after it hits the max width of the component
    </SplitButton>
  );
};

SizeMediumWithLongTextWrapping.storyName = 'Size medium - with long text wrapping';

export const SizeLargeWithLongTextWrapping = () => {
  const styles = useStyles();
  return (
    <SplitButton id={buttonId} className={styles.longText} icon={<CalendarMonth />} size="large">
      Long text wraps after it hits the max width of the component
    </SplitButton>
  );
};

SizeLargeWithLongTextWrapping.storyName = 'Size large - with long text wrapping';

export const WithIconBeforeContent = () => (
  <SplitButton id={buttonId} icon={<CalendarMonth />}>
    Hello, world
  </SplitButton>
);

WithIconBeforeContent.storyName = 'With icon before content';

export const WithIconBeforeContentRTL = getStoryVariant(WithIconBeforeContent, RTL);

export const WithIconAfterContent = () => (
  <SplitButton id={buttonId} icon={<CalendarMonth />} iconPosition="after">
    Hello, world
  </SplitButton>
);

WithIconAfterContent.storyName = 'With icon after content';

export const WithIconAfterContentRTL = getStoryVariant(WithIconAfterContent, RTL);

export const IconOnly = () => <SplitButton id={buttonId} icon={<CalendarMonth />} />;

IconOnly.storyName = 'Icon only';

export const CircularAndIconOnly = () => <SplitButton id={buttonId} shape="circular" icon={<CalendarMonth />} />;

CircularAndIconOnly.storyName = 'Circular and icon only';

export const CircularAndIconOnlyRTL = getStoryVariant(CircularAndIconOnly, RTL);
