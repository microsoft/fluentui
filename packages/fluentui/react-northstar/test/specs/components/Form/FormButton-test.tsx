import { isConformant } from 'test/specs/commonTests';
import { FormButton, formButtonClassName } from 'src/components/Form/FormButton';
import { Button } from 'src/components/Button/Button';

describe('FormButton', () => {
  isConformant(FormButton, {
    testPath: __filename,
    constructorName: 'FormButton',
    forwardsRefTo: `Button`,
    targetComponent: Button,
    getTargetElement: (result, attr) =>
      attr === 'className' ? result.container.querySelector(`.${formButtonClassName}`) : result.getByRole('button'),
  });
});
