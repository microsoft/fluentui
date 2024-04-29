import { isConformant } from 'test/specs/commonTests';
import { DatepickerCalendarHeader } from 'src/components/Datepicker/DatepickerCalendarHeader';

describe('DatepickerCalendarHeader', () => {
  isConformant(DatepickerCalendarHeader, { testPath: __filename, constructorName: 'DatepickerCalendarHeader' });
});
