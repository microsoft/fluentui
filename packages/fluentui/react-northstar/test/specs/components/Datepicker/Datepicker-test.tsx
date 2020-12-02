import { isConformant } from 'test/specs/commonTests';
import { Datepicker } from 'src/components/Datepicker/Datepicker';

describe('Datepicker', () => {
  isConformant(Datepicker, { constructorName: 'Datepicker' });
});
