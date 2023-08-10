import { BreadcrumbLink } from '@fluentui/react-breadcrumb-preview';

import descriptionMd from './BreadcrumbLinkDescription.md';
import bestPracticesMd from './BreadcrumbLinkBestPractices.md';

export { Default } from './BreadcrumbLinkDefault.stories';

export default {
  title: 'Preview Components/Breadcrumb/BreadcrumbLink',
  component: BreadcrumbLink,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
