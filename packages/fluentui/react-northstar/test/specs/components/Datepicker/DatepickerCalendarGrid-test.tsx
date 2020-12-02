import { isConformant } from 'test/specs/commonTests';
import { DatepickerCalendarGrid } from 'src/components/Datepicker/DatepickerCalendarGrid';

describe('DatepickerCalendarGrid', () => {
  isConformant(DatepickerCalendarGrid, {
    constructorName: 'DatepickerCalendarGrid',
  });
});
