import { ListItemHeader } from 'src/components/List/ListItemHeader';
import { isConformant } from 'test/specs/commonTests';

describe('ListItemHeader', () => {
  isConformant(ListItemHeader, { constructorName: 'ListItemHeader' });
});
