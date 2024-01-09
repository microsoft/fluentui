import { TablePicker } from '@fluentui/react-swatch-picker-preview';

import descriptionMd from './TablePickerDescription.md';
import bestPracticesMd from './TablePickerBestPractices.md';

export { Default } from './TablePickerDefault.stories';

export default {
  title: 'Preview Components/TablePicker',
  component: TablePicker,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
