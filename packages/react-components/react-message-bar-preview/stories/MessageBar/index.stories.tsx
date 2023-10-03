import { MessageBar, MessageBarGroup } from '@fluentui/react-message-bar-preview';

import descriptionMd from './MessageBarDescription.md';
import bestPracticesMd from './MessageBarBestPractices.md';

export { Default } from './Default.stories';
export { A11yTest } from './A11yTest.stories';

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
