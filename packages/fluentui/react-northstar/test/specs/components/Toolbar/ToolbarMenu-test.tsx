import { ToolbarMenu } from 'src/components/Toolbar/ToolbarMenu';
import { isConformant } from 'test/specs/commonTests';

describe('ToolbarMenu', () => {
  isConformant(ToolbarMenu, {
    defaultAs: 'ul',
    testPath: __filename,
    constructorName: 'ToolbarMenu',
    skipAsPropTests: 'as-component',
  });
});
