import { isConformant } from 'test/specs/commonTests';
import { FormMessage } from 'src/components/Form/FormMessage';

describe('FormMessage', () => {
  isConformant(FormMessage, {
    testPath: __filename,
    constructorName: 'FormMessage',
  });
});
