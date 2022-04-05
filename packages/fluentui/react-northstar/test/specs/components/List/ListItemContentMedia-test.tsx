import { ListItemContentMedia } from 'src/components/List/ListItemContentMedia';
import { isConformant } from 'test/specs/commonTests';

describe('ListItemContentMedia', () => {
  isConformant(ListItemContentMedia, { testPath: __filename, constructorName: 'ListItemContentMedia' });
});
