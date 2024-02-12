import { PickerInput } from '@fluentui/react-picker-preview';

import descriptionMd from './PickerInputDescription.md';
import bestPracticesMd from './PickerInputBestPractices.md';

export { Default } from './PickerInputDefault.stories';

export default {
  title: 'Preview Components/PickerInput',
  component: PickerInput,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
