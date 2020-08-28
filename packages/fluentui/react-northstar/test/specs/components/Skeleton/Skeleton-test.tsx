import { isConformant } from 'test/specs/commonTests';

import { Skeleton } from 'src/components/Skeleton/Skeleton';

describe('Skeleton', () => {
  isConformant(Skeleton, { constructorName: 'Skeleton' });
});
