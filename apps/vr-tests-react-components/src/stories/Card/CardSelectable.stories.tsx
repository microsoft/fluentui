import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { Card } from '@fluentui/react-card';
import { SampleCardContent } from './utils';
import { ComponentMeta } from '@storybook/react';
import { getStoryVariant, DARK_MODE, HIGH_CONTRAST, RTL } from '../../utilities';

export default {
  title: 'Card Converged - Selectable',

  decorators: [
    story => (
      <StoryWright
        steps={new Steps()
          .snapshot('normal', { cropTo: '.testWrapper' })
          .hover('[role="group"]')
          .snapshot('hover', { cropTo: '.testWrapper' })
          .mouseDown('[role="group"]')
          .snapshot('click', { cropTo: '.testWrapper' })
          .mouseUp('[role="group"]')
          .snapshot('selected', { cropTo: '.testWrapper' })
          .end()}
      >
        <div className="testWrapper" style={{ width: '300px' }}>
          {story()}
        </div>
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof Card>;

export const AppearanceSelectableFilled = () => (
  <Card defaultSelected={false} appearance="filled">
    <SampleCardContent />
  </Card>
);

AppearanceSelectableFilled.storyName = 'appearance selectable - Filled';

export const AppearanceSelectableFilledDarkMode = getStoryVariant(AppearanceSelectableFilled, DARK_MODE);
export const AppearanceSelectableFilledHighContrast = getStoryVariant(AppearanceSelectableFilled, HIGH_CONTRAST);
export const AppearanceSelectableFilledRTL = getStoryVariant(AppearanceSelectableFilled, RTL);

export const AppearanceSelectableFilledAlternative = () => (
  <Card defaultSelected={false} appearance="filled-alternative">
    <SampleCardContent />
  </Card>
);

AppearanceSelectableFilledAlternative.storyName = 'appearance selectable - Filled Alternative';

export const AppearanceSelectableFilledAlternativeDarkMode = getStoryVariant(
  AppearanceSelectableFilledAlternative,
  DARK_MODE,
);
export const AppearanceSelectableFilledAlternativeHighContrast = getStoryVariant(
  AppearanceSelectableFilledAlternative,
  HIGH_CONTRAST,
);
export const AppearanceSelectableFilledAlternativeRTL = getStoryVariant(AppearanceSelectableFilledAlternative, RTL);

export const AppearanceSelectableOutline = () => (
  <Card defaultSelected={false} appearance="outline">
    <SampleCardContent />
  </Card>
);

AppearanceSelectableOutline.storyName = 'appearance selectable - Outline';

export const AppearanceSelectableOutlineDarkMode = getStoryVariant(AppearanceSelectableOutline, DARK_MODE);
export const AppearanceSelectableOutlineHighContrast = getStoryVariant(AppearanceSelectableOutline, HIGH_CONTRAST);
export const AppearanceSelectableOutlineRTL = getStoryVariant(AppearanceSelectableOutline, RTL);

export const AppearanceSelectableSubtle = () => (
  <Card defaultSelected={false} appearance="subtle">
    <SampleCardContent />
  </Card>
);

AppearanceSelectableSubtle.storyName = 'appearance selectable - Subtle';

export const AppearanceSelectableSubtleDarkMode = getStoryVariant(AppearanceSelectableSubtle, DARK_MODE);
export const AppearanceSelectableSubtleHighContrast = getStoryVariant(AppearanceSelectableSubtle, HIGH_CONTRAST);
export const AppearanceSelectableSubtleRTL = getStoryVariant(AppearanceSelectableSubtle, RTL);

export const AppearanceFocusableSelectable = () => (
  <Card focusMode="no-tab" defaultSelected={false}>
    <SampleCardContent />
  </Card>
);

AppearanceFocusableSelectable.storyName = 'appearance focusable + selectable';
