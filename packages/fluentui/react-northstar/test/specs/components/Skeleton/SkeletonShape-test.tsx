import { isConformant } from 'test/specs/commonTests';

import { SkeletonShape } from 'src/components/Skeleton/SkeletonShape';

describe('SkeletonShape', () => {
  isConformant(SkeletonShape, { constructorName: 'SkeletonShape', hasAccessibilityProp: false });
});
