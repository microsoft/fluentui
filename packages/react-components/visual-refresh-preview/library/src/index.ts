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
 * 3. gap/inside/ctrl/default -> gap/ctrl/md
 * 4. fontWeight, lineHeight - ?
 * 5. @media (forced-colors: active) ?
 * 6. background/ctrl/neutral/selected - Selected?
 */

export const TEAMS_VISUAL_REFRESH_THEME = {
  'size/ctrl/md': '36px',
  'size/ctrl/sm': '28px',
  'size/ctrl/lg': '40px',
  // Button
  // Padding
  'padding/ctrl/horizontal/sm': '8px',
  'padding/ctrl/horizontal/md': '12px',
  'padding/ctrl/horizontal/lg': '12px',

  'padding/ctrl/vertical/sm': '4px',
  'padding/ctrl/vertical/md': '8px',
  'padding/ctrl/vertical/lg': '10px',
  // Gap
  'gap/ctrl/sm': '4px',
  'gap/ctrl/md': '6px',
  'gap/ctrl/lg': '6px',

  // Border radius
  'corner/ctrl/sm': '12px',
  'corner/ctrl/md': '12px',
  'corner/ctrl/lg': '12px',

  // Font
  'fontSize/ctrl/sm': '12px',
  'fontSize/ctrl/md': '14px',
  'fontSize/ctrl/lg': '14px',

  'lineHeight/ctrl/sm': '16px',
  'lineHeight/ctrl/md': '20px',
  'lineHeight/ctrl/lg': '20px',

  'fontWeight/ctrl/sm': tokens.fontWeightRegular,
  'fontWeight/ctrl/md': tokens.fontWeightRegular,
  'fontWeight/ctrl/lg': tokens.fontWeightRegular,

  // Background
  'background/ctrl/neutral/rest': 'hsl(0, 0%, 98%)',
  'background/ctrl/neutral/hover': 'hsl(0, 0%, 94%)',
  'background/ctrl/neutral/pressed': 'hsl(0, 0%, 86%)',
  'background/ctrl/neutral/disabled': 'hsl(0, 0%, 94%)',

  'background/ctrl/brand/rest': 'hsl(182, 95%, 25%)',
  'background/ctrl/brand/hover': 'hsl(183, 100%, 21%)',
  'background/ctrl/brand/pressed': 'hsl(184, 100%, 12%)',
  'background/ctrl/brand/disabled': 'hsl(0, 0%, 94%)',

  'background/ctrl/outline/rest': '',
  'background/ctrl/outline/hover': '',
  'background/ctrl/outline/pressed': '',
  'background/ctrl/outline/disabled': '',

  'background/ctrl/subtle/rest': '',
  'background/ctrl/subtle/hover': '',
  'background/ctrl/subtle/pressed': '',
  'background/ctrl/subtle/disabled': '',

  'background/ctrl/transparent/rest': '',
  'background/ctrl/transparent/hover': '',
  'background/ctrl/transparent/pressed': '',
  'background/ctrl/transparent/disabled': '',

  // Border
  'borderColor/ctrl/neutral/rest': '#D1D1D1',
  'borderColor/ctrl/neutral/hover': '#C7C7C7',
  'borderColor/ctrl/neutral/pressed': '#B3B3B3',
  'borderColor/ctrl/neutral/disabled': '#E0E0E0',

  'borderColor/ctrl/brand/rest': 'transparent', // Acturally should be the same as background, if not sizes would be different
  'borderColor/ctrl/brand/hover': 'transparent',
  'borderColor/ctrl/brand/pressed': 'transparent',
  'borderColor/ctrl/brand/disabled': 'transparent',

  'borderColor/ctrl/outline/rest': '',
  'borderColor/ctrl/outline/hover': '',
  'borderColor/ctrl/outline/pressed': '',
  'borderColor/ctrl/outline/disabled': '',

  'borderColor/ctrl/subtle/rest': '',
  'borderColor/ctrl/subtle/hover': '',
  'borderColor/ctrl/subtle/pressed': '',
  'borderColor/ctrl/subtle/disabled': '',

  'borderColor/ctrl/transparent/rest': '',
  'borderColor/ctrl/transparent/hover': '',
  'borderColor/ctrl/transparent/pressed': '',
  'borderColor/ctrl/transparent/disabled': '',
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
