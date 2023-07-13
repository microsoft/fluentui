import { BreadcrumbItem } from '@fluentui/react-breadcrumb';

import descriptionMd from './BreadcrumbItemDescription.md';
import bestPracticesMd from './BreadcrumbItemBestPractices.md';

export { Default } from './BreadcrumbItemDefault.stories';

export default {
  title: 'Preview Components/BreadcrumbItem',
  component: BreadcrumbItem,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
