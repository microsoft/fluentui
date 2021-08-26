import { merge } from '@fluentui/utilities';
import { getSemanticColors } from './utilities/makeSemanticColors';
import type { IFontStyles, PartialTheme, Theme } from './types/index';

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

  return mergedTheme;
}
