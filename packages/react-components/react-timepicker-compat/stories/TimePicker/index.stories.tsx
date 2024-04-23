import { TimePicker } from '@fluentui/react-timepicker-compat';

import descriptionMd from './TimePickerDescription.md';
import bestPracticesMd from './TimePickerBestPractices.md';

export { Default } from './TimePickerDefault.stories';
export { Controlled } from './TimePickerControlled.stories';
export { Clearable } from './TimePickerClearable.stories';
export { FreeformWithErrorHandling } from './TimePickerFreeformWithErrorHandling.stories';
export { FreeformCustomParsing } from './TimePickerFreeformCustomParsing.stories';
export { TimePickerWithDatePicker } from './TimePickerWithDatePicker.stories';

export default {
  title: 'Compat Components/TimePicker',
  component: TimePicker,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
