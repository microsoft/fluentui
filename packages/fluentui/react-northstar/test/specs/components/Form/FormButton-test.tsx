import { isConformant } from 'test/specs/commonTests';
import { FormButton } from 'src/components/Form/FormButton';
import { Button } from 'src/components/Button/Button';

describe('FormButton', () => {
  isConformant(FormButton, {
    constructorName: 'FormButton',
    forwardsRefTo: `Button`,
    passesUnhandledPropsTo: Button,
  });
});
