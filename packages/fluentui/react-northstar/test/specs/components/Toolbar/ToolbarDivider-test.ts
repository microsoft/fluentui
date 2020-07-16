import { isConformant } from 'test/specs/commonTests';

import { ToolbarDivider } from 'src/components/Toolbar/ToolbarDivider';

describe('ToolbarDivider', () => {
  isConformant(ToolbarDivider, {
    constructorName: 'ToolbarDivider',
  });
});
