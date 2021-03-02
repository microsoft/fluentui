import { isConformant } from 'test/specs/commonTests';
import { CardTopControls } from 'src/components/Card/CardTopControls';

describe('CardTopControls', () => {
  isConformant(CardTopControls, { testPath: __filename, constructorName: 'CardTopControls' });
});
