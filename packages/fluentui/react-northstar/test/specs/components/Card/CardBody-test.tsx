import { isConformant } from 'test/specs/commonTests';
import { CardBody } from 'src/components/Card/CardBody';

describe('CardBody', () => {
  isConformant(CardBody, { testPath: __filename, constructorName: 'CardBody' });
});
