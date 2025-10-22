import { isConformant } from 'test/specs/commonTests';
import { DatepickerCalendarGrid } from 'src/components/Datepicker/DatepickerCalendarGrid';

describe('DatepickerCalendarGrid', () => {
  isConformant(DatepickerCalendarGrid, {
    defaultAs: 'table',
    testPath: __filename,
    constructorName: 'DatepickerCalendarGrid',
  });
});
