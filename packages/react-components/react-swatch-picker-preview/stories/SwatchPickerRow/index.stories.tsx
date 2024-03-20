import { SwatchPickerRow } from '@fluentui/react-swatch-picker-preview';

import descriptionMd from './SwatchPickerRowDescription.md';
import bestPracticesMd from './SwatchPickerRowBestPractices.md';

export { Default } from './SwatchPickerRowDefault.stories';

export default {
  title: 'Preview Components/SwatchPickerRow',
  component: SwatchPickerRow,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
