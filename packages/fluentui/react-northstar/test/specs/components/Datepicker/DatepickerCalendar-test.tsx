import { isConformant } from 'test/specs/commonTests';
import { DatepickerCalendar } from 'src/components/Datepicker/DatepickerCalendar';

describe('DatepickerCalendar', () => {
  isConformant(DatepickerCalendar, {
    constructorName: 'DatepickerCalendar',
    requiredProps: {
      selectedDate: new Date(),
    },
  });
});
