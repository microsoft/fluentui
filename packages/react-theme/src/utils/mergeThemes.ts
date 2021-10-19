import type { PartialTheme, Theme } from '../types';

export function mergeThemes(a: Theme | undefined, b: PartialTheme | Theme | undefined): Theme {
  // Merge impacts perf: we should like to avoid it if it's possible
  if (a && b) {
    return { ...a, ...b };
  }

  if (a) {
    return a;
  }

  return b as Theme;
}
