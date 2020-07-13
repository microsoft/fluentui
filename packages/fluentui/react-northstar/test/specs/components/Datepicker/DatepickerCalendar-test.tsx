import { isConformant } from 'test/specs/commonTests';
import { DatepickerCalendar } from 'src/components/Datepicker/DatepickerCalendar';

describe('Datepicker', () => {
  isConformant(DatepickerCalendar, { constructorName: 'DatepickerCalendar' });
});
