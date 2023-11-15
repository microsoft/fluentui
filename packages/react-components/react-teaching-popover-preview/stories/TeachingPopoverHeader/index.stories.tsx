import { TeachingPopoverHeader } from '@fluentui/react-teaching-popover-preview';

import descriptionMd from './TeachingPopoverHeaderDescription.md';
import bestPracticesMd from './TeachingPopoverHeaderBestPractices.md';

export { Default } from './TeachingPopoverHeaderDefault.stories';

export default {
  title: 'Preview Components/TeachingPopoverHeader',
  component: TeachingPopoverHeader,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
