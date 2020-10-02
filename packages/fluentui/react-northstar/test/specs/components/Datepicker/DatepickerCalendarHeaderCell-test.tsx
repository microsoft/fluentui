import { isConformant } from 'test/specs/commonTests';
import { DatepickerCalendarHeaderCell } from 'src/components/Datepicker/DatepickerCalendarHeaderCell';

describe('DatepickerCalendarHeaderCell', () => {
  isConformant(DatepickerCalendarHeaderCell, {
    testPath: __filename,
    constructorName: 'DatepickerCalendarHeaderCell',
    // Normally renders a native table element which should not be mounted to a div.
    // Thus converting to a div for testing purposes.
    requiredProps: { as: 'div' },
  });
});
