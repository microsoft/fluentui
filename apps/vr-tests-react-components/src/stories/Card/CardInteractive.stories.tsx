import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { Card } from '@fluentui/react-card';
import { action } from '@storybook/addon-actions';
import { SampleCardContent } from './utils';
import { ComponentMeta } from '@storybook/react';
import { getStoryVariant, DARK_MODE, HIGH_CONTRAST } from '../../utilities';

export default {
  title: 'Card Converged - Interactive',

  decorators: [
    story => (
      <StoryWright
        steps={new Steps()
          .snapshot('normal', { cropTo: '.testWrapper' })
          .hover('[role="group"]')
          .snapshot('hover', { cropTo: '.testWrapper' })
          .mouseDown('[role="group"]')
          .snapshot('click', { cropTo: '.testWrapper' })
          .end()}
      >
        <div className="testWrapper" style={{ width: '300px' }}>
          {story()}
        </div>
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof Card>;

export const AppearanceInteractiveFilled = () => (
  <Card onClick={action('filled card clicked')} appearance="filled">
    <SampleCardContent />
  </Card>
);

AppearanceInteractiveFilled.storyName = 'appearance interactive - Filled';

export const AppearanceInteractiveFilledDarkMode = getStoryVariant(AppearanceInteractiveFilled, DARK_MODE);
export const AppearanceInteractiveFilledHighContrast = getStoryVariant(AppearanceInteractiveFilled, HIGH_CONTRAST);

export const AppearanceInteractiveFilledAlternative = () => (
  <Card onClick={action('filled alternative card clicked')} appearance="filled-alternative">
    <SampleCardContent />
  </Card>
);

AppearanceInteractiveFilledAlternative.storyName = 'appearance interactive - Filled Alternative';

export const AppearanceInteractiveFilledAlternativeDarkMode = getStoryVariant(
  AppearanceInteractiveFilledAlternative,
  DARK_MODE,
);
export const AppearanceInteractiveFilledAlternativeHighContrast = getStoryVariant(
  AppearanceInteractiveFilledAlternative,
  HIGH_CONTRAST,
);

export const AppearanceInteractiveOutline = () => (
  <Card onClick={action('outline card clicked')} appearance="outline">
    <SampleCardContent />
  </Card>
);

AppearanceInteractiveOutline.storyName = 'appearance interactive - Outline';

export const AppearanceInteractiveOutlineDarkMode = getStoryVariant(AppearanceInteractiveOutline, DARK_MODE);
export const AppearanceInteractiveOutlineHighContrast = getStoryVariant(AppearanceInteractiveOutline, HIGH_CONTRAST);

export const AppearanceInteractiveSubtle = () => (
  <Card onClick={action('subtle card clicked')} appearance="subtle">
    <SampleCardContent />
  </Card>
);

AppearanceInteractiveSubtle.storyName = 'appearance interactive - Subtle';

export const AppearanceInteractiveSubtleDarkMode = getStoryVariant(AppearanceInteractiveSubtle, DARK_MODE);
export const AppearanceInteractiveSubtleHighContrast = getStoryVariant(AppearanceInteractiveSubtle, HIGH_CONTRAST);
