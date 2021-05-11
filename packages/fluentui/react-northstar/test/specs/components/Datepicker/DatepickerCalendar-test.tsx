import { isConformant } from 'test/specs/commonTests';
import { DatepickerCalendar } from 'src/components/Datepicker/DatepickerCalendar';

describe('DatepickerCalendar', () => {
  isConformant(DatepickerCalendar, {
    testPath: __filename,
    constructorName: 'DatepickerCalendar',
    requiredProps: {
      selectedDate: new Date(),
    },
  });
});
