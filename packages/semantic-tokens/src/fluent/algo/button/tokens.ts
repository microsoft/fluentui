import {
  groupButtonPaddingTop,
  groupButtonPaddingBottom,
  groupButtonPaddingHorizontal,
  groupButtonFontsize,
  groupButtonFontweight,
  groupButtonGap,
  groupButtonIcononlyPadding,
  groupButtonIconSize,
  groupButtonLightnessHover,
  groupButtonLightnessPressed,
  groupButtonLineheight,
  groupButtonMinwidth,
  groupButtonNeutralBackground,
  groupButtonNeutralStroke,
  groupButtonOutlineStroke,
  groupButtonPrimaryBackground,
  groupButtonPrimaryStroke,
  groupButtonSubtleForeground,
  groupButtonTextPaddingHorizontal,
  groupButtonTransparentForegroundSelected,
} from '../../../groups/button/tokens';

// Density
export const groupButtonSmallPaddingTop = `calc(${groupButtonPaddingTop} / 5 * 3)`;
export const groupButtonSmallPaddingBottom = `calc(${groupButtonPaddingBottom} / 5 * 3)`;
export const groupButtonLargePaddingTop = `calc(${groupButtonPaddingTop} / 5 * 8)`;
export const groupButtonLargePaddingBottom = `calc(${groupButtonPaddingBottom} / 5 * 8)`;
export const groupButtonSmallPaddingHorizontal = `calc(${groupButtonPaddingHorizontal} / 12 * 8)`;
export const groupButtonLargePaddingHorizontal = `calc(${groupButtonPaddingHorizontal} / 12 * 16)`;
export const groupButtonSmallMinwidth = `calc(${groupButtonMinwidth} / 3 * 2)`;
export const groupButtonSmallFontsize = `calc(${groupButtonFontsize} / 7 * 6)`;
export const groupButtonSmallFontweight = `calc(${groupButtonFontweight} / 3 * 2)`;
export const groupButtonSmallLineheight = `calc(${groupButtonLineheight} / 5 * 4)`;
export const groupButtonLargeFontsize = `calc(${groupButtonFontsize} / 7 * 8)`;
export const groupButtonLargeLineheight = `calc(${groupButtonLineheight} / 10 * 11)`;
export const groupButtonSmallIcononlyPadding = `calc(${groupButtonIcononlyPadding} / 5)`;
export const groupButtonLargeIcononlyPadding = `calc(${groupButtonIcononlyPadding} / 5 * 7)`;
export const groupButtonSmallGap = `calc(${groupButtonGap} / 3 * 2)`;
export const groupButtonSmallTextPaddingHorizontal = `calc(${groupButtonTextPaddingHorizontal} / 3 * 2)`;
export const groupButtonLargeIconSize = `calc(${groupButtonIconSize} / 5 * 6)`;

// Color
export const groupButtonNeutralBackgroundHover = `hsl(from ${groupButtonNeutralBackground} h s calc(l + ${groupButtonLightnessHover}))`;
export const groupButtonNeutralBackgroundPressed = `hsl(from ${groupButtonNeutralBackground} h s calc(l + ${groupButtonLightnessPressed}))`;
export const groupButtonNeutralStrokeHover = `hsl(from ${groupButtonNeutralStroke} h s calc(l + ${groupButtonLightnessHover}))`;
export const groupButtonNeutralStrokePressed = `hsl(from ${groupButtonNeutralStroke} h s calc(l + ${groupButtonLightnessPressed}))`;
export const groupButtonOutlineStrokeHover = `hsl(from ${groupButtonOutlineStroke} h s calc(l + ${groupButtonLightnessHover}))`;
export const groupButtonOutlineStrokePressed = `hsl(from ${groupButtonOutlineStroke} h s calc(l + ${groupButtonLightnessPressed}))`;
export const groupButtonPrimaryBackgroundHover = `hsl(from ${groupButtonPrimaryBackground} h s calc(l + ${groupButtonLightnessHover}))`;
export const groupButtonPrimaryStrokeHover = `hsl(from ${groupButtonPrimaryStroke} h s calc(l + ${groupButtonLightnessHover}))`;
export const groupButtonPrimaryBackgroundPressed = `hsl(from ${groupButtonPrimaryBackground} h s calc(l + ${groupButtonLightnessPressed}))`;
export const groupButtonPrimaryStrokePressed = `hsl(from ${groupButtonPrimaryStroke} h s calc(l + ${groupButtonLightnessPressed}))`;
export const groupButtonSubtleForegroundPressed = `hsl(from ${groupButtonSubtleForeground} h s calc(l + ${groupButtonLightnessPressed}))`;
export const groupButtonTransparentForegroundPressed = `hsl(from ${groupButtonTransparentForegroundSelected} h s calc(l + ${groupButtonLightnessPressed}))`;
export const groupButtonTransparentForegroundHover = `hsl(from ${groupButtonTransparentForegroundSelected} h s calc(l + ${groupButtonLightnessHover}))`;
