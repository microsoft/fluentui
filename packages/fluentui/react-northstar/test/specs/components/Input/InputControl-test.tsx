import { isConformant } from 'test/specs/commonTests';
import InputControl from 'src/components/Input/InputControl';

describe('InputControl', () => {
  isConformant(InputControl, { constructorName: 'InputControl' });
});
