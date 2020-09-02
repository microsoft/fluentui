import { isConformant } from 'test/specs/commonTests';

import { Status } from 'src/components/Status/Status';

describe('Status', () => {
  isConformant(Status, { constructorName: 'Status' });
});
