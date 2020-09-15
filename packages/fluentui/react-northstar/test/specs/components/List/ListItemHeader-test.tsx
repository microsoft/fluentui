import { ListItemHeader } from 'src/components/List/ListItemHeader';
import { isConformant } from 'test/specs/commonTests';

describe('ListItemHeader', () => {
  isConformant(ListItemHeader, { testPath: __filename, constructorName: 'ListItemHeader' });
});
