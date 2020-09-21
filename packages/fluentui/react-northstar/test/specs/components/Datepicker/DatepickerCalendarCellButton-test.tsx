import { isConformant } from 'test/specs/commonTests';
import { DatepickerCalendarCellButton } from 'src/components/Datepicker/DatepickerCalendarCellButton';

describe('DatepickerCalendarCellButton', () => {
  isConformant(DatepickerCalendarCellButton, {
    testPath: __filename,
    constructorName: 'DatepickerCalendarCellButton',
  });
});
