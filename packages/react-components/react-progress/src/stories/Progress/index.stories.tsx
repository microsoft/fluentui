import { Progress } from '../../components/Progress/Progress';

import descriptionMd from './ProgressDescription.md';
import bestPracticesMd from './ProgressBestPractices.md';

export { Default } from './ProgressDefault.stories';

export default {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
