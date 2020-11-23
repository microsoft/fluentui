import { isConformant } from 'test/specs/commonTests';

import { ToolbarMenuDivider } from 'src/components/Toolbar/ToolbarMenuDivider';

describe('ToolbarMenuDivider', () => {
  isConformant(ToolbarMenuDivider, {
    testPath: __filename,
    constructorName: 'ToolbarMenuDivider',
  });
});
