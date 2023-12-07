import { TeachingPopoverActions } from '@fluentui/react-teaching-popover-preview';

import descriptionMd from './TeachingPopoverActionsDescription.md';
import bestPracticesMd from './TeachingPopoverActionsBestPractices.md';

export { Default } from './TeachingPopoverActionsDefault.stories';

export default {
  title: 'Preview Components/TeachingPopoverActions',
  component: TeachingPopoverActions,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
