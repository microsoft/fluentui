import ToolbarItem from 'src/components/Toolbar/ToolbarItem';
import { isConformant } from 'test/specs/commonTests';

describe('ToolbarItem', () => {
  isConformant(ToolbarItem, {
    constructorName: 'ToolbarItem',
  });
});
