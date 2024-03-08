import { TagPicker } from '@fluentui/react-tag-picker-preview';

import descriptionMd from './TagPickerDescription.md';
import bestPracticesMd from './TagPickerBestPractices.md';

export { Default } from './TagPickerDefault.stories';
export { Button } from './TagPickerButton.stories';
export { Filtering } from './TagPickerFiltering.stories';

export default {
  title: 'Preview Components/Tag Picker',
  component: TagPicker,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
