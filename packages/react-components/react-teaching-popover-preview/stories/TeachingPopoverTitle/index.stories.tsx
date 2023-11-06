import { TeachingPopoverTitle } from '@fluentui/react-teaching-popover-preview';

import descriptionMd from './TeachingPopoverTitleDescription.md';
import bestPracticesMd from './TeachingPopoverTitleBestPractices.md';

export { Default } from './TeachingPopoverTitleDefault.stories';

export default {
  title: 'Preview Components/TeachingPopoverTitle',
  component: TeachingPopoverTitle,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
