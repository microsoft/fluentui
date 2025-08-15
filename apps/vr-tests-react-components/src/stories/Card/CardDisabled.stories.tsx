import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { Card } from '@fluentui/react-card';
import { SampleCardContent } from './utils';
import type { Meta } from '@storybook/react';
import { getStoryVariant, DARK_MODE, HIGH_CONTRAST } from '../../utilities';

export default {
  title: 'Card Converged - Disabled',

  decorators: [
    story => (
      <StoryWright
        steps={new Steps()
          .snapshot('normal', { cropTo: '.testWrapper' })
          .hover('[role="group"]')
          .snapshot('hover', { cropTo: '.testWrapper' })
          .end()}
      >
        <div className="testWrapper" style={{ width: '300px' }}>
          {story()}
        </div>
      </StoryWright>
    ),
  ],
} satisfies Meta<typeof Card>;

export const AppearanceDisabledFilled = () => (
  <Card disabled appearance="filled">
    <SampleCardContent controlsDisabled />
  </Card>
);

AppearanceDisabledFilled.storyName = 'appearance disabled - Filled';

export const AppearanceDisabledFilledDarkMode = getStoryVariant(AppearanceDisabledFilled, DARK_MODE);
export const AppearanceDisabledFilledHighContrast = getStoryVariant(AppearanceDisabledFilled, HIGH_CONTRAST);

export const AppearanceDisabledFilledAlternative = () => (
  <Card disabled appearance="filled-alternative">
    <SampleCardContent controlsDisabled />
  </Card>
);

AppearanceDisabledFilledAlternative.storyName = 'appearance disabled - Filled Alternative';

export const AppearanceDisabledFilledAlternativeDarkMode = getStoryVariant(
  AppearanceDisabledFilledAlternative,
  DARK_MODE,
);
export const AppearanceDisabledFilledAlternativeHighContrast = getStoryVariant(
  AppearanceDisabledFilledAlternative,
  HIGH_CONTRAST,
);

export const AppearanceDisabledOutline = () => (
  <Card disabled appearance="outline">
    <SampleCardContent controlsDisabled />
  </Card>
);

AppearanceDisabledOutline.storyName = 'appearance disabled - Outline';

export const AppearanceDisabledOutlineDarkMode = getStoryVariant(AppearanceDisabledOutline, DARK_MODE);
export const AppearanceDisabledOutlineHighContrast = getStoryVariant(AppearanceDisabledOutline, HIGH_CONTRAST);

export const AppearanceDisabledSubtle = () => (
  <Card disabled appearance="subtle">
    <SampleCardContent controlsDisabled />
  </Card>
);

AppearanceDisabledSubtle.storyName = 'appearance disabled - Subtle';

export const AppearanceDisabledSubtleDarkMode = getStoryVariant(AppearanceDisabledSubtle, DARK_MODE);
export const AppearanceDisabledSubtleHighContrast = getStoryVariant(AppearanceDisabledSubtle, HIGH_CONTRAST);

export const AppearanceDisabledInteractive = () => (
  <Card disabled onClick={() => console.log('This should not trigger')}>
    <SampleCardContent controlsDisabled />
  </Card>
);

AppearanceDisabledInteractive.storyName = 'appearance disabled + interactive';

export const AppearanceDisabledInteractiveDarkMode = getStoryVariant(AppearanceDisabledInteractive, DARK_MODE);
export const AppearanceDisabledInteractiveHighContrast = getStoryVariant(AppearanceDisabledInteractive, HIGH_CONTRAST);

export const AppearanceDisabledSelectable = () => (
  <Card disabled defaultSelected={false}>
    <SampleCardContent controlsDisabled />
  </Card>
);

AppearanceDisabledSelectable.storyName = 'appearance disabled + selectable';

export const AppearanceDisabledSelectableDarkMode = getStoryVariant(AppearanceDisabledSelectable, DARK_MODE);
export const AppearanceDisabledSelectableHighContrast = getStoryVariant(AppearanceDisabledSelectable, HIGH_CONTRAST);
