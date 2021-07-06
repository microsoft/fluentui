import { isConformant } from 'test/specs/commonTests';
import { FormInput } from 'src/components/Form/FormInput';
import { Input, inputSlotClassNames } from 'src/components/Input/Input';

describe('FormInput', () => {
  isConformant(FormInput, {
    testPath: __filename,
    constructorName: 'FormInput',
    targetComponent: Input,
    forwardsRefTo: `Box[className~="${inputSlotClassNames.input}"]`,
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
