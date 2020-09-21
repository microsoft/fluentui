import { isConformant } from 'test/specs/commonTests';
import { DatepickerCalendarHeaderCellButton } from 'src/components/Datepicker/DatepickerCalendarHeaderCellButton';

describe('DatepickerCalendarHeaderCellButton', () => {
  isConformant(DatepickerCalendarHeaderCellButton, {
    testPath: __filename,
    constructorName: 'DatepickerCalendarHeaderCellButton',
  });
});
