import { isConformant } from 'test/specs/commonTests';
import { FormDatepicker } from 'src/components/Form/FormDatepicker';
import { Datepicker } from 'src/components/Datepicker/Datepicker';

describe('FormDatepicker', () => {
  isConformant(FormDatepicker, {
    constructorName: 'FormDatepicker',
    forwardsRefTo: false,
    passesUnhandledPropsTo: Datepicker,
  });
});
