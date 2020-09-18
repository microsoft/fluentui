import { isConformant } from 'test/specs/commonTests';

import { HeaderDescription } from 'src/components/Header/HeaderDescription';

describe('HeaderDescription', () => {
  isConformant(HeaderDescription, { testPath: __filename, constructorName: 'HeaderDescription' });
});
