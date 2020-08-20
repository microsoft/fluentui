import { PartialTheme, Theme } from './types';
import { merge } from '@uifabric/utilities';

/**
 * Merges multiple themes.
 */
export function mergeThemes<TResult = PartialTheme>(...themes: (undefined | PartialTheme | Theme)[]): TResult {
  const partialTheme = merge<PartialTheme | Theme>({}, ...themes);

  // Correctly merge stylesheets array
  partialTheme.stylesheets = [];
  themes.forEach(
    theme => theme && theme.stylesheets && partialTheme.stylesheets?.push(...(theme.stylesheets as string[])),
  );

  return partialTheme as TResult;
}
