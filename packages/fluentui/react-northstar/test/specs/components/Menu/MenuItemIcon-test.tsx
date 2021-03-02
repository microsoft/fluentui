import { isConformant } from 'test/specs/commonTests';
import { MenuItemIcon } from 'src/components/Menu/MenuItemIcon';

describe('MenuItemIcon', () => {
  isConformant(MenuItemIcon, {
    testPath: __filename,
    constructorName: 'MenuItemIcon',
  });
});
