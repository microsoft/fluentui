import { MessageBarActions } from '@fluentui/react-message-bar-preview';

import descriptionMd from './MessageBarActionsDescription.md';
import bestPracticesMd from './MessageBarActionsBestPractices.md';

export { Default } from './MessageBarActionsDefault.stories';

export default {
  title: 'Preview Components/MessageBarActions',
  component: MessageBarActions,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
