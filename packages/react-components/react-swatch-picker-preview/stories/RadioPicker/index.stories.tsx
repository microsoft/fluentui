import { RadioPicker } from '@fluentui/react-swatch-picker-preview';

import descriptionMd from './RadioPickerDescription.md';
import bestPracticesMd from './RadioPickerBestPractices.md';

export { Default } from './RadioPickerDefault.stories';
export { RadioNavigation } from './RadioNavigation.stories';
export { RadioInPopover } from './RadioInPopover.stories';
export { RadioPickerSize } from './RadioPickerSize.stories';
export { RadioPickerShape } from './RadioPickerShape.stories';

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
