import { pxToRem } from '../../../../utils';

export interface SkeletonVariables {
  lineMargin?: string;
  shapeMargin?: string;
  lineBackground?: string;
  shapeBackground?: string;
  animationBackground?: string;

  // Skeleton Button
  buttonHeight?: string;
  buttonWidth?: string;
  buttonSmallHeight?: string;
  buttonSmallWidth?: string;
  buttonBackground?: string;
  buttonCircularBorderRadius?: string;
}

export const skeletonVariables = (siteVariables): SkeletonVariables => {
  return {
    lineBackground: siteVariables.colorScheme.default.background4,
    shapeBackground: siteVariables.colorScheme.default.background4,
    animationBackground: siteVariables.colorScheme.default.background,
    lineMargin: `0 0 ${pxToRem(2)} 0`,
    shapeMargin: `0 0 ${pxToRem(2)} 0`,

    // Skeleton Button
    buttonHeight: pxToRem(32),
    buttonWidth: pxToRem(96),
    buttonSmallHeight: pxToRem(24),
    buttonSmallWidth: pxToRem(72),
    buttonBackground: siteVariables.colorScheme.default.background4,
    buttonCircularBorderRadius: pxToRem(999),
  };
};
