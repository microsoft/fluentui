import { isConformant } from 'test/specs/commonTests';

import { ToolbarCustomItem } from 'src/components/Toolbar/ToolbarCustomItem';

describe('ToolbarCustomItem', () => {
  isConformant(ToolbarCustomItem, {
    testPath: __filename,
    constructorName: 'ToolbarCustomItem',
    requiredProps: { focusable: true },
  });
});
