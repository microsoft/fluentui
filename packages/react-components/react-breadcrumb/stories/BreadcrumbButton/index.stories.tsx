import { BreadcrumbButton } from '@fluentui/react-breadcrumb';

import descriptionMd from './BreadcrumbButtonDescription.md';
import bestPracticesMd from './BreadcrumbButtonBestPractices.md';

export { Default } from './BreadcrumbButtonDefault.stories';

export default {
  title: 'Preview Components/BreadcrumbButton',
  component: BreadcrumbButton,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
