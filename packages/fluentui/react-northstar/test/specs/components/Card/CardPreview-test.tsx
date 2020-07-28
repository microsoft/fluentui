import { isConformant } from 'test/specs/commonTests';
import { CardPreview } from 'src/components/Card/CardPreview';

describe('CardPreview', () => {
  isConformant(CardPreview, { constructorName: 'CardPreview' });
});
