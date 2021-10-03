import { pxToRem } from '../../../../utils';

export interface SkeletonVariables {
  lineMargin?: string;
  shapeMargin?: string;
  lineBackground?: string;
  shapeBackground?: string;
  animationBackground?: string;
  animationBackgroundSecondary?: string;

  // Skeleton Button
  buttonHeight?: string;
  buttonWidth?: string;
  buttonSmallHeight?: string;
  buttonSmallWidth?: string;
  buttonBackground?: string;
  buttonCircularBorderRadius?: string;

  // Skeleton Text
  textBackground?: string;
  textWidth?: string;
  textSmallerHeight?: string;
  textSmallHeight?: string;
  textMediumHeight?: string;
  textLargeHeight?: string;
  textLargerHeight?: string;

  // Skeleton Input
  inputHeight?: string;
  inputWidth?: string;
  inputBackground?: string;

  // Skeleton Avatar
  avatarBackground?: string;
  avatarSmallest?: string;
  avatarSmaller?: string;
  avatarSmall?: string;
  avatarMedium?: string;
  avatarLarge?: string;
  avatarLarger?: string;
  avatarLargest?: string;
}

export const skeletonVariables = (siteVariables): SkeletonVariables => {
  return {
    lineBackground: siteVariables.colorScheme.default.foreground6,
    shapeBackground: siteVariables.colorScheme.default.foreground6,
    animationBackground: siteVariables.colorScheme.default.foreground6,
    animationBackgroundSecondary: siteVariables.colorScheme.default.foreground6,
    lineMargin: `0 0 ${pxToRem(2)} 0`,
    shapeMargin: `0 0 ${pxToRem(2)} 0`,

    // Skeleton Button
    buttonHeight: pxToRem(32),
    buttonWidth: pxToRem(96),
    buttonSmallHeight: pxToRem(24),
    buttonSmallWidth: pxToRem(72),
    buttonBackground: siteVariables.colorScheme.default.foreground6,
    buttonCircularBorderRadius: pxToRem(999),

    // Skeleton Text
    textBackground: siteVariables.colorScheme.default.foreground6,
    textWidth: '100%',
    textSmallerHeight: pxToRem(14),
    textSmallHeight: pxToRem(16),
    textMediumHeight: pxToRem(19),
    textLargeHeight: pxToRem(24),
    textLargerHeight: pxToRem(32),

    // Skeleton Input
    inputHeight: pxToRem(32),
    inputWidth: pxToRem(154),
    inputBackground: siteVariables.colorScheme.default.foreground6,

    // Skeleton Avatar
    avatarBackground: siteVariables.colorScheme.default.foreground6,
    avatarSmallest: pxToRem(20),
    avatarSmaller: pxToRem(24),
    avatarSmall: pxToRem(28),
    avatarMedium: pxToRem(32),
    avatarLarge: pxToRem(44),
    avatarLarger: pxToRem(64),
    avatarLargest: pxToRem(96),
  };
};
