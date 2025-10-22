import { isConformant } from 'test/specs/commonTests';
import { SkeletonAvatar } from 'src/components/Skeleton/SkeletonAvatar';

describe('SkeletonAvatar', () => {
  isConformant(SkeletonAvatar, {
    defaultAs: 'span',
    testPath: __filename,
    constructorName: 'SkeletonAvatar',
    hasAccessibilityProp: false,
  });
});
