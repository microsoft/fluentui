import { Picker } from '@fluentui/react-picker-preview';

import descriptionMd from './PickerDescription.md';
import bestPracticesMd from './PickerBestPractices.md';

export { Default } from './PickerDefault.stories';

export default {
  title: 'Preview Components/Picker',
  component: Picker,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
