import { merge } from '@uifabric/utilities';
import { IFontStyles, PartialTheme, Theme } from './types/index';
import { getSemanticColors } from './utilities/makeSemanticColors';

/**
 * Merge a partial/full theme into a full theme and returns a merged full theme.
 */
export function mergeThemes(theme: Theme, partialTheme: PartialTheme = {}): Theme {
  const mergedTheme = merge<Theme | PartialTheme>({}, theme, partialTheme, {
    semanticColors: getSemanticColors(
      partialTheme.palette,
      partialTheme.effects,
      partialTheme.semanticColors,
      partialTheme.isInverted === undefined ? theme.isInverted : partialTheme.isInverted,
    ),
  }) as Theme;

  if (partialTheme.palette?.themePrimary && !partialTheme.palette?.accent) {
    mergedTheme.palette.accent = partialTheme.palette.themePrimary;
  }

  if (partialTheme.defaultFontStyle) {
    for (const fontStyle of Object.keys(mergedTheme.fonts) as (keyof IFontStyles)[]) {
      mergedTheme.fonts[fontStyle] = merge(
        mergedTheme.fonts[fontStyle],
        partialTheme.defaultFontStyle,
        partialTheme?.fonts?.[fontStyle],
      );
    }
  }

  if (partialTheme.stylesheets) {
    mergedTheme.stylesheets = (theme.stylesheets || []).concat(partialTheme.stylesheets);
  }

  return mergedTheme;
}
