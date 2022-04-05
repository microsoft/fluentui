import { isConformant } from 'test/specs/commonTests';

import { ToolbarMenuItemContent } from 'src/components/Toolbar/ToolbarMenuItemContent';

describe('ToolbarMenuItemContent', () => {
  isConformant(ToolbarMenuItemContent, {
    testPath: __filename,
    constructorName: 'ToolbarMenuItemContent',
  });
});
