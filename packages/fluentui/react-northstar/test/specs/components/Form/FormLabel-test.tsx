import { isConformant } from 'test/specs/commonTests';
import { FormLabel } from 'src/components/Form/FormLabel';

describe('FormLabel', () => {
  isConformant(FormLabel, {
    constructorName: 'FormLabel',
  });
});
