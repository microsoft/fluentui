import { PickerList } from '@fluentui/react-picker-preview';

import descriptionMd from './PickerListDescription.md';
import bestPracticesMd from './PickerListBestPractices.md';

export { Default } from './PickerListDefault.stories';

export default {
  title: 'Preview Components/PickerList',
  component: PickerList,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
