import { isConformant } from 'test/specs/commonTests';
import { SkeletonAvatar } from 'src/components/Skeleton/SkeletonAvatar';

describe('SkeletonAvatar', () => {
  isConformant(SkeletonAvatar, { constructorName: 'SkeletonAvatar', hasAccessibilityProp: false });
});
