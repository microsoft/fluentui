import { isConformant } from 'test/specs/commonTests';

import { SkeletonShape } from 'src/components/Skeleton/SkeletonShape';

describe('SkeletonShape', () => {
  isConformant(SkeletonShape, { testPath: __filename, constructorName: 'SkeletonShape', hasAccessibilityProp: false });
});
