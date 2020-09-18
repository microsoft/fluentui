import { ListItemEndMedia } from 'src/components/List/ListItemEndMedia';
import { isConformant } from 'test/specs/commonTests';

describe('ListItemEndMedia', () => {
  isConformant(ListItemEndMedia, { testPath: __filename, constructorName: 'ListItemEndMedia' });
});
