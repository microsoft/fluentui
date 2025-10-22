import { isConformant } from 'test/specs/commonTests';

import { ToolbarMenuItemIcon } from 'src/components/Toolbar/ToolbarMenuItemIcon';

describe('ToolbarMenuItemIcon', () => {
  isConformant(ToolbarMenuItemIcon, {
    defaultAs: 'span',
    testPath: __filename,
    constructorName: 'ToolbarMenuItemIcon',
  });
});
