import { isConformant } from 'test/specs/commonTests';

import { Header } from 'src/components/Header/Header';

describe('Header', () => {
  isConformant(Header, { defaultAs: 'h1', testPath: __filename, constructorName: 'Header' });
});
