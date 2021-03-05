import { ListItemHeaderMedia } from 'src/components/List/ListItemHeaderMedia';
import { isConformant } from 'test/specs/commonTests';

describe('ListItemHeaderMedia', () => {
  isConformant(ListItemHeaderMedia, { testPath: __filename, constructorName: 'ListItemHeaderMedia' });
});
