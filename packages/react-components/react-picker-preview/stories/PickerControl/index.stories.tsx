import { PickerControl } from '@fluentui/react-picker-preview';

import descriptionMd from './PickerControlDescription.md';
import bestPracticesMd from './PickerControlBestPractices.md';

export { Default } from './PickerControlDefault.stories';

export default {
  title: 'Preview Components/PickerControl',
  component: PickerControl,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
