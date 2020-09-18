import { isConformant } from 'test/specs/commonTests';

import { ToolbarMenuItemIcon } from 'src/components/Toolbar/ToolbarMenuItemIcon';

describe('ToolbarMenuItemIcon', () => {
  isConformant(ToolbarMenuItemIcon, {
    testPath: __filename,
    constructorName: 'ToolbarMenuItemIcon',
  });
});
