import { isConformant } from 'test/specs/commonTests';
import { SkeletonText } from 'src/components/Skeleton/SkeletonText';

describe('SkeletonText', () => {
  isConformant(SkeletonText, {
    defaultAs: 'span',
    testPath: __filename,
    constructorName: 'SkeletonText',
    hasAccessibilityProp: false,
  });
});
