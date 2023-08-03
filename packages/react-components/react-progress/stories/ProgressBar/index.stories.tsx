import { ProgressBar } from '@fluentui/react-components';

import descriptionMd from './ProgressBarDescription.md';
import bestPracticesMd from './ProgressBarBestPractices.md';

export { Default } from './ProgressBarDefault.stories';
export { Color } from './ProgressBarColor.stories';
export { Indeterminate } from './ProgressBarIndeterminate.stories';
export { Max } from './ProgressBarMax.stories';
export { Shape } from './ProgressBarShape.stories';
export { Thickness } from './ProgressBarThickness.stories';

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
