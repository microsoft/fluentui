import * as React from 'react';
import { Breadcrumb } from '@fluentui/react-breadcrumb-preview';
import { SampleBreadcrumbButtons, SampleBreadcrumbLinks, SampleBreadcrumbItems, steps } from './utils';
import { ComponentMeta } from '@storybook/react';
import { getStoryVariant, DARK_MODE, HIGH_CONTRAST, RTL, withStoryWrightSteps } from '../../utilities';

export default {
  title: 'Breadcrumb Converged',
  decorators: [story => withStoryWrightSteps({ story, steps })],
} as ComponentMeta<typeof Breadcrumb>;

export const Appearance = () => (
  <>
    <h1>BreadcrumbButton</h1>
    <h2>Transparent</h2>
    <SampleBreadcrumbButtons appearance="transparent" />
    <h2>Subtle</h2>
    <SampleBreadcrumbButtons appearance="subtle" />

    <h1>BreadcrumbLink</h1>
    <h2>Transparent</h2>
    <SampleBreadcrumbLinks appearance="transparent" />
    <h2>Subtle</h2>
    <SampleBreadcrumbLinks appearance="subtle" />
  </>
);

Appearance.storyName = 'appearance';

export const AppearanceDarkMode = getStoryVariant(Appearance, DARK_MODE);
export const AppearanceHighContrast = getStoryVariant(Appearance, HIGH_CONTRAST);
export const AppearanceRTL = getStoryVariant(Appearance, RTL);

export const Size = () => (
  <>
    <h1>BreadcrumbButton</h1>
    <SampleBreadcrumbButtons size="small" />
    <SampleBreadcrumbButtons size="medium" />
    <SampleBreadcrumbButtons size="large" />

    <h1>BreadcrumbLink</h1>
    <SampleBreadcrumbLinks size="small" />
    <SampleBreadcrumbLinks size="medium" />
    <SampleBreadcrumbLinks size="large" />

    <h1>BreadcrumbItem</h1>
    <SampleBreadcrumbItems size="small" />
    <SampleBreadcrumbItems size="medium" />
    <SampleBreadcrumbItems size="large" />
  </>
);

Size.storyName = 'size';

export const DividerType = () => (
  <>
    <h1>BreadcrumbButton</h1>
    <SampleBreadcrumbButtons dividerType="chevron" />

    <h1>BreadcrumbLink</h1>
    <SampleBreadcrumbLinks dividerType="chevron" />

    <h1>BreadcrumbItem</h1>
    <SampleBreadcrumbItems dividerType="slash" size="small" />
    <SampleBreadcrumbItems dividerType="chevron" />
  </>
);

DividerType.storyName = 'divider type';
