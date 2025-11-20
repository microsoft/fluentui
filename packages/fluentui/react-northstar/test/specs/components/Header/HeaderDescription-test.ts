import { isConformant } from 'test/specs/commonTests';

import { HeaderDescription } from 'src/components/Header/HeaderDescription';

describe('HeaderDescription', () => {
  isConformant(HeaderDescription, { defaultAs: 'p', testPath: __filename, constructorName: 'HeaderDescription' });
});
