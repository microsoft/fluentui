import { Breadcrumb, BreadcrumbButton, BreadcrumbItem, BreadcrumbDivider } from '@fluentui/react-components';
import descriptionMd from './BreadcrumbDescription.md';
export { Default } from './BreadcrumbDefault.stories';
export { BreadcrumbSize } from './BreadcrumbSize.stories';
export { BreadcrumbWithOverflow } from './BreadcrumbWithOverflow.stories';
export { BreadcrumbWithTooltip } from './BreadcrumbWithTooltip.stories';

import { ComponentMeta } from '@storybook/react';

const metadata: ComponentMeta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  subcomponents: {
    BreadcrumbItem,
    BreadcrumbButton,
    BreadcrumbDivider,
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};

export default metadata;
