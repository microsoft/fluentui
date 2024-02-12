import { PickerOption } from '@fluentui/react-picker-preview';

import descriptionMd from './PickerOptionDescription.md';
import bestPracticesMd from './PickerOptionBestPractices.md';

export { Default } from './PickerOptionDefault.stories';

export default {
  title: 'Preview Components/PickerOption',
  component: PickerOption,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
