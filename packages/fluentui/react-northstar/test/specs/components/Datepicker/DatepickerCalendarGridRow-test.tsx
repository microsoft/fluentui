import { isConformant } from 'test/specs/commonTests';
import { DatepickerCalendarGridRow } from 'src/components/Datepicker/DatepickerCalendarGridRow';

describe('DatepickerCalendarGridRow', () => {
  isConformant(DatepickerCalendarGridRow, {
    testPath: __filename,
    constructorName: 'DatepickerCalendarGridRow',
  });
});
