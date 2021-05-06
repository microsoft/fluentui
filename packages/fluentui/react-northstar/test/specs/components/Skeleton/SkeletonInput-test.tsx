import { isConformant } from 'test/specs/commonTests';
import { SkeletonInput } from 'src/components/Skeleton/SkeletonInput';

describe('SkeletonInput', () => {
  isConformant(SkeletonInput, { testPath: __filename, constructorName: 'SkeletonInput', hasAccessibilityProp: false });
});
