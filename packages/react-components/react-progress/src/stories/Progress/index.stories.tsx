import { Progress } from '@fluentui/react-progress';

import descriptionMd from './ProgressDescription.md';
import bestPracticesMd from './ProgressBestPractices.md';

export { Default } from './ProgressDefault.stories';
export { Appearance } from './ProgressAppearance.stories';
export { Thickness } from './ProgressBarThickness.stories';
export { Types } from './ProgressTypes.stories';

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
