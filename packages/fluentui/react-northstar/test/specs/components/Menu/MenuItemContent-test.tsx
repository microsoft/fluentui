import { isConformant } from 'test/specs/commonTests';
import { MenuItemContent } from 'src/components/Menu/MenuItemContent';

describe('MenuItemContent', () => {
  isConformant(MenuItemContent, {
    constructorName: 'MenuItemContent',
  });
});
