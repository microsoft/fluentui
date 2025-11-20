import { isConformant } from 'test/specs/commonTests';

import { MenuDivider } from 'src/components/Menu/MenuDivider';

describe('MenuDivider', () => {
  isConformant(MenuDivider, { defaultAs: 'li', testPath: __filename, constructorName: 'MenuDivider' });
});
