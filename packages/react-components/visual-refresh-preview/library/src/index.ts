import * as React from 'react';
import { tokens } from '@fluentui/react-theme';

export const VisualRefreshContext = React.createContext(false);

export function useIsVisualRefreshEnabled() {
  return React.useContext(VisualRefreshContext);
}

export const MAI_SEMANTIC_TOKENS = {
  'stv1_size/ctrl/default': {},
  'stv1_size/ctrl/sm': {},
  'stv1_size/ctrl/lg': {},
  // Padding
  'stv1_padding/ctrl/textTop': {},
  'stv1_padding/ctrl/textBottom': {},
  'stv1_padding/ctrl/textSide': {},
  'stv1_padding/ctrl/horizontal-default': {},
  'stv1_padding/ctrl/horizontal-iconOnly': {},
  // Gap
  'stv1_gap/inside/ctrl/default': {},
  'stv1_gap/inside/ctrl/toSecondaryIcon': {},
  // Corner
  'stv1_corner/ctrl/default': {},
  'stv1_corner/ctrl/sm': {},
  'stv1_corner/ctrl/lg': {},
  // Background
  'stv1_background/ctrl/neutral/rest': {},
  'stv1_background/ctrl/neutral/hover': {},
  'stv1_background/ctrl/neutral/pressed': {},
  'stv1_background/ctrl/neutral/disabled': {},
  'stv1_background/ctrl/neutral/selected/rest': {},
  'stv1_background/ctrl/neutral/selected/hover': {},
  'stv1_background/ctrl/neutral/selected/pressed': {},
  'stv1_background/ctrl/neutral/selected/disabled': {},
  'stv1_background/ctrl/brand/rest': {},
  'stv1_background/ctrl/brand/hover': {},
  'stv1_background/ctrl/brand/pressed': {},
  'stv1_background/ctrl/brand/disabled': {},
  'stv1_background/ctrl/brand/selected/rest': {},
  'stv1_background/ctrl/brand/selected/hover': {},
  'stv1_background/ctrl/brand/selected/pressed': {},
  'stv1_background/ctrl/brand/selected/disabled': {},
  'stv1_background/ctrl/outline/rest': {},
  'stv1_background/ctrl/outline/hover': {},
  'stv1_background/ctrl/outline/pressed': {},
  'stv1_background/ctrl/outline/disabled': {},
  'stv1_background/ctrl/outline/selected/rest': {},
  'stv1_background/ctrl/outline/selected/hover': {},
  'stv1_background/ctrl/outline/selected/pressed': {},
  'stv1_background/ctrl/outline/selected/disabled': {},
  'stv1_background/ctrl/subtle/rest': {},
  'stv1_background/ctrl/subtle/hover': {},
  'stv1_background/ctrl/subtle/pressed': {},
  'stv1_background/ctrl/subtle/disabled': {},
  'stv1_background/ctrl/subtle/selected/rest': {},
  'stv1_background/ctrl/subtle/selected/hover': {},
  'stv1_background/ctrl/subtle/selected/pressed': {},
  'stv1_background/ctrl/subtle/selected/disabled': {},
  'stv1_background/ctrl/transparent/rest': {},
  'stv1_background/ctrl/transparent/hover': {},
  'stv1_background/ctrl/transparent/pressed': {},
  'stv1_background/ctrl/transparent/disabled': {},
  'stv1_background/ctrl/transparent/selected/rest': {},
  'stv1_background/ctrl/transparent/selected/hover': {},
  'stv1_background/ctrl/transparent/selected/pressed': {},
  'stv1_background/ctrl/transparent/selected/disabled': {},
  // Foreground"
  'stv1_foreground/ctrl/neutral/rest': {},
  'stv1_foreground/ctrl/neutral/hover': {},
  'stv1_foreground/ctrl/neutral/pressed': {},
  'stv1_foreground/ctrl/neutral/disabled': {},
  'stv1_foreground/ctrl/neutral/selected/rest': {},
  'stv1_foreground/ctrl/neutral/selected/hover': {},
  'stv1_foreground/ctrl/neutral/selected/pressed': {},
  'stv1_foreground/ctrl/neutral/selected/disabled': {},
  'stv1_foreground/ctrl/brand/rest': {},
  'stv1_foreground/ctrl/brand/hover': {},
  'stv1_foreground/ctrl/brand/pressed': {},
  'stv1_foreground/ctrl/brand/disabled': {},
  'stv1_foreground/ctrl/brand/selected/rest': {},
  'stv1_foreground/ctrl/brand/selected/hover': {},
  'stv1_foreground/ctrl/brand/selected/pressed': {},
  'stv1_foreground/ctrl/brand/selected/disabled': {},
  'stv1_foreground/ctrl/outline/rest': {},
  'stv1_foreground/ctrl/outline/hover': {},
  'stv1_foreground/ctrl/outline/pressed': {},
  'stv1_foreground/ctrl/outline/disabled': {},
  'stv1_foreground/ctrl/outline/selected/rest': {},
  'stv1_foreground/ctrl/outline/selected/hover': {},
  'stv1_foreground/ctrl/outline/selected/pressed': {},
  'stv1_foreground/ctrl/outline/selected/disabled': {},
  'stv1_foreground/ctrl/subtle/rest': {},
  'stv1_foreground/ctrl/subtle/hover': {},
  'stv1_foreground/ctrl/subtle/pressed': {},
  'stv1_foreground/ctrl/subtle/disabled': {},
  'stv1_foreground/ctrl/subtle/selected/rest': {},
  'stv1_foreground/ctrl/subtle/selected/hover': {},
  'stv1_foreground/ctrl/subtle/selected/pressed': {},
  'stv1_foreground/ctrl/subtle/selected/disabled': {},
  'stv1_foreground/ctrl/transparent/rest': {},
  'stv1_foreground/ctrl/transparent/hover': {},
  'stv1_foreground/ctrl/transparent/pressed': {},
  'stv1_foreground/ctrl/transparent/disabled': {},
  'stv1_foreground/ctrl/transparent/selected/rest': {},
  'stv1_foreground/ctrl/transparent/selected/hover': {},
  'stv1_foreground/ctrl/transparent/selected/pressed': {},
  'stv1_foreground/ctrl/transparent/selected/disabled': {},
  // Stroke"
  'stv1_stroke/ctrl/neutral/rest': {},
  'stv1_stroke/ctrl/neutral/hover': {},
  'stv1_stroke/ctrl/neutral/pressed': {},
  'stv1_stroke/ctrl/neutral/disabled': {},
  'stv1_stroke/ctrl/neutral/selected/rest': {},
  'stv1_stroke/ctrl/neutral/selected/hover': {},
  'stv1_stroke/ctrl/neutral/selected/pressed': {},
  'stv1_stroke/ctrl/neutral/selected/disabled': {},
  'stv1_stroke/ctrl/brand/rest': {},
  'stv1_stroke/ctrl/brand/hover': {},
  'stv1_stroke/ctrl/brand/pressed': {},
  'stv1_stroke/ctrl/brand/disabled': {},
  'stv1_stroke/ctrl/brand/selected/rest': {},
  'stv1_stroke/ctrl/brand/selected/hover': {},
  'stv1_stroke/ctrl/brand/selected/pressed': {},
  'stv1_stroke/ctrl/brand/selected/disabled': {},
  'stv1_stroke/ctrl/outline/rest': {},
  'stv1_stroke/ctrl/outline/hover': {},
  'stv1_stroke/ctrl/outline/pressed': {},
  'stv1_stroke/ctrl/outline/disabled': {},
  'stv1_stroke/ctrl/outline/selected/rest': {},
  'stv1_stroke/ctrl/outline/selected/hover': {},
  'stv1_stroke/ctrl/outline/selected/pressed': {},
  'stv1_stroke/ctrl/outline/selected/disabled': {},
  'stv1_stroke/control/on/outline/rest': {},
  'stv1_stroke/control/on/outline/hover': {},
  'stv1_stroke/control/on/outline/pressed': {},
  'stv1_stroke/control/on/outline/disabled': {},
  'stv1_stroke/control/on/outline/selected/rest': {},
  'stv1_stroke/control/on/outline/selected/hover': {},
  'stv1_stroke/control/on/outline/selected/pressed': {},
  'stv1_stroke/control/on/outline/selected/disabled': {},
  // Stroke Width"
  'stv1_strokeWidth/ctrl/outline/rest': {},
  'stv1_strokeWidth/ctrl/outline/hover': {},
  'stv1_strokeWidth/ctrl/outline/pressed': {},
  'stv1_strokeWidth/ctrl/outline/disabled': {},
  'stv1_strokeWidth/ctrl/outline/selected/rest': {},
  'stv1_strokeWidth/ctrl/outline/selected/hover': {},
  'stv1_strokeWidth/ctrl/outline/selected/pressed': {},
  'stv1_strokeWidth/ctrl/outline/selected/disabled': {},
  'stv1_strokeWidth/default': {},
  // Shadow"
  'stv1_shadow/ctrl/default/rest': {},
  'stv1_shadow/ctrl/default/hover': {},
  'stv1_shadow/ctrl/default/pressed': {},
  'stv1_shadow/ctrl/default/disabled': {},
  'stv1_shadow/ctrl/default/selected/rest': {},
  'stv1_shadow/ctrl/default/selected/hover': {},
  'stv1_shadow/ctrl/default/selected/pressed': {},
  'stv1_shadow/ctrl/default/selected/disabled': {},
  'stv1_shadow/ctrl/brand/rest': {},
  'stv1_shadow/ctrl/brand/hover': {},
  'stv1_shadow/ctrl/brand/pressed': {},
  'stv1_shadow/ctrl/brand/disabled': {},
  'stv1_shadow/ctrl/brand/selected/rest': {},
  'stv1_shadow/ctrl/brand/selected/hover': {},
  'stv1_shadow/ctrl/brand/selected/pressed': {},
  'stv1_shadow/ctrl/brand/selected/disabled': {},
  'stv1_shadow/ctrl/outline/rest': {},
  'stv1_shadow/ctrl/outline/hover': {},
  'stv1_shadow/ctrl/outline/pressed': {},
  'stv1_shadow/ctrl/outline/disabled': {},
  'stv1_shadow/ctrl/outline/selected/rest': {},
  'stv1_shadow/ctrl/outline/selected/hover': {},
  'stv1_shadow/ctrl/outline/selected/pressed': {},
  'stv1_shadow/ctrl/outline/selected/disabled': {},
  // Icon Theme"
  'stv1_iconTheme/ctrl/default/rest': {},
  'stv1_iconTheme/ctrl/default/hover': {},
  'stv1_iconTheme/ctrl/default/pressed': {},
  'stv1_iconTheme/ctrl/default/selected': {},
  'stv1_iconTheme/ctrl/subtle/rest': {},
  'stv1_iconTheme/ctrl/subtle/hover': {},
  'stv1_iconTheme/ctrl/subtle/pressed': {},
  'stv1_iconTheme/ctrl/subtle/selected': {},
  'stv1_iconTheme/ctrl/chevron/default': {},
  'stv1_iconTheme/ctrl/chevron/selected': {},
  // Icon Color"
  'stv1_iconColor/ctrl/default/rest': {},
  'stv1_iconColor/ctrl/default/hover': {},
  'stv1_iconColor/ctrl/default/pressed': {},
  'stv1_iconColor/ctrl/default/selected': {},
  'stv1_iconColor/ctrl/chevron/default': {},
  'stv1_iconColor/ctrl/chevron/selected': {},
  // Typography"
  'stv1_fontSize/ctrl/default': {},
  'stv1_fontWeight/ctrl/default': {},
  'stv1_fontFamily/ctrl/default': {},
  'stv1_lineHeight/ctrl/default': {},
  'stv1_letterSpacing/ctrl/default': {},
  'stv1_textStyle/ctrl/body': {},
  'stv1_textStyle/ctrl/header': {},
} as const satisfies {
  [key: string]: any;
};

export const TEAMS_VISUAL_REFRESH_THEME = {
  'size/ctrl/default': '36px',
  'size/ctrl/sm': '28px',
  'size/ctrl/lg': '40px',
};

export const EXPECTED_SEMANTIC_V2_TOKENS = {
  groupButtonBackground: 'background/ctrl/neutral/rest', // -> colorNeutralBackground1
};

export function sanitizeTokenName(token: string) {
  return token.replace(/\//g, '_');
}

type TokenName = keyof typeof MAI_SEMANTIC_TOKENS;
export function semanticTokenVar(token: TokenName) {
  return `var(--${sanitizeTokenName(token)})`;
}

// Note: `VisualRefreshTheme` expects a flat key/value map, so the exported theme must stay flat.
// Question to David: If grouping is needed, create intermediate objects
// (e.g. `const buttonShape = { ... }`) and spread them here.
export const TEAMS_VISUAL_REFRESH_TOKENS = {
  // Button
  // Shape tokens
  buttonBorderRadius: '16px',
  buttonRoundedFontFamily: '"Comic Sans MS", "Comic Sans", cursive',
  buttonSquareFontWeight: '800',

  // Root tokens
  buttonRootFontWeight: '400',
  buttonRootPadding: '8px 16px',
  buttonRootBorderWidth: '2px',

  // Appearance tokens
  buttonPrimaryBackgroundColor: 'purple',
  buttonHorizontalPadding: '12px',
};
