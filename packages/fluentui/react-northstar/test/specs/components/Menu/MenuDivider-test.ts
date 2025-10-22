import { isConformant } from 'test/specs/commonTests';

import { MenuDivider } from 'src/components/Menu/MenuDivider';

describe('MenuDivider', () => {
  isConformant(MenuDivider, { defaultAs: 'span', testPath: __filename, constructorName: 'MenuDivider' });
});
