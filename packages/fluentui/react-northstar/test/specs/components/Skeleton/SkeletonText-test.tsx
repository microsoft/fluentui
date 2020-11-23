import { isConformant } from 'test/specs/commonTests';
import { SkeletonText } from 'src/components/Skeleton/SkeletonText';

describe('SkeletonText', () => {
  isConformant(SkeletonText, { testPath: __filename, constructorName: 'SkeletonText', hasAccessibilityProp: false });
});
