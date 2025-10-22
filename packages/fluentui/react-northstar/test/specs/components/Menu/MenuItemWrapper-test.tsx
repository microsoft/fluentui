import { isConformant } from 'test/specs/commonTests';
import { MenuItemWrapper } from 'src/components/Menu/MenuItemWrapper';

describe('MenuItemWrapper', () => {
  isConformant(MenuItemWrapper, {
    defaultAs: 'span',
    testPath: __filename,
    constructorName: 'MenuItemWrapper',
  });
});
