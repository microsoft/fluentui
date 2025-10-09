import * as React from 'react';

export const VisualRefreshContext = React.createContext(false);

export function useIsVisualRefreshEnabled() {
  return React.useContext(VisualRefreshContext);
}

function createToken(name: string) {
  return `var(--visual-refresh-${name})`;
}

export const VISUAL_REFRESH_TOKENS = {
  buttonBorderRadius: createToken('buttonBorderRadius'),
  buttonRootFontWeight: createToken('buttonRootFontWeight'),
  buttonRootPadding: createToken('buttonRootPadding'),
  buttonRootBorderWidth: createToken('buttonRootBorderWidth'),
  buttonRoundedFontFamily: createToken('buttonRoundedFontFamily'),
  buttonSquareFontWeight: createToken('buttonSquareFontWeight'),
  buttonPrimaryBackgroundColor: createToken('buttonPrimaryBackgroundColor'),
} as const;

type VisualRefreshToken = keyof typeof VISUAL_REFRESH_TOKENS;
type VisualRefreshTheme = Record<VisualRefreshToken, any>;

export const GLOBAL_TOKENS = {};

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
} satisfies VisualRefreshTheme;
