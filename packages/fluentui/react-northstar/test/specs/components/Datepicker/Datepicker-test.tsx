import { isConformant } from 'test/specs/commonTests';
import { Datepicker } from 'src/components/Datepicker/Datepicker';

describe('Datepicker', () => {
  isConformant(Datepicker, { testPath: __filename, constructorName: 'Datepicker' });
});
