import { MessageBarBody } from '@fluentui/react-message-bar-preview';

import descriptionMd from './MessageBarBodyDescription.md';
import bestPracticesMd from './MessageBarBodyBestPractices.md';

export { Default } from './MessageBarBodyDefault.stories';

export default {
  title: 'Preview Components/MessageBarBody',
  component: MessageBarBody,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
