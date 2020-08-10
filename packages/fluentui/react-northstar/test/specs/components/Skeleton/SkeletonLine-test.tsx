import { isConformant } from 'test/specs/commonTests';

import { SkeletonLine } from 'src/components/Skeleton/SkeletonLine';

describe('SkeletonLine', () => {
  isConformant(SkeletonLine, { constructorName: 'SkeletonLine', hasAccessibilityProp: false });
});
