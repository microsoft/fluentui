import { TagButton } from '@fluentui/react-tags';

import descriptionMd from './TagButtonDescription.md';
import bestPracticesMd from './TagButtonBestPractices.md';

export { Default } from './TagButtonDefault.stories';

export default {
  title: 'Preview Components/TagButton',
  component: TagButton,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
