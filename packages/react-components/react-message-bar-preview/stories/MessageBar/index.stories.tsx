import { MessageBar, MessageBarGroup } from '@fluentui/react-message-bar-preview';

import descriptionMd from './MessageBarDescription.md';
import bestPracticesMd from './MessageBarBestPractices.md';

export { Default } from './Default.stories';
export { Intent } from './Intent.stories';
export { Shapes } from './Shapes.stories';
export { Dismiss } from './Dismiss.stories';
export { Animation } from './Animation.stories';
export { Reflow } from './Reflow.stories';
export { ManualLayout } from './ManualLayout.stories';

export default {
  title: 'Preview Components/MessageBar',
  component: MessageBar,
  subcomponents: {
    MessageBarGroup,
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
