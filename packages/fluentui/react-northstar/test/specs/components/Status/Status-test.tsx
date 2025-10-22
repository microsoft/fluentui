import { isConformant } from 'test/specs/commonTests';

import { Status } from 'src/components/Status/Status';

describe('Status', () => {
  isConformant(Status, { defaultAs: 'span', testPath: __filename, constructorName: 'Status' });
});
