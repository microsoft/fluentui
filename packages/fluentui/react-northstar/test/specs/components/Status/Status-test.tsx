import { isConformant } from 'test/specs/commonTests';

import { Status } from 'src/components/Status/Status';

describe('Status', () => {
  isConformant(Status, { testPath: __filename, constructorName: 'Status' });
});
