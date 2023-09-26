import { Messagebar } from '@fluentui/react-message-bar-preview';

import descriptionMd from './MessagebarDescription.md';
import bestPracticesMd from './MessagebarBestPractices.md';

export { Default } from './MessagebarDefault.stories';

export default {
  title: 'Preview Components/Messagebar',
  component: Messagebar,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
