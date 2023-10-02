import { MessageBar } from '@fluentui/react-message-bar-preview';

import descriptionMd from './MessageBarDescription.md';
import bestPracticesMd from './MessageBarBestPractices.md';

export { Default } from './Default.stories';
export { Dismiss } from './Dismiss.stories';
export { Reflow } from './Reflow.stories';
export { ManualLayout } from './ManualLayout.stories';
export { Animation } from './Animation.stories';

export default {
  title: 'Preview Components/MessageBar',
  component: MessageBar,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
