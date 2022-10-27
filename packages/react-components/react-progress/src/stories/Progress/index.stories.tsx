import { Progress } from '@fluentui/react-progress';

import descriptionMd from './ProgressDescription.md';
import bestPracticesMd from './ProgressBestPractices.md';

export { Default } from './ProgressDefault.stories';
export { Shape } from './ProgressShape.stories';
export { Thickness } from './ProgressBarThickness.stories';
export { Indeterminate } from './ProgressIndeterminate.stories';
export { ValidationState } from './ProgressValidationState.stories';
export { Max } from './ProgressMax.stories';

export default {
  title: 'Preview Components/Progress',
  component: Progress,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
