import { isConformant } from 'test/specs/commonTests';

import { SkeletonLine } from 'src/components/Skeleton/SkeletonLine';

describe('SkeletonLine', () => {
  isConformant(SkeletonLine, { testPath: __filename, constructorName: 'SkeletonLine', hasAccessibilityProp: false });
});
