import { TeachingPopoverPageCount } from '@fluentui/react-teaching-popover-preview';

import descriptionMd from './TeachingPopoverPageCountDescription.md';
import bestPracticesMd from './TeachingPopoverPageCountBestPractices.md';

export { Default } from './TeachingPopoverPageCountDefault.stories';

export default {
  title: 'Preview Components/TeachingPopoverPageCount',
  component: TeachingPopoverPageCount,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
