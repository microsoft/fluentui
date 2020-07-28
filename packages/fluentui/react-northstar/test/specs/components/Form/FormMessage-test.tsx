import { isConformant } from 'test/specs/commonTests';
import { FormMessage } from 'src/components/Form/FormMessage';

describe('FormMessage', () => {
  isConformant(FormMessage, {
    constructorName: 'FormMessage',
  });
});
