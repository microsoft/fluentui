import { isConformant } from 'test/specs/commonTests';
import { FormFieldCustom } from 'src/components/Form/FormFieldCustom';

describe('FormFieldCustom', () => {
  isConformant(FormFieldCustom, {
    testPath: __filename,
    constructorName: 'FormFieldCustom',
  });
});
