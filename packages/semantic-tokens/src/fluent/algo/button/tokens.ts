import {
  groupButtonPaddingTop,
  groupButtonPaddingBottom,
  groupButtonPaddingHorizontal,
  groupButtonFontsize,
  groupButtonFontweight,
  groupButtonGap,
  groupButtonIcononlyPadding,
  groupButtonIconSize,
  groupButtonLineheight,
  groupButtonMinwidth,
  groupButtonNeutralBackground,
  groupButtonNeutralStroke,
  groupButtonOutlineStroke,
  groupButtonPrimaryBackground,
  groupButtonPrimaryStroke,
  groupButtonTextPaddingHorizontal,
  groupButtonTransparentForegroundSelected,
  groupButtonNeutralBackgroundSelected,
  groupButtonNeutralStrokeSelected,
  groupButtonOutlineStrokeSelected,
  groupButtonPrimaryBackgroundSelected,
  groupButtonPrimaryStrokeSelected,
  groupButtonSubtleBackgroundSelected,
  groupButtonSubtleIconForegroundSelected,
  groupButtonOutlineBackgroundSelected,
  groupButtonSubtleBackground,
} from '../../../groups/button/tokens';

import {
  lightnessHover,
  lightnessPressed,
  lightnessSelectedHover,
  lightnessSelectedPressed,
} from '../../../generics/tokens';
import {
  groupButtonPrimaryLightnessHover,
  groupButtonPrimaryLightnessPressed,
  groupButtonSubtleIconForegroundHover,
} from '../../../groups/extension/button/tokens';

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
export const groupButtonNeutralBackgroundHover = `hsl(from ${groupButtonNeutralBackground} h s calc(l + ${lightnessHover}))`;
export const groupButtonNeutralBackgroundPressed = `hsl(from ${groupButtonNeutralBackground} h s calc(l + ${lightnessPressed}))`;
export const groupButtonNeutralStrokeHover = `hsl(from ${groupButtonNeutralStroke} h s calc(l + ${lightnessHover}))`;
export const groupButtonNeutralStrokePressed = `hsl(from ${groupButtonNeutralStroke} h s calc(l + ${lightnessPressed}))`;
export const groupButtonOutlineStrokeHover = `hsl(from ${groupButtonOutlineStroke} h s calc(l + ${lightnessHover}))`;
export const groupButtonOutlineStrokePressed = `hsl(from ${groupButtonOutlineStroke} h s calc(l + ${lightnessPressed}))`;
export const groupButtonPrimaryBackgroundHover = `hsl(from ${groupButtonPrimaryBackground} h s calc(l + ${groupButtonPrimaryLightnessHover}))`;
export const groupButtonPrimaryStrokeHover = `hsl(from ${groupButtonPrimaryStroke} h s calc(l + ${lightnessHover}))`;
export const groupButtonPrimaryBackgroundPressed = `hsl(from ${groupButtonPrimaryBackground} h s calc(l + ${groupButtonPrimaryLightnessPressed}))`;
export const groupButtonPrimaryStrokePressed = `hsl(from ${groupButtonPrimaryStroke} h s calc(l + ${lightnessSelectedPressed}))`;
export const groupButtonTransparentForegroundPressed = `hsl(from ${groupButtonTransparentForegroundSelected} h s calc(l + ${lightnessPressed}))`;
export const groupButtonTransparentForegroundHover = `hsl(from ${groupButtonTransparentForegroundSelected} h s calc(l + ${lightnessHover}))`;

export const groupButtonNeutralBackgroundHoverSelected = `hsl(from ${groupButtonNeutralBackgroundSelected} h s calc(l + ${lightnessSelectedHover}))`;
export const groupButtonNeutralBackgroundPressedSelected = `hsl(from ${groupButtonNeutralBackgroundSelected} h s calc(l + ${lightnessSelectedPressed}))`;
export const groupButtonNeutralStrokeHoverSelected = `hsl(from ${groupButtonNeutralStrokeSelected} h s calc(l + ${lightnessHover}))`;
export const groupButtonNeutralStrokePressedSelected = `hsl(from ${groupButtonNeutralStrokeSelected} h s calc(l + ${lightnessPressed}))`;
export const groupButtonOutlineStrokeHoverSelected = `hsl(from ${groupButtonOutlineStrokeSelected} h s calc(l + ${lightnessHover}))`;
export const groupButtonOutlineStrokePressedSelected = `hsl(from ${groupButtonOutlineStrokeSelected} h s calc(l + ${lightnessPressed}))`;
export const groupButtonOutlineBackgroundHoverSelected = `hsl(from ${groupButtonOutlineBackgroundSelected} h s calc(l + ${lightnessSelectedHover}))`;
export const groupButtonOutlineBackgroundPressedSelected = `hsl(from ${groupButtonOutlineBackgroundSelected} h s calc(l + ${lightnessSelectedPressed}))`;
export const groupButtonPrimaryBackgroundHoverSelected = `hsl(from ${groupButtonPrimaryBackgroundSelected} h s calc(l + ${lightnessSelectedHover}))`;
export const groupButtonPrimaryBackgroundPressedSelected = `hsl(from ${groupButtonPrimaryBackgroundSelected} h s calc(l + ${lightnessSelectedPressed}))`;
export const groupButtonPrimaryStrokeHoverSelected = `hsl(from ${groupButtonPrimaryStrokeSelected} h s calc(l + ${lightnessSelectedHover}))`;
export const groupButtonPrimaryStrokePressedSelected = `hsl(from ${groupButtonPrimaryStrokeSelected} h s calc(l + ${lightnessSelectedPressed}))`;
export const groupButtonSubtleBackgroundHoverSelected = `hsl(from ${groupButtonSubtleBackgroundSelected} h s calc(l + ${lightnessSelectedHover}))`;
export const groupButtonSubtleBackgroundPressedSelected = `hsl(from ${groupButtonSubtleBackgroundSelected} h s calc(l + ${lightnessSelectedPressed}))`;
export const groupButtonSubtleIconForegroundHoverSelected = `hsl(from ${groupButtonSubtleIconForegroundSelected} h s calc(l + ${lightnessHover}))`;
export const groupButtonSubtleIconForegroundPressedSelected = `hsl(from ${groupButtonSubtleIconForegroundSelected} h s calc(l + ${lightnessPressed}))`;
export const groupButtonSubtleBackgroundHover = `hsla(from ${groupButtonSubtleBackground} h s calc(l + ${lightnessHover}) / 5%)`;
export const groupButtonSubtleBackgroundPressed = `hsla(from ${groupButtonSubtleBackground} h s calc(l + ${lightnessPressed}) / 15%)`;

// Compound button tokens
export const ctrlCompoundbuttonSmallIcononlyPadding = `calc(${groupButtonIcononlyPadding} / 5 * 4)`;
export const ctrlCompoundbuttonIcononlyPadding = `calc(${groupButtonIcononlyPadding} / 5 * 6)`;
export const ctrlCompoundbuttonLargeIcononlyPadding = `calc(${groupButtonIcononlyPadding} / 5 * 8)`;
export const ctrlCompoundbuttonIconSize = `calc(${groupButtonIconSize} * 2)`;
export const ctrlCompoundbuttonGap = `calc(${groupButtonGap} * 2)`;
export const ctrlCompoundbuttonPaddingTop = `calc(${groupButtonPaddingTop} / 5 * 14)`;
export const ctrlCompoundbuttonPaddingBottom = `calc(${groupButtonPaddingBottom} / 5 * 16)`;
export const ctrlCompoundbuttonSmallPaddingTop = `calc(${groupButtonPaddingTop} / 5 * 8)`;
export const ctrlCompoundbuttonSmallPaddingBottom = `calc(${groupButtonPaddingBottom} / 5 * 10)`;
export const ctrlCompoundbuttonSmallPaddingHorizontal = `calc(${groupButtonPaddingHorizontal} / 12 * 8)`;
export const ctrlCompoundbuttonLargePaddingTop = `calc(${groupButtonPaddingTop} / 5 * 18)`;
export const ctrlCompoundbuttonLargePaddingBottom = `calc(${groupButtonPaddingBottom} / 5 * 20)`;
export const ctrlCompoundbuttonLargePaddingHorizontal = `calc(${groupButtonPaddingHorizontal} / 12 * 16)`;

// Extension algo tokens
export const groupButtonSubtleIconForegroundPressed = `hsl(from ${groupButtonSubtleIconForegroundHover} h s calc(l + ${lightnessPressed} / 2))`;
