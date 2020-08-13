import { isConformant } from 'test/specs/commonTests';
import { SkeletonInput } from 'src/components/Skeleton/SkeletonInput';

describe('SkeletonInput', () => {
  isConformant(SkeletonInput, { constructorName: 'SkeletonInput', hasAccessibilityProp: false });
});
