import { isConformant } from 'test/specs/commonTests';
import { TreeTitle } from 'src/components/Tree/TreeTitle';

describe('TreeTitle', () => {
  isConformant(TreeTitle, { testPath: __filename, constructorName: 'TreeTitle' });
});
