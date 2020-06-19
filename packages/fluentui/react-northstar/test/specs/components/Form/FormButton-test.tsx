import { isConformant } from 'test/specs/commonTests';
import FormButton from 'src/components/Form/FormButton';

describe('FormButton', () => {
  isConformant(FormButton, {
    constructorName: 'FormButton',
    passesUnhandledPropsTo: 'Button',
  });
});
