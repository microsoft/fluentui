import { PromptInput } from '@fluentui/react-combobox';

import descriptionMd from './PromptInputDescription.md';
import bestPracticesMd from './PromptInputBestPractices.md';

export { Default } from './PromptInputDefault.stories';

export default {
  title: 'Components/PromptInput',
  component: PromptInput,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
