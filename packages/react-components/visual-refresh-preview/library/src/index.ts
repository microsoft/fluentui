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
} as const;

type VisualRefreshToken = keyof typeof VISUAL_REFRESH_TOKENS;
type VisualRefreshTheme = Record<VisualRefreshToken, any>;

const GLOBAL_TOKENS = {
  cornerRadiusMedium: 8,
};

export const TEAMS_VISUAL_REFRESH_TOKENS = {
  buttonBorderRadius: '100px',
} satisfies VisualRefreshTheme;
