import { isConformant } from 'test/specs/commonTests';
import FormInput from 'src/components/Form/FormInput';
import Input from 'src/components/Input/Input';

describe('FormInput', () => {
  isConformant(FormInput, {
    constructorName: 'FormInput',
    passesUnhandledPropsTo: Input,
    eventTargets: {
      onKeyDown: 'input',
      onChange: 'input',
      onKeyPress: 'input',
      onKeyUp: 'input',
      onFocus: 'input',
      onBlur: 'input',
    },
  });
});
