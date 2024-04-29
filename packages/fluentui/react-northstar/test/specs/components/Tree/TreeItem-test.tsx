import { isConformant } from 'test/specs/commonTests';
import { TreeItem } from 'src/components/Tree/TreeItem';

describe('TreeItem', () => {
  isConformant(TreeItem, {
    testPath: __filename,
    constructorName: 'TreeItem',
    requiredProps: { id: 'my-id' },
  });
});
