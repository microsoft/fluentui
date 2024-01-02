import { RadioPicker } from '@fluentui/react-swatch-picker-preview';

import descriptionMd from './RadioPickerDescription.md';
import bestPracticesMd from './RadioPickerBestPractices.md';

export { Default } from './RadioPickerDefault.stories';

export default {
  title: 'Preview Components/RadioPicker',
  component: RadioPicker,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
