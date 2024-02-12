import { PickerListbox } from '@fluentui/react-picker-preview';

import descriptionMd from './PickerListboxDescription.md';
import bestPracticesMd from './PickerListboxBestPractices.md';

export { Default } from './PickerListboxDefault.stories';

export default {
  title: 'Preview Components/PickerListbox',
  component: PickerListbox,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
