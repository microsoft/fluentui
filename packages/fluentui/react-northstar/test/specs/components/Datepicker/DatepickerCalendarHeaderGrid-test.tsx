import { isConformant } from 'test/specs/commonTests';
import { DatepickerCalendarHeaderGrid } from 'src/components/Datepicker/DatepickerCalendarHeaderGrid';

describe('DatepickerCalendarHeaderGrid', () => {
  isConformant(DatepickerCalendarHeaderGrid, {
    testPath: __filename,
    constructorName: 'DatepickerCalendarHeaderGrid',
  });
});
