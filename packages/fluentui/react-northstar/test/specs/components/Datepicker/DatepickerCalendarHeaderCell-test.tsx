import { isConformant } from 'test/specs/commonTests';
import { DatepickerCalendarHeaderCell } from 'src/components/Datepicker/DatepickerCalendarHeaderCell';

describe('DatepickerCalendarHeaderCell', () => {
  isConformant(DatepickerCalendarHeaderCell, { testPath: __filename, constructorName: 'DatepickerCalendarHeaderCell' });
});
