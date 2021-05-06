import { isConformant } from 'test/specs/commonTests';

import { MenuDivider } from 'src/components/Menu/MenuDivider';

describe('MenuDivider', () => {
  isConformant(MenuDivider, { testPath: __filename, constructorName: 'MenuDivider' });
});
