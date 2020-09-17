import { ListItemMedia } from 'src/components/List/ListItemMedia';
import { isConformant } from 'test/specs/commonTests';

describe('ListItemMedia', () => {
  isConformant(ListItemMedia, { testPath: __filename, constructorName: 'ListItemMedia' });
});
