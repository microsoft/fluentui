import { BreadcrumbItem } from '@fluentui/react-breadcrumb-preview';

import descriptionMd from './BreadcrumbItemDescription.md';
import bestPracticesMd from './BreadcrumbItemBestPractices.md';

export { Default } from './BreadcrumbItemDefault.stories';

export default {
  title: 'Preview Components/Breadcrumb/BreadcrumbItem',
  component: BreadcrumbItem,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
