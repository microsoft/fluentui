import { DatePicker } from '@fluentui/react-datepicker-compat';

import descriptionMd from './DatePickerDescription.md';
import bestPracticesMd from './DatePickerBestPractices.md';

export { Default } from './DatePickerDefault.stories';
export { TextInput } from './DatePickerTextInput.stories';
export { FirstDayOfTheWeek } from './DatePickerFirstDayOfTheWeek.stories';
export { WeekNumbers } from './DatePickerWeekNumbers.stories';
export { DateBoundaries } from './DatePickerDateBoundaries.stories';
export { CustomDateFormatting } from './DatePickerCustomDateFormatting.stories';
export { Controlled } from './DatePickerControlled.stories';
export { Required } from './DatePickerRequired.stories';
export { Disabled } from './DatePickerDisabled.stories';

export default {
  title: 'Preview Components/DatePicker Compat',
  component: DatePicker,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
