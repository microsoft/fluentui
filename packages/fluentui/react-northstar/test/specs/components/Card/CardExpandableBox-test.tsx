import { isConformant } from 'test/specs/commonTests';
import { CardExpandableBox } from 'src/components/Card/CardExpandableBox';

describe('CardExpandableBox', () => {
  isConformant(CardExpandableBox, { testPath: __filename, constructorName: 'CardExpandableBox' });
});
