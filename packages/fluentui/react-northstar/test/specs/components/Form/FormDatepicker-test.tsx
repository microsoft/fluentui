import { isConformant } from 'test/specs/commonTests';
import { FormDatepicker } from 'src/components/Form/FormDatepicker';
import { Datepicker } from 'src/components/Datepicker/Datepicker';

describe('FormDatepicker', () => {
  isConformant(FormDatepicker, {
    testPath: __filename,
    constructorName: 'FormDatepicker',
    forwardsRefTo: false,
    targetComponent: Datepicker,
  });
});
