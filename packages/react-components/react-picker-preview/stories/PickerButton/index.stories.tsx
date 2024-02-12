import { PickerButton } from '@fluentui/react-picker-preview';

import descriptionMd from './PickerButtonDescription.md';
import bestPracticesMd from './PickerButtonBestPractices.md';

export { Default } from './PickerButtonDefault.stories';

export default {
  title: 'Preview Components/PickerButton',
  component: PickerButton,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
