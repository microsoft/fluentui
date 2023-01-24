import { DatePicker } from '@fluentui/react-datepicker';
import { initializeIcons } from '@fluentui/font-icons-mdl2';

import descriptionMd from './DatePickerDescription.md';
import bestPracticesMd from './DatePickerBestPractices.md';

export { Default } from './DatePickerDefault.stories';
export { Disabled } from './DatePickerDisabled.stories';
export { WeekNumbers } from './DatePickerWeekNumbers.stories';
export { Required } from './DatePickerRequired.stories';
export { TextInput } from './DatePickerTextInput.stories';
export { CustomDateFormatting } from './DatePickerCustomDateFormatting.stories';
export { DateBoundaries } from './DatePickerDateBoundaries.stories';
export { ExternalControls } from './DatePickerExternalControls.stories';

initializeIcons();

export default {
  title: 'Preview Components/DatePicker',
  component: DatePicker,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
