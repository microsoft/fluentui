import { GroupFallback } from './fallbacks.types';
import { tokens } from '@fluentui/tokens';

export const inputFallbacks: GroupFallback = {
  groupInputPaddingHorizontal: {
    fluent: tokens.spacingHorizontalM,
  },
  groupInputGap: {
    fluent: tokens.spacingHorizontalXS,
  },
  groupInputFontfamily: {
    fluent: tokens.fontFamilyBase,
  },
  groupInputFontsize: {
    fluent: tokens.fontSizeBase300,
  },
  groupInputFontweight: {
    fluent: tokens.fontWeightRegular,
  },
  groupInputLineheight: {
    fluent: tokens.lineHeightBase300,
  },
  groupInputBackground: {
    fluent: tokens.colorNeutralBackground1,
  },
  groupInputStroke: {
    fluent: tokens.colorNeutralStroke1,
  },
  groupInputStrokeSelected: {
    fluent: tokens.colorNeutralStroke1Pressed,
  },
  groupInputUnderlineStroke: {
    fluent: tokens.colorNeutralStrokeAccessible,
  },
  groupInputUnderlineStrokeSelected: {
    fluent: tokens.colorCompoundBrandStroke,
  },
  groupInputCorner: {
    fluent: tokens.borderRadiusMedium,
  },
  groupInputForeground: {
    fluent: tokens.colorNeutralForeground1,
  },
  groupInputStrokeInvalid: {
    fluent: tokens.colorPaletteRedBorder2,
  },
  groupInputFilledDarkerBackground: {
    fluent: tokens.colorNeutralBackground3,
  },
  groupInputStrokeDisabled: {
    fluent: tokens.colorNeutralStrokeDisabled,
  },
  groupInputBackgroundDisabled: {
    fluent: tokens.colorTransparentBackground,
    generic: 'backgroundNeutralTransparent',
  },
  groupInputForegroundDisabled: {
    fluent: tokens.colorNeutralForegroundDisabled,
  },
  groupInputPlaceholderForeground: {
    fluent: tokens.colorNeutralForeground4,
  },
  groupInputIconForeground: {
    fluent: tokens.colorNeutralForeground3,
  },
  groupInputMinheight: {
    fluent: '32px',
  },
  groupInputIconSize: {
    fluent: '20px',
  },
  groupInputStrokewidth: {
    fluent: '1px',
  },
  groupInputUnderlineStrokewidthSelected: {
    fluent: '2px',
  },
};
