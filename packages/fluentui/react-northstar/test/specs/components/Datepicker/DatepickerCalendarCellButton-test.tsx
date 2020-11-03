import { isConformant } from 'test/specs/commonTests';
import { DatepickerCalendarCellButton } from 'src/components/Datepicker/DatepickerCalendarCellButton';

describe('DatepickerCalendarCellButton', () => {
  isConformant(DatepickerCalendarCellButton, {
    testPath: __filename,
    constructorName: 'DatepickerCalendarCellButton',
    // Normally renders a native table element which should not be mounted to a div.
    // Thus converting to a div for testing purposes.
    requiredProps: { as: 'div' },
  });
});
