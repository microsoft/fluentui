import { tokens } from '@fluentui/tokens';
import { GroupFallback } from './fallbacks.types';

export const compoundButtonFallbacks: GroupFallback = {
  ctrlCompoundbuttonIconSize: {
    fluent: '40px',
  },
  ctrlCompoundbuttonGap: {
    fluent: tokens.spacingHorizontalM,
  },
  ctrlCompoundbuttonSmallIcononlyPadding: {
    fluent: tokens.spacingHorizontalXS,
  },
  ctrlCompoundbuttonIcononlyPadding: {
    fluent: tokens.spacingHorizontalSNudge,
  },
  ctrlCompoundbuttonLargeIcononlyPadding: {
    fluent: tokens.spacingHorizontalS,
  },
  ctrlCompoundbuttonSmallPaddingHorizontal: {
    fluent: tokens.spacingHorizontalS,
  },
  ctrlCompoundbuttonSmallPaddingTop: {
    fluent: tokens.spacingHorizontalS,
  },
  ctrlCompoundbuttonSmallPaddingBottom: {
    fluent: tokens.spacingHorizontalMNudge,
  },
  ctrlCompoundbuttonPaddingHorizontal: {
    fluent: tokens.spacingHorizontalM,
  },
  ctrlCompoundbuttonPaddingTop: {
    fluent: '14px',
  },
  ctrlCompoundbuttonPaddingBottom: {
    fluent: tokens.spacingHorizontalL,
  },
  ctrlCompoundbuttonLargePaddingHorizontal: {
    fluent: tokens.spacingHorizontalL,
  },
  ctrlCompoundbuttonLargePaddingTop: {
    fluent: '18px',
  },
  ctrlCompoundbuttonLargePaddingBottom: {
    fluent: tokens.spacingHorizontalXL,
  },
};

export const buttonFallbacks: GroupFallback = {
  groupButtonFontfamily: {
    fluent: tokens.fontFamilyBase,
  },
  groupButtonNeutralBackground: {
    fluent: tokens.colorNeutralBackground1,
    generic: 'backgroundNeutralSubtle',
  },
  groupButtonNeutralBackgroundHover: {
    fluent: tokens.colorNeutralBackground1Hover,
    generic: 'backgroundNeutralSubtleHover',
  },
  groupButtonNeutralBackgroundPressed: {
    fluent: tokens.colorNeutralBackground1Pressed,
    generic: 'backgroundNeutralSubtlePressed',
  },
  groupButtonNeutralBackgroundSelected: {
    fluent: tokens.colorNeutralBackground1Selected,
    // TODO: Review generic mapping
    generic: 'backgroundNeutralHeavy',
  },
  groupButtonNeutralBackgroundHoverSelected: {
    fluent: tokens.colorNeutralBackground1Hover,
    // TODO: Review generic mapping
    generic: 'backgroundNeutralHeavyHover',
  },
  groupButtonNeutralBackgroundPressedSelected: {
    fluent: tokens.colorNeutralBackground1Pressed,
    // TODO: Review generic mapping
    generic: 'backgroundNeutralHeavyPressed',
  },
  groupButtonNeutralBackgroundDisabled: {
    fluent: tokens.colorNeutralBackgroundDisabled,
    generic: 'backgroundDisabled',
  },
  groupButtonPrimaryBackground: {
    fluent: tokens.colorBrandBackground,
    generic: 'backgroundBrandLoud',
  },
  groupButtonPrimaryBackgroundHover: {
    fluent: tokens.colorBrandBackgroundHover,
    generic: 'backgroundBrandLoudHover',
  },
  groupButtonPrimaryBackgroundPressed: {
    fluent: tokens.colorBrandBackgroundPressed,
    generic: 'backgroundBrandLoudPressed',
  },
  groupButtonPrimaryBackgroundSelected: {
    fluent: tokens.colorBrandBackgroundSelected,
    generic: 'backgroundBrandHeavy',
  },
  groupButtonPrimaryBackgroundHoverSelected: {
    fluent: tokens.colorBrandBackgroundHover,
    generic: 'backgroundBrandHeavyHover',
  },
  groupButtonPrimaryBackgroundPressedSelected: {
    fluent: tokens.colorBrandBackgroundPressed,
    generic: 'backgroundBrandHeavyPressed',
  },
  groupButtonPrimaryBackgroundDisabled: {
    fluent: tokens.colorNeutralBackgroundDisabled,
    generic: 'backgroundDisabled',
  },
  groupButtonOutlineBackground: {
    fluent: tokens.colorTransparentBackground,
    generic: 'backgroundNeutralTransparent',
  },
  groupButtonOutlineBackgroundHover: {
    fluent: tokens.colorTransparentBackgroundHover,
    generic: 'backgroundNeutralTransparentHover',
  },
  groupButtonOutlineBackgroundPressed: {
    fluent: tokens.colorTransparentBackgroundPressed,
    generic: 'backgroundNeutralTransparentPressed',
  },
  groupButtonOutlineBackgroundSelected: {
    fluent: tokens.colorTransparentBackgroundSelected,
    generic: 'backgroundBrandLoud',
  },
  groupButtonOutlineBackgroundHoverSelected: {
    fluent: tokens.colorTransparentBackgroundHover,
    generic: 'backgroundBrandLoudHover',
  },
  groupButtonOutlineBackgroundPressedSelected: {
    fluent: tokens.colorTransparentBackgroundPressed,
    generic: 'backgroundBrandLoudPressed',
  },
  groupButtonOutlineBackgroundDisabled: {
    fluent: tokens.colorTransparentBackground,
    generic: 'backgroundDisabled',
  },
  groupButtonSubtleBackground: {
    fluent: tokens.colorSubtleBackground,
    generic: 'backgroundBrandTransparent',
  },
  groupButtonSubtleBackgroundHover: {
    fluent: tokens.colorSubtleBackgroundHover,
    generic: 'backgroundBrandTransparentHover',
  },
  groupButtonSubtleBackgroundPressed: {
    fluent: tokens.colorSubtleBackgroundPressed,
    generic: 'backgroundBrandTransparentPressed',
  },
  groupButtonSubtleBackgroundSelected: {
    fluent: tokens.colorSubtleBackgroundSelected,
    generic: 'backgroundNeutralSubtle',
  },
  groupButtonSubtleBackgroundHoverSelected: {
    fluent: tokens.colorSubtleBackgroundHover,
    generic: 'backgroundNeutralSubtleHover',
  },
  groupButtonSubtleBackgroundPressedSelected: {
    fluent: tokens.colorSubtleBackgroundPressed,
    generic: 'backgroundNeutralSubtlePressed',
  },
  groupButtonSubtleBackgroundDisabled: {
    fluent: tokens.colorTransparentBackground,
    generic: 'backgroundDisabled',
  },
  groupButtonNeutralStroke: {
    fluent: tokens.colorNeutralStroke1,
    generic: 'strokeNeutralTransparent',
  },
  groupButtonNeutralStrokeHover: {
    fluent: tokens.colorNeutralStroke1Hover,
    generic: 'strokeNeutralTransparentHover',
  },
  groupButtonNeutralStrokePressed: {
    fluent: tokens.colorNeutralStroke1Pressed,
    generic: 'strokeNeutralTransparentPressed',
  },
  groupButtonNeutralStrokeSelected: {
    fluent: tokens.colorNeutralStroke1Selected,
    generic: 'strokeBrandLoud',
  },
  groupButtonNeutralStrokeHoverSelected: {
    fluent: tokens.colorNeutralStroke1Hover,
    generic: 'strokeBrandLoudHover',
  },
  groupButtonNeutralStrokePressedSelected: {
    fluent: tokens.colorNeutralStroke1Pressed,
    generic: 'strokeBrandLoudPressed',
  },
  groupButtonNeutralStrokeDisabled: {
    fluent: tokens.colorNeutralStrokeDisabled,
    generic: 'strokeDisabled',
  },
  groupButtonPrimaryStroke: {
    fluent: 'transparent',
    generic: 'strokeBrandLoud',
  },
  groupButtonPrimaryStrokeHover: {
    fluent: 'transparent',
    generic: 'strokeBrandLoudHover',
  },
  groupButtonPrimaryStrokePressed: {
    fluent: 'transparent',
    generic: 'strokeBrandLoudPressed',
  },
  groupButtonPrimaryStrokeSelected: {
    fluent: 'transparent',
    generic: 'strokeBrandLoud',
  },
  groupButtonPrimaryStrokeHoverSelected: {
    fluent: 'transparent',
    generic: 'strokeBrandLoudHover',
  },
  groupButtonPrimaryStrokePressedSelected: {
    fluent: 'transparent',
    generic: 'strokeBrandLoudPressed',
  },
  groupButtonPrimaryStrokeDisabled: {
    fluent: 'transparent',
    generic: 'strokeDisabled',
  },
  groupButtonOutlineStroke: {
    fluent: tokens.colorNeutralStroke1,
    generic: 'strokeNeutralSubtle',
  },
  groupButtonOutlineStrokeHover: {
    fluent: tokens.colorNeutralStroke1Hover,
    generic: 'strokeNeutralSubtleHover',
  },
  groupButtonOutlineStrokePressed: {
    fluent: tokens.colorNeutralStroke1Pressed,
    generic: 'strokeNeutralSubtlePressed',
  },
  groupButtonOutlineStrokeSelected: {
    fluent: tokens.colorNeutralStroke1,
    generic: 'strokeNeutralLoud',
  },
  groupButtonOutlineStrokeHoverSelected: {
    fluent: tokens.colorNeutralStroke1Selected,
    generic: 'strokeNeutralLoudHover',
  },
  groupButtonOutlineStrokePressedSelected: {
    fluent: tokens.colorNeutralStroke1Selected,
    generic: 'strokeNeutralLoudPressed',
  },
  groupButtonOutlineStrokeDisabled: {
    fluent: tokens.colorNeutralStrokeDisabled,
    generic: 'strokeDisabled',
  },
  groupButtonSubtleStroke: {
    fluent: 'transparent',
    generic: 'strokeNeutralTransparent',
  },
  groupButtonSubtleStrokeHover: {
    fluent: 'transparent',
    generic: 'strokeNeutralTransparentHover',
  },
  groupButtonSubtleStrokePressed: {
    fluent: 'transparent',
    generic: 'strokeNeutralTransparentPressed',
  },
  groupButtonSubtleStrokeSelected: {
    fluent: 'transparent',
    generic: 'strokeNeutralTransparent',
  },
  groupButtonSubtleStrokeHoverSelected: {
    fluent: 'transparent',
    generic: 'strokeNeutralTransparentHover',
  },
  groupButtonSubtleStrokePressedSelected: {
    fluent: 'transparent',
    generic: 'strokeNeutralTransparentPressed',
  },
  groupButtonSubtleStrokeDisabled: {
    fluent: 'transparent',
    generic: 'strokeDisabled',
  },
  groupButtonSmallFontsize: {
    fluent: tokens.fontSizeBase200,
  },
  groupButtonSmallLineheight: {
    fluent: tokens.lineHeightBase200,
  },
  groupButtonSmallPaddingHorizontal: {
    fluent: tokens.spacingHorizontalS,
  },
  groupButtonSmallPaddingTop: {
    fluent: '3px',
  },
  groupButtonSmallPaddingBottom: {
    fluent: '3px',
  },
  groupButtonTextPaddingHorizontal: { fluent: '0px' },
  groupButtonLargeTextPaddingHorizontal: { fluent: '0px' },
  groupButtonSmallTextPaddingHorizontal: { fluent: '0px' },
  groupButtonSmallGap: {
    fluent: tokens.spacingHorizontalXS,
  },
  groupButtonSmallCorner: {
    fluent: tokens.borderRadiusMedium,
  },
  groupButtonSmallCornerHover: {
    fluent: tokens.borderRadiusMedium,
  },
  groupButtonSmallCornerPressed: {
    fluent: tokens.borderRadiusMedium,
  },
  groupButtonSmallCornerDisabled: {
    fluent: tokens.borderRadiusMedium,
  },
  groupButtonSmallCornerHoverSelected: {
    fluent: tokens.borderRadiusMedium,
  },
  groupButtonSmallCornerPressedSelected: {
    fluent: tokens.borderRadiusMedium,
  },
  groupButtonSmallCornerSelected: {
    fluent: tokens.borderRadiusMedium,
  },
  groupButtonSmallMinwidth: {
    fluent: '64px',
  },
  groupButtonStrokewidth: {
    fluent: tokens.strokeWidthThin,
  },
  groupButtonSmallFontweight: {
    fluent: tokens.fontWeightRegular,
  },
  groupButtonFontsize: {
    fluent: tokens.fontSizeBase300,
  },
  groupButtonLineheight: {
    fluent: tokens.lineHeightBase300,
  },
  groupButtonPaddingHorizontal: {
    fluent: tokens.spacingHorizontalM,
  },
  groupButtonPaddingTop: {
    fluent: '5px',
  },
  groupButtonPaddingBottom: {
    fluent: '5px',
  },
  groupButtonGap: {
    fluent: tokens.spacingHorizontalSNudge,
  },
  groupButtonCorner: {
    fluent: tokens.borderRadiusMedium,
  },
  groupButtonCornerPressed: {
    fluent: tokens.borderRadiusMedium,
  },
  groupButtonCornerPressedSelected: {
    fluent: tokens.borderRadiusMedium,
  },
  groupButtonCornerHover: {
    fluent: tokens.borderRadiusMedium,
  },
  groupButtonCornerHoverSelected: {
    fluent: tokens.borderRadiusMedium,
  },
  groupButtonCornerDisabled: {
    fluent: tokens.borderRadiusMedium,
  },
  groupButtonCornerSelected: {
    fluent: tokens.borderRadiusMedium,
  },
  groupButtonMinwidth: {
    fluent: '96px',
  },
  groupButtonFontweight: {
    fluent: tokens.fontWeightSemibold,
  },
  groupButtonLargeFontsize: {
    fluent: tokens.fontSizeBase400,
  },
  groupButtonLargeLineheight: {
    fluent: tokens.lineHeightBase400,
  },
  groupButtonLargePaddingHorizontal: {
    fluent: tokens.spacingHorizontalL,
  },
  groupButtonLargePaddingTop: {
    fluent: tokens.spacingVerticalS,
  },
  groupButtonLargePaddingBottom: {
    fluent: tokens.spacingVerticalS,
  },
  groupButtonLargeGap: {
    fluent: tokens.spacingHorizontalSNudge,
  },
  groupButtonLargeCorner: {
    fluent: tokens.borderRadiusMedium,
  },
  groupButtonLargeCornerHover: {
    fluent: tokens.borderRadiusMedium,
  },
  groupButtonLargeCornerHoverSelected: {
    fluent: tokens.borderRadiusMedium,
  },
  groupButtonLargeCornerPressed: {
    fluent: tokens.borderRadiusMedium,
  },
  groupButtonLargeCornerPressedSelected: {
    fluent: tokens.borderRadiusMedium,
  },
  groupButtonLargeCornerSelected: {
    fluent: tokens.borderRadiusMedium,
  },
  groupButtonLargeCornerDisabled: {
    fluent: tokens.borderRadiusMedium,
  },
  groupButtonLargeMinwidth: {
    fluent: '96px',
  },
  groupButtonLargeFontweight: {
    fluent: tokens.fontWeightSemibold,
  },
  groupButtonSmallIconSize: {
    fluent: '20px',
  },
  groupButtonIconSize: {
    fluent: '20px',
  },
  groupButtonLargeIconSize: {
    fluent: '24px',
  },
  groupButtonNeutralForeground: {
    fluent: tokens.colorNeutralForeground1,
    generic: 'foregroundNeutralPrimary',
  },
  groupButtonNeutralForegroundHover: {
    fluent: tokens.colorNeutralForeground1Hover,
    generic: 'foregroundNeutralPrimaryHover',
  },
  groupButtonNeutralForegroundPressed: {
    fluent: tokens.colorNeutralForeground1Pressed,
    generic: 'foregroundNeutralPrimaryPressed',
  },
  groupButtonNeutralForegroundSelected: {
    fluent: tokens.colorNeutralForeground1Selected,
    generic: 'foregroundBrandOnloud',
  },
  groupButtonNeutralForegroundHoverSelected: {
    fluent: tokens.colorNeutralForeground1Hover,
    generic: 'foregroundBrandOnloudHover',
  },
  groupButtonNeutralForegroundPressedSelected: {
    fluent: tokens.colorNeutralForeground1Pressed,
    generic: 'foregroundBrandOnloudPressed',
  },
  groupButtonNeutralForegroundDisabled: {
    fluent: tokens.colorNeutralForegroundDisabled,
    generic: 'foregroundDisabled',
  },
  groupButtonPrimaryForeground: {
    fluent: tokens.colorNeutralForegroundOnBrand,
    generic: 'foregroundBrandOnloud',
  },
  groupButtonPrimaryForegroundHover: {
    fluent: tokens.colorNeutralForegroundOnBrand,
    generic: 'foregroundBrandOnloudHover',
  },
  groupButtonPrimaryForegroundPressed: {
    fluent: tokens.colorNeutralForegroundOnBrand,
    generic: 'foregroundBrandOnloudPressed',
  },
  groupButtonPrimaryForegroundSelected: {
    fluent: tokens.colorNeutralForegroundOnBrand,
    generic: 'strokeBrandOnloudSelected',
  },
  groupButtonPrimaryForegroundHoverSelected: {
    fluent: tokens.colorNeutralForegroundOnBrand,
    generic: 'foregroundBrandOnloudHoverSelected',
  },
  groupButtonPrimaryForegroundPressedSelected: {
    fluent: tokens.colorNeutralForegroundOnBrand,
    generic: 'foregroundBrandOnloudPressedSelected',
  },
  groupButtonPrimaryForegroundDisabled: {
    fluent: tokens.colorNeutralForegroundDisabled,
    generic: 'foregroundDisabled',
  },
  groupButtonOutlineForeground: {
    fluent: tokens.colorNeutralForeground1,
    generic: 'foregroundNeutralPrimary',
  },
  groupButtonOutlineForegroundHover: {
    fluent: tokens.colorNeutralForeground1Hover,
    generic: 'foregroundNeutralPrimaryHover',
  },
  groupButtonOutlineForegroundPressed: {
    fluent: tokens.colorNeutralForeground1Pressed,
    generic: 'foregroundNeutralPrimaryPressed',
  },
  groupButtonOutlineForegroundSelected: {
    fluent: tokens.colorNeutralForeground1Selected,
    generic: 'foregroundBrandOnloud',
  },
  groupButtonOutlineForegroundHoverSelected: {
    fluent: tokens.colorNeutralForeground1Selected,
    generic: 'foregroundBrandOnloudHover',
  },
  groupButtonOutlineForegroundPressedSelected: {
    fluent: tokens.colorNeutralForeground1Selected,
    generic: 'foregroundBrandOnloudPressed',
  },
  groupButtonOutlineForegroundDisabled: {
    fluent: tokens.colorNeutralForegroundDisabled,
    generic: 'foregroundDisabled',
  },
  groupButtonSubtleForeground: {
    fluent: tokens.colorNeutralForeground2,
    generic: 'foregroundNeutralPrimary',
  },
  groupButtonSubtleForegroundHover: {
    fluent: tokens.colorNeutralForeground2Hover,
    generic: 'foregroundNeutralPrimaryHover',
  },
  groupButtonSubtleForegroundPressed: {
    fluent: tokens.colorNeutralForeground2Pressed,
    generic: 'foregroundNeutralPrimaryPressed',
  },
  groupButtonSubtleForegroundSelected: {
    fluent: tokens.colorNeutralForeground2Selected,
    generic: 'foregroundBrandOnloud',
  },
  groupButtonSubtleForegroundHoverSelected: {
    fluent: tokens.colorNeutralForeground2Selected,
    generic: 'foregroundBrandOnloudHover',
  },
  groupButtonSubtleForegroundPressedSelected: {
    fluent: tokens.colorNeutralForeground2Selected,
    generic: 'foregroundBrandOnloudPressed',
  },
  groupButtonSubtleForegroundDisabled: {
    fluent: tokens.colorNeutralForegroundDisabled,
    generic: 'foregroundDisabled',
  },
  groupButtonTransparentForeground: {
    fluent: tokens.colorNeutralForeground2,
    generic: 'foregroundNeutralPrimary',
  },
  groupButtonTransparentForegroundHover: {
    fluent: tokens.colorNeutralForeground2BrandHover,
    generic: 'foregroundBrandPrimaryHover',
  },
  groupButtonTransparentForegroundPressed: {
    fluent: tokens.colorNeutralForeground2BrandPressed,
    generic: 'foregroundBrandPrimaryPressed',
  },
  groupButtonTransparentForegroundSelected: {
    fluent: tokens.colorNeutralForeground2BrandSelected,
    generic: 'foregroundBrandPrimary',
  },
  groupButtonTransparentForegroundDisabled: {
    fluent: tokens.colorNeutralForegroundDisabled,
    generic: 'foregroundDisabled',
  },
  groupButtonNeutralIconForeground: {
    fluent: tokens.colorNeutralForeground1,
    generic: 'foregroundNeutralPrimary',
  },
  groupButtonNeutralIconForegroundHover: {
    fluent: tokens.colorNeutralForeground1Hover,
    generic: 'foregroundNeutralPrimaryHover',
  },
  groupButtonNeutralIconForegroundPressed: {
    fluent: tokens.colorNeutralForeground1Pressed,
    generic: 'foregroundNeutralPrimaryPressed',
  },
  groupButtonNeutralIconForegroundDisabled: {
    fluent: tokens.colorNeutralForegroundDisabled,
    generic: 'foregroundDisabled',
  },
  groupButtonNeutralIconForegroundSelected: {
    fluent: tokens.colorNeutralForeground1Selected,
    generic: 'foregroundBrandOnloud',
  },
  groupButtonPrimaryIconForeground: {
    fluent: tokens.colorNeutralForegroundOnBrand,
    generic: 'foregroundBrandOnloud',
  },
  groupButtonPrimaryIconForegroundHover: {
    fluent: tokens.colorNeutralForegroundOnBrand,
    generic: 'foregroundBrandOnloudHover',
  },
  groupButtonPrimaryIconForegroundPressed: {
    fluent: tokens.colorNeutralForegroundOnBrand,
    generic: 'foregroundBrandOnloudPressed',
  },
  groupButtonPrimaryIconForegroundDisabled: {
    fluent: tokens.colorNeutralForegroundDisabled,
    generic: 'foregroundDisabled',
  },
  groupButtonPrimaryIconForegroundSelected: {
    fluent: tokens.colorNeutralForegroundOnBrand,
    generic: 'foregroundBrandOnloud',
  },
  groupButtonOutlineIconForeground: {
    fluent: tokens.colorNeutralForeground1,
    generic: 'foregroundNeutralPrimary',
  },
  groupButtonOutlineIconForegroundHover: {
    fluent: tokens.colorNeutralForeground1Hover,
    generic: 'foregroundNeutralPrimaryHover',
  },
  groupButtonOutlineIconForegroundPressed: {
    fluent: tokens.colorNeutralForeground1Pressed,
    generic: 'foregroundNeutralPrimaryPressed',
  },
  groupButtonOutlineIconForegroundDisabled: {
    fluent: tokens.colorNeutralForegroundDisabled,
    generic: 'foregroundDisabled',
  },
  groupButtonOutlineIconForegroundSelected: {
    fluent: tokens.colorNeutralForeground1Selected,
    generic: 'foregroundBrandOnloud',
  },
  groupButtonSubtleIconForeground: {
    fluent: tokens.colorNeutralForeground2,
    generic: 'foregroundNeutralPrimary',
  },
  groupButtonSubtleIconForegroundHover: {
    fluent: tokens.colorNeutralForeground2BrandHover,
    generic: 'foregroundBrandPrimary',
  },
  groupButtonSubtleIconForegroundPressed: {
    fluent: tokens.colorNeutralForeground2BrandPressed,
    generic: 'foregroundBrandPrimaryPressed',
  },
  groupButtonSubtleIconForegroundDisabled: {
    fluent: tokens.colorNeutralForegroundDisabled,
    generic: 'foregroundDisabled',
  },
  groupButtonSubtleIconForegroundSelected: {
    fluent: tokens.colorNeutralForeground2BrandSelected,
    generic: 'foregroundBrandOnloud',
  },
  groupButtonOutlineStrokewidthHover: {
    fluent: tokens.strokeWidthThin,
  },
  groupButtonOutlineStrokewidthPressed: {
    fluent: tokens.strokeWidthThin,
  },
  groupButtonOutlineStrokewidthSelected: {
    fluent: tokens.strokeWidthThicker,
  },
  groupButtonSmallIcononlyPadding: {
    fluent: '1px',
  },
  groupButtonIcononlyPadding: {
    fluent: '5px',
  },
  groupButtonLargeIcononlyPadding: {
    fluent: '7px',
  },
  groupButtonNeutralDividerStroke: {
    fluent: tokens.colorNeutralStroke1,
  },
  groupButtonDividerStrokewidth: {
    fluent: tokens.strokeWidthThin,
  },
  groupButtonOutlineDividerStroke: {
    fluent: tokens.colorNeutralStroke1,
  },
  groupButtonPrimaryDividerStroke: {
    fluent: tokens.colorNeutralStrokeOnBrand,
  },
  groupButtonSubtleDividerStroke: {
    fluent: 'transparent',
  },
  groupButtonTransparentDividerStroke: {
    fluent: 'transparent',
  },
  groupButtonDividerMarginVertical: {
    fluent: '0px',
  },
  groupButtonShadow: {
    // Shadow needs to be null-populated to work with combinations for focus
    fluent: '0 0 0 transparent',
  },
  groupButtonFontweightSelected: {
    fluent: tokens.fontWeightSemibold,
  },
  groupButtonPrimaryLightnessHover: {
    fluent: '-10',
    generic: 'lightnessHover',
  },
  groupButtonPrimaryLightnessPressed: {
    fluent: '-20',
    generic: 'lightnessPressed',
  },
};
