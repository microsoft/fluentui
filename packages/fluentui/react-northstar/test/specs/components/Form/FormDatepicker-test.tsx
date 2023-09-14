import { isConformant } from 'test/specs/commonTests';
import { FormDatepicker, formDatepickerClassName } from 'src/components/Form/FormDatepicker';
import { Datepicker, datepickerClassName } from 'src/components/Datepicker/Datepicker';

describe('FormDatepicker', () => {
  isConformant(FormDatepicker, {
    testPath: __filename,
    constructorName: 'FormDatepicker',
    forwardsRefTo: false,
    targetComponent: Datepicker,
    getTargetElement: (result, attr) =>
      attr === 'className'
        ? result.container.querySelector(`.${formDatepickerClassName}`)
        : result.container.querySelector(`.${datepickerClassName}`),
  });
});
