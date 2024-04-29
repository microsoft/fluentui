import { isConformant } from 'test/specs/commonTests';

import { ToolbarDivider } from 'src/components/Toolbar/ToolbarDivider';

describe('ToolbarDivider', () => {
  isConformant(ToolbarDivider, {
    testPath: __filename,
    constructorName: 'ToolbarDivider',
  });
});
