import { isConformant } from 'test/specs/commonTests';
import { CardColumn } from 'src/components/Card/CardColumn';

describe('CardColumn', () => {
  isConformant(CardColumn, { constructorName: 'CardColumn' });
});
