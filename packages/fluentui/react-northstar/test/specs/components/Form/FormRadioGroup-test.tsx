import { isConformant } from 'test/specs/commonTests';
import FormRadioGroup from 'src/components/Form/FormRadioGroup';

describe('FormRadioGroup', () => {
  isConformant(FormRadioGroup, {
    constructorName: 'FormRadioGroup',
    passesUnhandledPropsTo: 'RadioGroup',
  });
});
