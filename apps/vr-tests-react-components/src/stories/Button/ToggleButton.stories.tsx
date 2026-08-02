import * as React from 'react';
import { ToggleButton } from '@fluentui/react-button';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import type { Meta } from '@storybook/react-webpack5';
import { getStoryVariant, DARK_MODE, HIGH_CONTRAST, RTL } from '../../utilities';
import { buttonId, steps, useStyles } from './utils';
import type { StoryParameters } from 'storywright';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export default {
  title: 'ToggleButton Converged',
  component: ToggleButton,
  parameters: { storyWright: { steps } } satisfies StoryParameters,
} satisfies Meta<typeof ToggleButton>;

export const Default = () => <ToggleButton id={buttonId}>Hello, world</ToggleButton>;

export const DefaultRTL = getStoryVariant(Default, RTL);
export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);
export const DefaultHighContrast = getStoryVariant(Default, HIGH_CONTRAST);

export const Circular = () => (
  <ToggleButton id={buttonId} shape="circular">
    Hello, world
  </ToggleButton>
);

export const Outline = () => (
  <ToggleButton id={buttonId} appearance="outline">
    Hello, world
  </ToggleButton>
);

export const Primary = () => (
  <ToggleButton id={buttonId} appearance="primary">
    Hello, world
  </ToggleButton>
);

export const PrimaryHighContrast = getStoryVariant(Primary, HIGH_CONTRAST);
export const PrimaryDarkMode = getStoryVariant(Primary, DARK_MODE);

export const Subtle = () => (
  <ToggleButton id={buttonId} appearance="subtle">
    Hello, world
  </ToggleButton>
);

export const Transparent = () => (
  <ToggleButton id={buttonId} appearance="transparent">
    Hello, world
  </ToggleButton>
);

export const Disabled = () => (
  <ToggleButton id={buttonId} disabled>
    Hello, world
  </ToggleButton>
);

export const PrimaryDisabled = () => (
  <ToggleButton id={buttonId} appearance="primary" disabled>
    Hello, world
  </ToggleButton>
);

export const SubtleDisabled = () => (
  <ToggleButton id={buttonId} appearance="subtle" disabled>
    Hello, world
  </ToggleButton>
);

export const TransparentDisabled = () => (
  <ToggleButton id={buttonId} appearance="transparent" disabled>
    Hello, world
  </ToggleButton>
);

export const SizeSmall = () => (
  <ToggleButton id={buttonId} icon={<CalendarMonth />} size="small">
    Hello, world
  </ToggleButton>
);

SizeSmall.storyName = 'Size small';

export const SizeLarge = () => (
  <ToggleButton id={buttonId} icon={<CalendarMonth />} size="large">
    Hello, world
  </ToggleButton>
);

SizeLarge.storyName = 'Size large';

export const SizeSmallWithLongTextWrapping = () => {
  const styles = useStyles();
  return (
    <ToggleButton id={buttonId} className={styles.longText} icon={<CalendarMonth />} size="small">
      Long text wraps after it hits the max width of the component
    </ToggleButton>
  );
};

SizeSmallWithLongTextWrapping.storyName = 'Size small - with long text wrapping';

export const SizeMediumWithLongTextWrapping = () => {
  const styles = useStyles();
  return (
    <ToggleButton id={buttonId} className={styles.longText} icon={<CalendarMonth />} size="medium">
      Long text wraps after it hits the max width of the component
    </ToggleButton>
  );
};

SizeMediumWithLongTextWrapping.storyName = 'Size medium - with long text wrapping';

export const SizeLargeWithLongTextWrapping = () => {
  const styles = useStyles();
  return (
    <ToggleButton id={buttonId} className={styles.longText} icon={<CalendarMonth />} size="large">
      Long text wraps after it hits the max width of the component
    </ToggleButton>
  );
};

SizeLargeWithLongTextWrapping.storyName = 'Size large - with long text wrapping';

export const WithIconBeforeContent = () => (
  <ToggleButton id={buttonId} icon={<CalendarMonth />}>
    Hello, world
  </ToggleButton>
);

WithIconBeforeContent.storyName = 'With icon before content';

export const WithIconAfterContent = () => (
  <ToggleButton id={buttonId} icon={<CalendarMonth />} iconPosition="after">
    Hello, world
  </ToggleButton>
);

WithIconAfterContent.storyName = 'With icon after content';

export const IconOnly = () => <ToggleButton id={buttonId} icon={<CalendarMonth />} />;

IconOnly.storyName = 'Icon only';

export const CircularAndIconOnly = () => <ToggleButton id={buttonId} shape="circular" icon={<CalendarMonth />} />;

CircularAndIconOnly.storyName = 'Circular and icon only';

export const Checked = () => (
  <ToggleButton id={buttonId} checked>
    Hello, world
  </ToggleButton>
);

export const PrimaryChecked = () => (
  <ToggleButton id={buttonId} appearance="primary" checked>
    Hello, world
  </ToggleButton>
);

export const SubtleChecked = () => (
  <ToggleButton id={buttonId} appearance="subtle" checked>
    Hello, world
  </ToggleButton>
);

export const TransparentChecked = () => (
  <ToggleButton id={buttonId} appearance="transparent" checked>
    Hello, world
  </ToggleButton>
);

/*
 * S-J state-matrix stories (griffel-zero-plan.md §2.2): `useRootCheckedStyles.base`'s
 * bundled-icon swap (filled shown while checked) had no pixel evidence — no story above
 * combines `checked` with a bundled icon. The Disabled variant additionally pins the
 * cross-module winner: ToggleButton's checked swap must beat Button's disabled-any
 * hover/pressed swap-BACK (the filled glyph stays, even under the steps' forced
 * hover/pressed), exactly as it did when both blocks were unlayered and file position
 * decided.
 */
export const CheckedWithIcon = () => (
  <ToggleButton id={buttonId} checked icon={<CalendarMonth />}>
    Hello, world
  </ToggleButton>
);

CheckedWithIcon.storyName = 'Checked with icon';

export const CheckedDisabledWithIcon = () => (
  <ToggleButton id={buttonId} checked disabled icon={<CalendarMonth />}>
    Hello, world
  </ToggleButton>
);

CheckedDisabledWithIcon.storyName = 'Checked Disabled with icon';
