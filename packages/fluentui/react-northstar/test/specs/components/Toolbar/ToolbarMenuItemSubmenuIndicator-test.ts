import { isConformant } from 'test/specs/commonTests';

import { ToolbarMenuItemSubmenuIndicator } from 'src/components/Toolbar/ToolbarMenuItemSubmenuIndicator';

describe('ToolbarMenuItemSubmenuIndicator', () => {
  isConformant(ToolbarMenuItemSubmenuIndicator, {
    testPath: __filename,
    constructorName: 'ToolbarMenuItemSubmenuIndicator',
  });
});
