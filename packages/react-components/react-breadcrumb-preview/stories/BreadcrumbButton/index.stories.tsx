import { BreadcrumbButton } from '@fluentui/react-breadcrumb-preview';

import descriptionMd from './BreadcrumbButtonDescription.md';
import bestPracticesMd from './BreadcrumbButtonBestPractices.md';

export { Default } from './BreadcrumbButtonDefault.stories';

export default {
  title: 'Preview Components/Breadcrumb/BreadcrumbButton',
  component: BreadcrumbButton,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
