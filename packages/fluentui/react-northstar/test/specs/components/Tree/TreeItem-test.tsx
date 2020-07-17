import { isConformant } from 'test/specs/commonTests';
import { TreeItem } from 'src/components/Tree/TreeItem';

describe('TreeItem', () => {
  isConformant(TreeItem, {
    constructorName: 'TreeItem',
    requiredProps: { id: 'my-id' },
  });
});
