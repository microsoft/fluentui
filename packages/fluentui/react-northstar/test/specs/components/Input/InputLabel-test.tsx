import { InputLabel } from 'src/components/Input/InputLabel';
import { isConformant } from 'test/specs/commonTests';

describe('Input', () => {
  isConformant(InputLabel, {
    testPath: __filename,
    constructorName: 'InputLabel',
  });
});
