import { isConformant } from 'test/specs/commonTests';
import FormInput from 'src/components/Form/FormInput';

describe('FormInput', () => {
  isConformant(FormInput, { constructorName: 'FormInput' });
});
