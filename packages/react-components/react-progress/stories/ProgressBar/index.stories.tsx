import { ProgressBar } from '@fluentui/react-progress';

import descriptionMd from './ProgressBarDescription.md';
import bestPracticesMd from './ProgressBarBestPractices.md';

export { Default } from './ProgressBarDefault.stories';
export { Shape } from './ProgressBarShape.stories';
export { Thickness } from './ProgressBarThickness.stories';
export { Indeterminate } from './ProgressBarIndeterminate.stories';
export { ValidationState } from './ProgressBarValidationState.stories';
export { Max } from './ProgressBarMax.stories';

export default {
  title: 'Preview Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
