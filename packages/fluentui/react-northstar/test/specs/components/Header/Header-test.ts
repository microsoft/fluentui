import { isConformant } from 'test/specs/commonTests';

import { Header } from 'src/components/Header/Header';

describe('Header', () => {
  isConformant(Header, { testPath: __filename, constructorName: 'Header' });
});
