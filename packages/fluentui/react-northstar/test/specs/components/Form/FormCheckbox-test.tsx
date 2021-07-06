import { isConformant } from 'test/specs/commonTests';
import { FormCheckbox } from 'src/components/Form/FormCheckbox';
import { Checkbox } from 'src/components/Checkbox/Checkbox';

describe('FormCheckbox', () => {
  isConformant(FormCheckbox, {
    testPath: __filename,
    constructorName: 'FormCheckbox',
    // TODO: point to correct once Checkbox will be using compose
    forwardsRefTo: false,
    targetComponent: Checkbox,
  });
});
