import { TimePicker } from '@fluentui/react-timepicker-compat-preview';

import descriptionMd from './TimePickerDescription.md';
import bestPracticesMd from './TimePickerBestPractices.md';

export { Default } from './TimePickerDefault.stories';
export { CustomTimeString } from './TimePickerCustomTimeString.stories';

export default {
  title: 'Preview Components/TimePicker',
  component: TimePicker,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
