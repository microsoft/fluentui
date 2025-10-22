import { isConformant } from 'test/specs/commonTests';
import { FormLabel } from 'src/components/Form/FormLabel';

describe('FormLabel', () => {
  isConformant(FormLabel, {
    defaultAs: 'label',
    testPath: __filename,
    constructorName: 'FormLabel',
  });
});
