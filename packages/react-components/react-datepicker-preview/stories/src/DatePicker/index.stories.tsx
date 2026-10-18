import { DatePicker } from '@fluentui/react-datepicker-preview';

import descriptionMd from './DatePickerDescription.md';
import bestPracticesMd from './DatePickerBestPractices.md';

export { Default } from './DatePickerDefault.stories';
export { DefaultOpen } from './DatePickerDefaultOpen.stories';
export { DefaultOpenInline } from './DatePickerDefaultOpenInline.stories';
export { Appearance } from './DatePickerAppearance.stories';
export { CalendarComposition } from './DatePickerCalendarComposition.stories';
export { Controlled } from './DatePickerControlled.stories';
export { CustomDateFormatting } from './DatePickerCustomDateFormatting.stories';
export { DateBoundaries } from './DatePickerDateBoundaries.stories';
export { DateRange } from './DatePickerDateRange.stories';
export { Disabled } from './DatePickerDisabled.stories';
export { ErrorHandling } from './DatePickerErrorHandling.stories';
export { FirstDayOfTheWeek } from './DatePickerFirstDayOfTheWeek.stories';
export { Localized } from './DatePickerLocalized.stories';
export { PopupOptions } from './DatePickerPopupOptions.stories';
export { Required } from './DatePickerRequired.stories';
export { Sizes } from './DatePickerSizes.stories';
export { TextInput } from './DatePickerTextInput.stories';
export { WeekNumbers } from './DatePickerWeekNumbers.stories';

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
