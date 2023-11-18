import { ComponentMeta } from '@storybook/react';
import { Datepicker } from '@fluentui/react-northstar';
import DatepickerHeaderExample from '../../examples/components/Datepicker/Slots/DatepickerHeaderExample.shorthand';
import DatepickerExampleDisabled from '../../examples/components/Datepicker/States/DatepickerExampleDisabled.shorthand';
import DatepickerExampleSelectedDate from '../../examples/components/Datepicker/States/DatepickerExampleSelectedDate.shorthand';
import DatepickerExample from '../../examples/components/Datepicker/Types/DatepickerExample.shorthand';
import DatepickerExampleOpen from '../../examples/components/Datepicker/Types/DatepickerExampleOpen.shorthand';
import DatepickerFirstWeekDayExample from '../../examples/components/Datepicker/Usage/DatepickerFirstWeekDayExample.shorthand';
import DatepickerNoInputPlaceholderExample from '../../examples/components/Datepicker/Usage/DatepickerNoInputPlaceholderExample.shorthand';
import DatepickerParseExample from '../../examples/components/Datepicker/Usage/DatepickerParseExample.shorthand';
import DatepickerExampleStandaloneCalendarInput from '../../examples/components/Datepicker/Variations/DatepickerExampleStandaloneCalendarInput.shorthand';

export default { component: Datepicker, title: 'Datepicker' } as ComponentMeta<typeof Datepicker>;

export {
  DatepickerHeaderExample,
  DatepickerExampleDisabled,
  DatepickerExampleSelectedDate,
  DatepickerExample,
  DatepickerExampleOpen,
  DatepickerFirstWeekDayExample,
  DatepickerNoInputPlaceholderExample,
  DatepickerParseExample,
  DatepickerExampleStandaloneCalendarInput,
};
