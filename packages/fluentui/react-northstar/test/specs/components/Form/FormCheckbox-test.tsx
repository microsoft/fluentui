import { isConformant } from 'test/specs/commonTests';
import FormCheckbox from 'src/components/Form/FormCheckbox';

describe('FormCheckbox', () => {
  isConformant(FormCheckbox, {
    constructorName: 'FormCheckbox',
    passesUnhandledPropsTo: 'Checkbox',
  });
});
