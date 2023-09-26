import { Breadcrumb, BreadcrumbButton, BreadcrumbItem, BreadcrumbDivider } from '@fluentui/react-breadcrumb-preview';

import descriptionMd from './BreadcrumbDescription.md';
import bestPracticesMd from './BreadcrumbBestPractices.md';
export { Default } from './BreadcrumbDefault.stories';
export { BreadcrumbButtonExample } from '../BreadcrumbButton/BreadcrumbButton.stories';
export { BreadcrumbButtonWithHrefAttribute } from '../BreadcrumbButton/BreadcrumbButtonWithHrefAttribute.stories';
export { BreadcrumbItemExample } from '../BreadcrumbItem/BreadcrumbItemExample.stories';
export { BreadcrumbDividerExample } from '../BreadcrumbDivider/BreadcrumbDivider.stories';
export { BreadcrumbSize } from './BreadcrumbSize.stories';
export { BreadcrumbWithOverflow } from './BreadcrumbWithOverflow.stories';
export { BreadcrumbWithTooltip } from './BreadcrumbWithTooltip.stories';
export { BreadcrumbFocusMode } from './BreadcrumbFocusMode.stories';

import { ComponentMeta } from '@storybook/react';

const metadata: ComponentMeta<typeof Breadcrumb> = {
  title: 'Preview Components/Breadcrumb',
  component: Breadcrumb,
  subcomponents: {
    BreadcrumbButton,
    BreadcrumbItem,
    BreadcrumbDivider,
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};

export default metadata;
