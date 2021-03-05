import { isConformant } from 'test/specs/commonTests';
import { CardFooter } from 'src/components/Card/CardFooter';

describe('CardFooter', () => {
  isConformant(CardFooter, { testPath: __filename, constructorName: 'CardFooter' });
});
