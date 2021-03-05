import { isConformant } from 'test/specs/commonTests';
import { DatepickerCalendarHeaderAction } from 'src/components/Datepicker/DatepickerCalendarHeaderAction';

describe('DatepickerCalendarHeaderAction', () => {
  isConformant(DatepickerCalendarHeaderAction, {
    testPath: __filename,
    constructorName: 'DatepickerCalendarHeaderAction',
  });
});
