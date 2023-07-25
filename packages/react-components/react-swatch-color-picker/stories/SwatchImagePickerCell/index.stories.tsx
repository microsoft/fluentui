import { SwatchImagePickerCell } from '@fluentui/react-swatch-color-picker';

import descriptionMd from './SwatchImagePickerCellDescription.md';
import bestPracticesMd from './SwatchImagePickerCellBestPractices.md';

export { Default } from './SwatchImagePickerCellDefault.stories';

export default {
  title: 'Preview Components/SwatchImagePickerCell',
  component: SwatchImagePickerCell,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
