import { PickerTagGroup } from '@fluentui/react-picker-preview';

import descriptionMd from './PickerTagGroupDescription.md';
import bestPracticesMd from './PickerTagGroupBestPractices.md';

export { Default } from './PickerTagGroupDefault.stories';

export default {
  title: 'Preview Components/PickerTagGroup',
  component: PickerTagGroup,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
