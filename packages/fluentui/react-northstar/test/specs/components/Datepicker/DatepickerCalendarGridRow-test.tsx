import { isConformant } from 'test/specs/commonTests';
import { DatepickerCalendarGridRow } from 'src/components/Datepicker/DatepickerCalendarGridRow';

describe('DatepickerCalendarGridRow', () => {
  isConformant(DatepickerCalendarGridRow, {
    testPath: __filename,
    constructorName: 'DatepickerCalendarGridRow',
    // Normally renders a native table element which should not be mounted to a div.
    // Thus converting to a div for testing purposes.
    requiredProps: { as: 'div' },
  });
});
