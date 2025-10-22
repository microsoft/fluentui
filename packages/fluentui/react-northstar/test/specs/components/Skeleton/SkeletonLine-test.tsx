import { isConformant } from 'test/specs/commonTests';

import { SkeletonLine } from 'src/components/Skeleton/SkeletonLine';

describe('SkeletonLine', () => {
  isConformant(SkeletonLine, {
    defaultAs: 'span',
    testPath: __filename,
    constructorName: 'SkeletonLine',
    hasAccessibilityProp: false,
  });
});
