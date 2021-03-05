import { isConformant } from 'test/specs/commonTests';

import { ToolbarItemWrapper } from 'src/components/Toolbar/ToolbarItemWrapper';

describe('ToolbarItemWrapper', () => {
  isConformant(ToolbarItemWrapper, {
    testPath: __filename,
    constructorName: 'ToolbarItemWrapper',
  });
});
