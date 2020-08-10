import { pxToRem } from '../../../../utils';

export interface SkeletonVariables {
  lineMargin?: string;
  shapeMargin?: string;
  lineBackground?: string;
  shapeBackground?: string;
  animationBackground?: string;
  animationBackgroundSecondary?: string;
}

export const skeletonVariables = (siteVariables): SkeletonVariables => {
  return {
    lineBackground: siteVariables.colorScheme.default.background4,
    shapeBackground: siteVariables.colorScheme.default.background4,
    animationBackground: siteVariables.colorScheme.default.background,
    animationBackgroundSecondary: siteVariables.colorScheme.default.background5,
    lineMargin: `0 0 ${pxToRem(2)} 0`,
    shapeMargin: `0 0 ${pxToRem(2)} 0`,
  };
};
