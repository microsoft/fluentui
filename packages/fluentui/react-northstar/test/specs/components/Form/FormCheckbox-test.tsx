import { isConformant } from 'test/specs/commonTests';
import FormCheckbox from 'src/components/Form/FormCheckbox';
import Checkbox from 'src/components/Checkbox/Checkbox';

describe('FormCheckbox', () => {
  isConformant(FormCheckbox, {
    constructorName: 'FormCheckbox',
    passesUnhandledPropsTo: Checkbox,
  });
});
