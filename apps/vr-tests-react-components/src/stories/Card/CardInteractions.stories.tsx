import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { Card } from '@fluentui/react-card';
import { action } from '@storybook/addon-actions';
import { SampleCardContent } from './utils';
import { ComponentMeta } from '@storybook/react';
import { getStoryVariant, DARK_MODE, HIGH_CONTRAST, RTL } from '../../utilities';

export default {
  title: 'Card Converged',

  decorators: [
    story => (
      <Screener
        steps={new Screener.Steps()
          .snapshot('normal', { cropTo: '.testWrapper' })
          .hover('[role="group"]')
          .snapshot('focused', { cropTo: '.testWrapper' })
          .mouseDown('[role="group"]')
          .snapshot('clicked', { cropTo: '.testWrapper' })
          .end()}
      >
        <div className="testWrapper" style={{ width: '300px' }}>
          {story()}
        </div>
      </Screener>
    ),
  ],
} as ComponentMeta<typeof Card>;

export const AppearanceInteractiveFilled = () => (
  <Card onClick={action('filled card clicked')} appearance="filled">
    <SampleCardContent />
  </Card>
);

AppearanceInteractiveFilled.story = {
  name: 'appearance interactive - Filled',

  parameters: {
    includeRtl: true,
    includeHighContrast: true,
    includeDarkMode: true,
  },
};

export const AppearanceInteractiveFilledDarkMode = getStoryVariant(AppearanceInteractiveFilled, DARK_MODE);
export const AppearanceInteractiveFilledHighContrast = getStoryVariant(AppearanceInteractiveFilled, HIGH_CONTRAST);
export const AppearanceInteractiveFilledRTL = getStoryVariant(AppearanceInteractiveFilled, RTL);

export const AppearanceInteractiveFilledAlternative = () => (
  <Card onClick={action('filled alternative card clicked')} appearance="filled-alternative">
    <SampleCardContent />
  </Card>
);

AppearanceInteractiveFilledAlternative.story = {
  name: 'appearance interactive - Filled Alternative',

  parameters: {
    includeRtl: true,
    includeHighContrast: true,
    includeDarkMode: true,
  },
};

export const AppearanceInteractiveFilledAlternativeDarkMode = getStoryVariant(
  AppearanceInteractiveFilledAlternative,
  DARK_MODE,
);
export const AppearanceInteractiveFilledAlternativeHighContrast = getStoryVariant(
  AppearanceInteractiveFilledAlternative,
  HIGH_CONTRAST,
);
export const AppearanceInteractiveFilledAlternativeRTL = getStoryVariant(AppearanceInteractiveFilledAlternative, RTL);

export const AppearanceInteractiveOutline = () => (
  <Card onClick={action('outline card clicked')} appearance="outline">
    <SampleCardContent />
  </Card>
);

AppearanceInteractiveOutline.story = {
  name: 'appearance interactive - Outline',

  parameters: {
    includeRtl: true,
    includeHighContrast: true,
    includeDarkMode: true,
  },
};

export const AppearanceInteractiveOutlineDarkMode = getStoryVariant(AppearanceInteractiveOutline, DARK_MODE);
export const AppearanceInteractiveOutlineHighContrast = getStoryVariant(AppearanceInteractiveOutline, HIGH_CONTRAST);
export const AppearanceInteractiveOutlineRTL = getStoryVariant(AppearanceInteractiveOutline, RTL);

export const AppearanceInteractiveSubtle = () => (
  <Card onClick={action('subtle card clicked')} appearance="subtle">
    <SampleCardContent />
  </Card>
);

AppearanceInteractiveSubtle.story = {
  name: 'appearance interactive - Subtle',

  parameters: {
    includeRtl: true,
    includeHighContrast: true,
    includeDarkMode: true,
  },
};

export const AppearanceInteractiveSubtleDarkMode = getStoryVariant(AppearanceInteractiveSubtle, DARK_MODE);
export const AppearanceInteractiveSubtleHighContrast = getStoryVariant(AppearanceInteractiveSubtle, HIGH_CONTRAST);
export const AppearanceInteractiveSubtleRTL = getStoryVariant(AppearanceInteractiveSubtle, RTL);
