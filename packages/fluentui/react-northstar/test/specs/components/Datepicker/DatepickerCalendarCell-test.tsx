import { isConformant } from 'test/specs/commonTests';
import { DatepickerCalendarCell } from 'src/components/Datepicker/DatepickerCalendarCell';

describe('DatepickerCalendarCell', () => {
  isConformant(DatepickerCalendarCell, {
    testPath: __filename,
    constructorName: 'DatepickerCalendarCell',
    // Normally renders a native table element which should not be mounted to a div.
    // Thus converting to a div for testing purposes.
    requiredProps: { as: 'div' },
  });
});
