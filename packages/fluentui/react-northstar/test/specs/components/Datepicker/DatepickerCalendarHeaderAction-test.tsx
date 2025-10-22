import { isConformant } from 'test/specs/commonTests';
import { DatepickerCalendarHeaderAction } from 'src/components/Datepicker/DatepickerCalendarHeaderAction';

describe('DatepickerCalendarHeaderAction', () => {
  isConformant(DatepickerCalendarHeaderAction, {
    defaultAs: 'button',
    testPath: __filename,
    constructorName: 'DatepickerCalendarHeaderAction',
  });
});
