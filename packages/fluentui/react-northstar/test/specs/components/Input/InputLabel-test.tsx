import { InputLabel } from 'src/components/Input/InputLabel';
import { isConformant } from 'test/specs/commonTests';

describe('Input', () => {
  isConformant(InputLabel, {
    defaultAs: 'label',
    testPath: __filename,
    constructorName: 'InputLabel',
  });
});
