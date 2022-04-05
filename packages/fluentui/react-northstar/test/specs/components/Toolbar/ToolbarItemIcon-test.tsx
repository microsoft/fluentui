import { isConformant } from 'test/specs/commonTests';

import { ToolbarItemIcon } from 'src/components/Toolbar/ToolbarItemIcon';

describe('ToolbarItemIcon', () => {
  isConformant(ToolbarItemIcon, {
    testPath: __filename,
    constructorName: 'ToolbarItemIcon',
  });
});
