import { Breadcrumb } from '@fluentui/react-breadcrumb';

import descriptionMd from './BreadcrumbDescription.md';
import bestPracticesMd from './BreadcrumbBestPractices.md';

export { Default } from './BreadcrumbDefault.stories';

export default {
  title: 'Preview Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
