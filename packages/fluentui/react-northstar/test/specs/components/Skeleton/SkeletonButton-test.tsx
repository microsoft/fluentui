import { isConformant } from 'test/specs/commonTests';
import { SkeletonButton } from 'src/components/Skeleton/SkeletonButton';

describe('SkeletonButton', () => {
  isConformant(SkeletonButton, {
    defaultAs: 'span',
    testPath: __filename,
    constructorName: 'SkeletonButton',
    hasAccessibilityProp: false,
  });
});
