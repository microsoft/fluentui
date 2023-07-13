import { BreadcrumbDivider } from '@fluentui/react-breadcrumb';

import descriptionMd from './BreadcrumbDividerDescription.md';
import bestPracticesMd from './BreadcrumbDividerBestPractices.md';

export { Default } from './BreadcrumbDividerDefault.stories';

export default {
  title: 'Preview Components/BreadcrumbDivider',
  component: BreadcrumbDivider,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
