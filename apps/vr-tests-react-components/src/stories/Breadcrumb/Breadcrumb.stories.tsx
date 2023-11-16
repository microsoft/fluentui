import * as React from 'react';
import { Breadcrumb } from '@fluentui/react-breadcrumb';
import { SampleBreadcrumbButtons, steps } from './utils';
import { ComponentMeta } from '@storybook/react';
import { getStoryVariant, DARK_MODE, HIGH_CONTRAST, RTL, withStoryWrightSteps } from '../../utilities';

export default {
  title: 'Breadcrumb Converged',
  decorators: [story => withStoryWrightSteps({ story, steps })],
} as ComponentMeta<typeof Breadcrumb>;

export const Appearance = () => (
  <>
    <h1>BreadcrumbButton</h1>
    <SampleBreadcrumbButtons />
  </>
);

Appearance.storyName = 'appearance';

export const AppearanceDarkMode = getStoryVariant(Appearance, DARK_MODE);
export const AppearanceHighContrast = getStoryVariant(Appearance, HIGH_CONTRAST);
export const AppearanceRTL = getStoryVariant(Appearance, RTL);

export const Size = () => (
  <>
    <SampleBreadcrumbButtons size="small" />
    <SampleBreadcrumbButtons size="medium" />
    <SampleBreadcrumbButtons size="large" />
  </>
);

Size.storyName = 'size';
