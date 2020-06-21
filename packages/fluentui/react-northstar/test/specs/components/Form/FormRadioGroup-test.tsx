import { isConformant } from 'test/specs/commonTests';
import FormRadioGroup from 'src/components/Form/FormRadioGroup';
import RadioGroup from 'src/components/RadioGroup/RadioGroup';

describe('FormRadioGroup', () => {
  isConformant(FormRadioGroup, {
    constructorName: 'FormRadioGroup',
    passesUnhandledPropsTo: RadioGroup,
  });
});
