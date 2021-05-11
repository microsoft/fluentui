import { isConformant } from 'test/specs/commonTests';
import { MenuItemIndicator } from 'src/components/Menu/MenuItemIndicator';

describe('MenuItemIndicator', () => {
  isConformant(MenuItemIndicator, {
    testPath: __filename,
    constructorName: 'MenuItemIndicator',
  });
});
