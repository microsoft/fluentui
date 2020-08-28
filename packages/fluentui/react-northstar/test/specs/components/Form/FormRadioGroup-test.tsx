import { isConformant } from 'test/specs/commonTests';
import { FormRadioGroup } from 'src/components/Form/FormRadioGroup';
import { RadioGroup } from 'src/components/RadioGroup/RadioGroup';

describe('FormRadioGroup', () => {
  isConformant(FormRadioGroup, {
    constructorName: 'FormRadioGroup',
    // TODO: point to correct once RadioGroup will be using compose
    forwardsRefTo: false,
    passesUnhandledPropsTo: RadioGroup,
  });
});
