import { isConformant, handlesAccessibility } from 'test/specs/commonTests';
import Card from 'src/components/Card/Card';

describe('Card', () => {
  isConformant(Card, { constructorName: 'Card' });

  describe('accessiblity', () => {
    handlesAccessibility(Card, { defaultRootRole: 'group' });
  });
});
