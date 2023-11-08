import { SwatchPicker } from '@fluentui/react-swatch-picker-preview';

import descriptionMd from './SwatchPickerDescription.md';
import bestPracticesMd from './SwatchPickerBestPractices.md';

export { Default } from './SwatchPickerDefault.stories';

export default {
  title: 'Preview Components/SwatchPicker',
  component: SwatchPicker,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
