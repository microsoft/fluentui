import { isConformant } from 'test/specs/commonTests';

import { ToolbarMenuDivider } from 'src/components/Toolbar/ToolbarMenuDivider';

describe('ToolbarMenuDivider', () => {
  isConformant(ToolbarMenuDivider, {
    defaultAs: 'li',
    testPath: __filename,
    constructorName: 'ToolbarMenuDivider',
  });
});
