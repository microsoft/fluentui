import { isConformant } from 'test/specs/commonTests';
import { CardHeader } from 'src/components/Card/CardHeader';

describe('CardHeader', () => {
  isConformant(CardHeader, { testPath: __filename, constructorName: 'CardHeader' });
});
