import { isConformant } from 'test/specs/commonTests';

import { ToolbarItemWrapper } from 'src/components/Toolbar/ToolbarItemWrapper';

describe('ToolbarItemWrapper', () => {
  isConformant(ToolbarItemWrapper, {
    constructorName: 'ToolbarItemWrapper',
  });
});
