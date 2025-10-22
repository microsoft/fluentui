import { isConformant } from 'test/specs/commonTests';
import { MenuItemIcon } from 'src/components/Menu/MenuItemIcon';

describe('MenuItemIcon', () => {
  isConformant(MenuItemIcon, {
    defaultAs: 'span',
    testPath: __filename,
    constructorName: 'MenuItemIcon',
  });
});
