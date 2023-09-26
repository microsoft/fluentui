import { Breadcrumb, BreadcrumbButton, BreadcrumbItem, BreadcrumbDivider } from '@fluentui/react-breadcrumb-preview';

import descriptionMd from './BreadcrumbDescription.md';
import bestPracticesMd from './BreadcrumbBestPractices.md';
export { Default } from './BreadcrumbDefault.stories';
export { BreadcrumbButtonAppearanceSubtle } from '../BreadcrumbButton/BreadcrumbButtonAppearanceSubtle.stories';
export { BreadcrumbButtonWithHrefAttribute } from '../BreadcrumbButton/BreadcrumbButtonWithHrefAttribute.stories';
export { BreadcrumbItemExample } from '../BreadcrumbItem/BreadcrumbItem.stories';
export { BreadcrumbSlashDivider } from '../BreadcrumbDivider/BreadcrumbSlashDivider.stories';
export { BreadcrumbSize } from './BreadcrumbSize.stories';
export { FocusModeArrow } from './BreadcrumbFocusMode.stories';
export { BreadcrumbWithOverflow } from './BreadcrumbWithOverflow.stories';
export { BreadcrumbWithTooltip } from './BreadcrumbWithTooltip.stories';

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
