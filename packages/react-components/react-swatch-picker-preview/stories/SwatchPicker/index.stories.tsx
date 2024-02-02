import { SwatchPicker } from '@fluentui/react-swatch-picker-preview';

import descriptionMd from './SwatchPickerDescription.md';
import bestPracticesMd from './SwatchPickerBestPractices.md';

export { Default } from './SwatchPickerDefault.stories';
export { SwatchPickerShape } from './SwatchPickerShape.stories';
export { SwatchPickerSize } from './SwatchPickerSize.stories';

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
