import { isConformant } from 'test/specs/commonTests';
import { SkeletonText } from 'src/components/Skeleton/SkeletonText';

describe('SkeletonText', () => {
  isConformant(SkeletonText, { constructorName: 'SkeletonText', hasAccessibilityProp: false });
});
