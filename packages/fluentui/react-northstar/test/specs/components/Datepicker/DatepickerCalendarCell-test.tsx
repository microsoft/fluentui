import { isConformant } from 'test/specs/commonTests';
import { DatepickerCalendarCell } from 'src/components/Datepicker/DatepickerCalendarCell';

describe('DatepickerCalendarCell', () => {
  isConformant(DatepickerCalendarCell, { constructorName: 'DatepickerCalendarCell' });
});
