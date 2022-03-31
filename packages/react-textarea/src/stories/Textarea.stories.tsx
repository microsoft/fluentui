import { Textarea } from '../index';

import descriptionMd from './TextareaDescription.md';
import bestPracticesMd from './TextareaBestPractices.md';

export { Default } from './TextareaDefault.stories';

export default {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
