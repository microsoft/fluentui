import { implementsShorthandProp, isConformant } from 'test/specs/commonTests';

import { ToolbarItem } from 'src/components/Toolbar/ToolbarItem';
import { ToolbarMenu } from 'src/components/Toolbar/ToolbarMenu';

describe('ToolbarItem', () => {
  isConformant(ToolbarItem, {
    defaultAs: 'button',
    testPath: __filename,
    constructorName: 'ToolbarItem',
  });
  implementsShorthandProp(ToolbarItem)('menu', ToolbarMenu, {
    implementsPopper: true,
    requiredProps: { menuOpen: true },
  });
});
