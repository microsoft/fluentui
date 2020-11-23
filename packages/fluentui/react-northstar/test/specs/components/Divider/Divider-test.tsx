import { isConformant } from 'test/specs/commonTests';

import { Divider } from 'src/components/Divider/Divider';

describe('Divider', () => {
  isConformant(Divider, { testPath: __filename, constructorName: 'Divider' });
});
