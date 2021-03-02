import { isConformant } from 'test/specs/commonTests';

import { ToolbarMenuItemActiveIndicator } from 'src/components/Toolbar/ToolbarMenuItemActiveIndicator';

describe('ToolbarMenuItemActiveIndicator', () => {
  isConformant(ToolbarMenuItemActiveIndicator, {
    testPath: __filename,
    constructorName: 'ToolbarMenuItemActiveIndicator',
  });
});
