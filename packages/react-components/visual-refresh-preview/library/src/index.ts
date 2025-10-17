import * as React from 'react';
import { tokens } from '@fluentui/react-theme';

export const VisualRefreshContext = React.createContext(false);

export function useIsVisualRefreshEnabled() {
  return React.useContext(VisualRefreshContext);
}

export const MAI_SEMANTIC_TOKENS = {
  'stv1_size/ctrl/default': '',
  'stv1_size/ctrl/sm': '',
  'stv1_size/ctrl/lg': '',
  // Padding
  'stv1_padding/ctrl/textTop': '',
  'stv1_padding/ctrl/textBottom': '',
  'stv1_padding/ctrl/textSide': '',
  'stv1_padding/ctrl/horizontal-default': '',
  'stv1_padding/ctrl/horizontal-iconOnly': '',
  // Gap
  'stv1_gap/inside/ctrl/default': '',
  'stv1_gap/inside/ctrl/toSecondaryIcon': '',
  // Corner
  'stv1_corner/ctrl/default': '',
  'stv1_corner/ctrl/sm': '',
  'stv1_corner/ctrl/lg': '',
  // Background
  'stv1_background/ctrl/neutral/rest': '',
  'stv1_background/ctrl/neutral/hover': '',
  'stv1_background/ctrl/neutral/pressed': '',
  'stv1_background/ctrl/neutral/disabled': '',
  'stv1_background/ctrl/neutral/selected/rest': '',
  'stv1_background/ctrl/neutral/selected/hover': '',
  'stv1_background/ctrl/neutral/selected/pressed': '',
  'stv1_background/ctrl/neutral/selected/disabled': '',
  'stv1_background/ctrl/brand/rest': '',
  'stv1_background/ctrl/brand/hover': '',
  'stv1_background/ctrl/brand/pressed': '',
  'stv1_background/ctrl/brand/disabled': '',
  'stv1_background/ctrl/brand/selected/rest': '',
  'stv1_background/ctrl/brand/selected/hover': '',
  'stv1_background/ctrl/brand/selected/pressed': '',
  'stv1_background/ctrl/brand/selected/disabled': '',
  'stv1_background/ctrl/outline/rest': '',
  'stv1_background/ctrl/outline/hover': '',
  'stv1_background/ctrl/outline/pressed': '',
  'stv1_background/ctrl/outline/disabled': '',
  'stv1_background/ctrl/outline/selected/rest': '',
  'stv1_background/ctrl/outline/selected/hover': '',
  'stv1_background/ctrl/outline/selected/pressed': '',
  'stv1_background/ctrl/outline/selected/disabled': '',
  'stv1_background/ctrl/subtle/rest': '',
  'stv1_background/ctrl/subtle/hover': '',
  'stv1_background/ctrl/subtle/pressed': '',
  'stv1_background/ctrl/subtle/disabled': '',
  'stv1_background/ctrl/subtle/selected/rest': '',
  'stv1_background/ctrl/subtle/selected/hover': '',
  'stv1_background/ctrl/subtle/selected/pressed': '',
  'stv1_background/ctrl/subtle/selected/disabled': '',
  'stv1_background/ctrl/transparent/rest': '',
  'stv1_background/ctrl/transparent/hover': '',
  'stv1_background/ctrl/transparent/pressed': '',
  'stv1_background/ctrl/transparent/disabled': '',
  'stv1_background/ctrl/transparent/selected/rest': '',
  'stv1_background/ctrl/transparent/selected/hover': '',
  'stv1_background/ctrl/transparent/selected/pressed': '',
  'stv1_background/ctrl/transparent/selected/disabled': '',
  // Foreground"
  'stv1_foreground/ctrl/neutral/rest': '',
  'stv1_foreground/ctrl/neutral/hover': '',
  'stv1_foreground/ctrl/neutral/pressed': '',
  'stv1_foreground/ctrl/neutral/disabled': '',
  'stv1_foreground/ctrl/neutral/selected/rest': '',
  'stv1_foreground/ctrl/neutral/selected/hover': '',
  'stv1_foreground/ctrl/neutral/selected/pressed': '',
  'stv1_foreground/ctrl/neutral/selected/disabled': '',
  'stv1_foreground/ctrl/brand/rest': '',
  'stv1_foreground/ctrl/brand/hover': '',
  'stv1_foreground/ctrl/brand/pressed': '',
  'stv1_foreground/ctrl/brand/disabled': '',
  'stv1_foreground/ctrl/brand/selected/rest': '',
  'stv1_foreground/ctrl/brand/selected/hover': '',
  'stv1_foreground/ctrl/brand/selected/pressed': '',
  'stv1_foreground/ctrl/brand/selected/disabled': '',
  'stv1_foreground/ctrl/outline/rest': '',
  'stv1_foreground/ctrl/outline/hover': '',
  'stv1_foreground/ctrl/outline/pressed': '',
  'stv1_foreground/ctrl/outline/disabled': '',
  'stv1_foreground/ctrl/outline/selected/rest': '',
  'stv1_foreground/ctrl/outline/selected/hover': '',
  'stv1_foreground/ctrl/outline/selected/pressed': '',
  'stv1_foreground/ctrl/outline/selected/disabled': '',
  'stv1_foreground/ctrl/subtle/rest': '',
  'stv1_foreground/ctrl/subtle/hover': '',
  'stv1_foreground/ctrl/subtle/pressed': '',
  'stv1_foreground/ctrl/subtle/disabled': '',
  'stv1_foreground/ctrl/subtle/selected/rest': '',
  'stv1_foreground/ctrl/subtle/selected/hover': '',
  'stv1_foreground/ctrl/subtle/selected/pressed': '',
  'stv1_foreground/ctrl/subtle/selected/disabled': '',
  'stv1_foreground/ctrl/transparent/rest': '',
  'stv1_foreground/ctrl/transparent/hover': '',
  'stv1_foreground/ctrl/transparent/pressed': '',
  'stv1_foreground/ctrl/transparent/disabled': '',
  'stv1_foreground/ctrl/transparent/selected/rest': '',
  'stv1_foreground/ctrl/transparent/selected/hover': '',
  'stv1_foreground/ctrl/transparent/selected/pressed': '',
  'stv1_foreground/ctrl/transparent/selected/disabled': '',
  // Stroke"
  'stv1_stroke/ctrl/neutral/rest': '',
  'stv1_stroke/ctrl/neutral/hover': '',
  'stv1_stroke/ctrl/neutral/pressed': '',
  'stv1_stroke/ctrl/neutral/disabled': '',
  'stv1_stroke/ctrl/neutral/selected/rest': '',
  'stv1_stroke/ctrl/neutral/selected/hover': '',
  'stv1_stroke/ctrl/neutral/selected/pressed': '',
  'stv1_stroke/ctrl/neutral/selected/disabled': '',
  'stv1_stroke/ctrl/brand/rest': '',
  'stv1_stroke/ctrl/brand/hover': '',
  'stv1_stroke/ctrl/brand/pressed': '',
  'stv1_stroke/ctrl/brand/disabled': '',
  'stv1_stroke/ctrl/brand/selected/rest': '',
  'stv1_stroke/ctrl/brand/selected/hover': '',
  'stv1_stroke/ctrl/brand/selected/pressed': '',
  'stv1_stroke/ctrl/brand/selected/disabled': '',
  'stv1_stroke/ctrl/outline/rest': '',
  'stv1_stroke/ctrl/outline/hover': '',
  'stv1_stroke/ctrl/outline/pressed': '',
  'stv1_stroke/ctrl/outline/disabled': '',
  'stv1_stroke/ctrl/outline/selected/rest': '',
  'stv1_stroke/ctrl/outline/selected/hover': '',
  'stv1_stroke/ctrl/outline/selected/pressed': '',
  'stv1_stroke/ctrl/outline/selected/disabled': '',
  'stv1_stroke/control/on/outline/rest': '',
  'stv1_stroke/control/on/outline/hover': '',
  'stv1_stroke/control/on/outline/pressed': '',
  'stv1_stroke/control/on/outline/disabled': '',
  'stv1_stroke/control/on/outline/selected/rest': '',
  'stv1_stroke/control/on/outline/selected/hover': '',
  'stv1_stroke/control/on/outline/selected/pressed': '',
  'stv1_stroke/control/on/outline/selected/disabled': '',
  // Stroke Width"
  'stv1_strokeWidth/ctrl/outline/rest': '',
  'stv1_strokeWidth/ctrl/outline/hover': '',
  'stv1_strokeWidth/ctrl/outline/pressed': '',
  'stv1_strokeWidth/ctrl/outline/disabled': '',
  'stv1_strokeWidth/ctrl/outline/selected/rest': '',
  'stv1_strokeWidth/ctrl/outline/selected/hover': '',
  'stv1_strokeWidth/ctrl/outline/selected/pressed': '',
  'stv1_strokeWidth/ctrl/outline/selected/disabled': '',
  'stv1_strokeWidth/default': '',
  // Shadow"
  'stv1_shadow/ctrl/default/rest': '',
  'stv1_shadow/ctrl/default/hover': '',
  'stv1_shadow/ctrl/default/pressed': '',
  'stv1_shadow/ctrl/default/disabled': '',
  'stv1_shadow/ctrl/default/selected/rest': '',
  'stv1_shadow/ctrl/default/selected/hover': '',
  'stv1_shadow/ctrl/default/selected/pressed': '',
  'stv1_shadow/ctrl/default/selected/disabled': '',
  'stv1_shadow/ctrl/brand/rest': '',
  'stv1_shadow/ctrl/brand/hover': '',
  'stv1_shadow/ctrl/brand/pressed': '',
  'stv1_shadow/ctrl/brand/disabled': '',
  'stv1_shadow/ctrl/brand/selected/rest': '',
  'stv1_shadow/ctrl/brand/selected/hover': '',
  'stv1_shadow/ctrl/brand/selected/pressed': '',
  'stv1_shadow/ctrl/brand/selected/disabled': '',
  'stv1_shadow/ctrl/outline/rest': '',
  'stv1_shadow/ctrl/outline/hover': '',
  'stv1_shadow/ctrl/outline/pressed': '',
  'stv1_shadow/ctrl/outline/disabled': '',
  'stv1_shadow/ctrl/outline/selected/rest': '',
  'stv1_shadow/ctrl/outline/selected/hover': '',
  'stv1_shadow/ctrl/outline/selected/pressed': '',
  'stv1_shadow/ctrl/outline/selected/disabled': '',
  // Icon Theme"
  'stv1_iconTheme/ctrl/default/rest': '',
  'stv1_iconTheme/ctrl/default/hover': '',
  'stv1_iconTheme/ctrl/default/pressed': '',
  'stv1_iconTheme/ctrl/default/selected': '',
  'stv1_iconTheme/ctrl/subtle/rest': '',
  'stv1_iconTheme/ctrl/subtle/hover': '',
  'stv1_iconTheme/ctrl/subtle/pressed': '',
  'stv1_iconTheme/ctrl/subtle/selected': '',
  'stv1_iconTheme/ctrl/chevron/default': '',
  'stv1_iconTheme/ctrl/chevron/selected': '',
  // Icon Color"
  'stv1_iconColor/ctrl/default/rest': '',
  'stv1_iconColor/ctrl/default/hover': '',
  'stv1_iconColor/ctrl/default/pressed': '',
  'stv1_iconColor/ctrl/default/selected': '',
  'stv1_iconColor/ctrl/chevron/default': '',
  'stv1_iconColor/ctrl/chevron/selected': '',
  // Typography"
  'stv1_fontSize/ctrl/default': '',
  'stv1_fontWeight/ctrl/default': '',
  'stv1_fontFamily/ctrl/default': '',
  'stv1_lineHeight/ctrl/default': '',
  'stv1_letterSpacing/ctrl/default': '',
  'stv1_textStyle/ctrl/body': '',
  'stv1_textStyle/ctrl/header': '',
} as const satisfies {
  [key: string]: any;
};

/**
 * Notes
 * 1. sm, default, lg -> sm, md, lg.
 * 2. padding/ctrl/horizontal-default -> padding/ctrl/horizontal/md
 * 3. gap/inside/ctrl/default -> gap/ctrl/md - no gap outside
 * 4. fontWeight, lineHeight - ? - no size relation (sm, md, lg)
 * 5. @media (forced-colors: active) ? - missed
 * 6. background/ctrl/neutral/selected - no "selected" option for the current Button implementation
 * 7. background/ctrl/neutral/hover vs iconColor/ctrl/default/rest
 * 8. Fluent UI not defines chevron as icon for Button. Intead the call Button with chevron MenuButton
 *      - MenuButton + icon/ctrl
 *      - Button + primaryIcon/ctrl + secondaryIcon/ctrl
 * 9. if border="transparent" it makes button height 2px size less depends on variant
 * 10. size/ctrl/lg - what should we do with icon size? 12px/16px/16px
 * 11. Theme support? light/dark/HC?
 *
 * Delta
 * ------------------------------------------------------
 * Colors
 * '#00595D', // tokens.colorPaletteLightTealForeground2
 * '#00686D', // tokens.colorPaletteLightTealForeground2
 * '#03787c', // tokens.colorPaletteTealForeground2
 * '#00393d', // tokens.colorPaletteSteelForeground2
 *
 * ------------------------------------------------------
 * Border Radius (12px)
 * Sizes (all)
 */

export const TEAMS_VISUAL_REFRESH_THEME = {
  'size/ctrl/md': '36px',
  'size/ctrl/sm': '28px',
  'size/ctrl/lg': '40px',

  // Button
  // Padding
  'padding/ctrl/horizontal/sm': tokens.spacingHorizontalS,
  'padding/ctrl/horizontal/md': tokens.spacingHorizontalM,
  'padding/ctrl/horizontal/lg': tokens.spacingHorizontalM,

  'padding/ctrl/vertical/sm': tokens.spacingVerticalXS,
  'padding/ctrl/vertical/md': tokens.spacingVerticalS,
  'padding/ctrl/vertical/lg': tokens.spacingVerticalMNudge,
  // Gap
  'gap/ctrl/sm': tokens.spacingHorizontalXS,
  'gap/ctrl/md': tokens.spacingHorizontalSNudge,
  'gap/ctrl/lg': tokens.spacingHorizontalSNudge,

  // Border radius
  'corner/ctrl/sm': '12px',
  'corner/ctrl/md': '12px',
  'corner/ctrl/lg': '12px',

  // Font
  'fontSize/ctrl/sm': tokens.fontSizeBase200,
  'fontSize/ctrl/md': tokens.fontSizeBase300,
  'fontSize/ctrl/lg': tokens.fontSizeBase300,

  'lineHeight/ctrl/sm': tokens.lineHeightBase200,
  'lineHeight/ctrl/md': tokens.lineHeightBase300,
  'lineHeight/ctrl/lg': tokens.lineHeightBase300,

  'fontWeight/ctrl/sm': tokens.fontWeightSemibold,
  'fontWeight/ctrl/md': tokens.fontWeightSemibold,
  'fontWeight/ctrl/lg': tokens.fontWeightSemibold,

  'foreground/ctrl/neutral/rest': tokens.colorNeutralForeground3,
  'foreground/ctrl/neutral/hover': tokens.colorNeutralForeground3Hover,
  'foreground/ctrl/neutral/pressed': tokens.colorNeutralForeground3Pressed,
  'foreground/ctrl/neutral/disabled': tokens.colorNeutralForegroundDisabled,

  'foreground/ctrl/brand/rest': tokens.colorNeutralForegroundOnBrand,
  'foreground/ctrl/brand/hover': tokens.colorNeutralForegroundOnBrand,
  'foreground/ctrl/brand/pressed': tokens.colorNeutralForegroundOnBrand,
  'foreground/ctrl/brand/disabled': tokens.colorNeutralForegroundDisabled,

  'foreground/ctrl/outline/rest': tokens.colorNeutralForeground3,
  'foreground/ctrl/outline/hover': tokens.colorNeutralForeground3Hover,
  'foreground/ctrl/outline/pressed': tokens.colorNeutralForeground3Pressed,
  'foreground/ctrl/outline/disabled': tokens.colorNeutralForegroundDisabled,

  'foreground/ctrl/subtle/rest': tokens.colorNeutralForeground3,
  'foreground/ctrl/subtle/hover': tokens.colorNeutralForeground3Hover,
  'foreground/ctrl/subtle/pressed': tokens.colorNeutralForeground3Pressed,
  'foreground/ctrl/subtle/disabled': tokens.colorNeutralForegroundDisabled,

  'foreground/ctrl/transparent/rest': tokens.colorNeutralForeground3,
  'foreground/ctrl/transparent/hover': '#00686D', // tokens.colorPaletteLightTealForeground2
  'foreground/ctrl/transparent/pressed': '#00595D', // tokens.colorPaletteLightTealForeground2
  'foreground/ctrl/transparent/disabled': tokens.colorNeutralForegroundDisabled,

  // Background
  'background/ctrl/neutral/rest': tokens.colorNeutralBackground2,
  'background/ctrl/neutral/hover': tokens.colorNeutralBackground2Hover,
  'background/ctrl/neutral/pressed': tokens.colorNeutralBackground2Pressed,
  'background/ctrl/neutral/disabled': tokens.colorNeutralBackgroundDisabled,

  'background/ctrl/brand/rest': '#03787c', // tokens.colorPaletteTealForeground2
  'background/ctrl/brand/hover': tokens.colorPaletteLightTealForeground2,
  'background/ctrl/brand/pressed': '#00393d', // tokens.colorPaletteSteelForeground2
  'background/ctrl/brand/disabled': tokens.colorNeutralBackgroundDisabled,

  'background/ctrl/outline/rest': tokens.colorTransparentBackground,
  'background/ctrl/outline/hover': tokens.colorTransparentBackgroundHover,
  'background/ctrl/outline/pressed': tokens.colorTransparentBackgroundPressed,
  'background/ctrl/outline/disabled': tokens.colorTransparentBackground,

  'background/ctrl/subtle/rest': tokens.colorTransparentBackground,
  'background/ctrl/subtle/hover': tokens.colorSubtleBackgroundHover,
  'background/ctrl/subtle/pressed': tokens.colorSubtleBackgroundPressed,
  'background/ctrl/subtle/disabled': tokens.colorTransparentBackground,

  'background/ctrl/transparent/rest': tokens.colorTransparentBackground,
  'background/ctrl/transparent/hover': tokens.colorTransparentBackgroundHover,
  'background/ctrl/transparent/pressed': tokens.colorTransparentBackgroundPressed,
  'background/ctrl/transparent/disabled': tokens.colorTransparentBackground,

  // Border
  'borderColor/ctrl/neutral/rest': tokens.colorNeutralStroke1,
  'borderColor/ctrl/neutral/hover': tokens.colorNeutralStroke1Hover,
  'borderColor/ctrl/neutral/pressed': tokens.colorNeutralStroke1Pressed,
  'borderColor/ctrl/neutral/disabled': tokens.colorNeutralStrokeDisabled,

  'borderColor/ctrl/brand/rest': tokens.colorTransparentStroke, // Acturally should be the same as background, if not sizes would be different
  'borderColor/ctrl/brand/hover': tokens.colorTransparentStroke,
  'borderColor/ctrl/brand/pressed': tokens.colorTransparentStroke,
  'borderColor/ctrl/brand/disabled': tokens.colorTransparentStroke,

  'borderColor/ctrl/outline/rest': tokens.colorNeutralStroke1,
  'borderColor/ctrl/outline/hover': tokens.colorNeutralStroke1Hover,
  'borderColor/ctrl/outline/pressed': tokens.colorNeutralStroke1Pressed,
  'borderColor/ctrl/outline/disabled': tokens.colorNeutralStrokeDisabled,

  'borderColor/ctrl/subtle/rest': tokens.colorTransparentStroke,
  'borderColor/ctrl/subtle/hover': tokens.colorTransparentStroke,
  'borderColor/ctrl/subtle/pressed': tokens.colorTransparentStroke,
  'borderColor/ctrl/subtle/disabled': tokens.colorTransparentStroke,

  'borderColor/ctrl/transparent/rest': tokens.colorTransparentStroke,
  'borderColor/ctrl/transparent/hover': tokens.colorTransparentStroke,
  'borderColor/ctrl/transparent/pressed': tokens.colorTransparentStroke,
  'borderColor/ctrl/transparent/disabled': tokens.colorTransparentStroke,

  // Icon
  'iconColor/ctrl/neutral/rest': tokens.colorNeutralForeground3,
  'iconColor/ctrl/neutral/hover': tokens.colorNeutralForeground3Hover,
  'iconColor/ctrl/neutral/pressed': '#00595D', // tokens.colorPaletteLightTealForeground2
  'iconColor/ctrl/neutral/disabled': tokens.colorNeutralForegroundDisabled,

  'iconColor/ctrl/brand/rest': tokens.colorNeutralForegroundOnBrand,
  'iconColor/ctrl/brand/hover': tokens.colorNeutralForegroundOnBrand,
  'iconColor/ctrl/brand/pressed': tokens.colorNeutralForegroundOnBrand,
  'iconColor/ctrl/brand/disabled': tokens.colorNeutralForegroundDisabled,

  'iconColor/ctrl/outline/rest': tokens.colorNeutralForeground3,
  'iconColor/ctrl/outline/hover': tokens.colorNeutralForeground3Hover,
  'iconColor/ctrl/outline/pressed': '#00595D', // tokens.colorPaletteLightTealForeground2
  'iconColor/ctrl/outline/disabled': tokens.colorNeutralForegroundDisabled,

  'iconColor/ctrl/subtle/rest': tokens.colorNeutralForeground3,
  'iconColor/ctrl/subtle/hover': '#00686D', // tokens.colorPaletteLightTealForeground2
  'iconColor/ctrl/subtle/pressed': '#00595D', // tokens.colorPaletteLightTealForeground2
  'iconColor/ctrl/subtle/disabled': tokens.colorNeutralForegroundDisabled,

  'iconColor/ctrl/transparent/rest': tokens.colorNeutralForeground3,
  'iconColor/ctrl/transparent/hover': '#00686D', // tokens.colorPaletteLightTealForeground2
  'iconColor/ctrl/transparent/pressed': '#00595D', // tokens.colorPaletteLightTealForeground2
  'iconColor/ctrl/transparent/disabled': tokens.colorNeutralForegroundDisabled,
};

export const TEAMS_VISUAL_REFRESH_TOKENS = Object.fromEntries(
  Object.entries(TEAMS_VISUAL_REFRESH_THEME).map(([key, value]) => [sanitizeTokenName(key), String(value)]),
) as Record<string, string>;

export const EXPECTED_SEMANTIC_V2_TOKENS = {
  groupButtonBackground: 'background/ctrl/neutral/rest', // -> colorNeutralBackground1
};

export function sanitizeTokenName(token: string) {
  return token.replace(/\//g, '_');
}

type TokenName = keyof typeof MAI_SEMANTIC_TOKENS | keyof typeof TEAMS_VISUAL_REFRESH_THEME;
export function semanticTokenVar(token: TokenName) {
  return `var(--${sanitizeTokenName(token)})`;
}
