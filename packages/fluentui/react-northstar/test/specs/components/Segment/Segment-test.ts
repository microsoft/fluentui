import { isConformant } from 'test/specs/commonTests';

import { Segment } from 'src/components/Segment/Segment';

describe('Segment', () => {
  isConformant(Segment, { testPath: __filename, constructorName: 'Segment' });
});
