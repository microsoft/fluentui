import { merge } from '@uifabric/utilities';
import { PartialTheme, Theme } from './types';

/**
 * Merges multiple themes.
 */
export function mergeThemes<TResult = PartialTheme>(...themes: (undefined | PartialTheme | Theme)[]): TResult {
  const partialTheme = merge<PartialTheme | Theme>({}, ...themes);

  // Correctly merge stylesheets array
  partialTheme.stylesheets = [];
  themes.forEach(theme => theme && theme.stylesheets && partialTheme.stylesheets?.push(...theme.stylesheets));

  return partialTheme as TResult;
}
