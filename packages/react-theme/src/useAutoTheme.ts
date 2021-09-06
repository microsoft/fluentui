import { useMediaQueryMatch } from './useMediaQueryMatch';
import { Theme } from './types';

export type PreferredMode = 'contrast' | 'dark' | 'light';

function usePreferredMode(): PreferredMode {
  const isHighContrast = useMediaQueryMatch('(forced-colors: active)');
  const isDark = useMediaQueryMatch('(prefers-color-scheme: dark)');

  const matches: { mode: PreferredMode; value: boolean }[] = [
    { mode: 'contrast', value: isHighContrast },
    { mode: 'dark', value: isDark },
    { mode: 'light', value: true },
  ];

  return matches.find(entry => entry.value)!.mode;
}

export function useAutoTheme(themes: Record<PreferredMode, Theme>): Theme {
  const mode = usePreferredMode();

  return themes[mode];
}
