import { TeachingPopoverBody } from '@fluentui/react-teaching-popover-preview';

import descriptionMd from './TeachingPopoverBodyDescription.md';
import bestPracticesMd from './TeachingPopoverBodyBestPractices.md';

export { Default } from './TeachingPopoverBodyDefault.stories';

export default {
  title: 'Preview Components/TeachingPopoverBody',
  component: TeachingPopoverBody,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
