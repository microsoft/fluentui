import { merge } from '@uifabric/utilities';
import { IFontStyles, PartialTheme, Theme } from './types/index';
import { mapSemanticColors } from './utilities/makeSemanticColors';

/**
 * Merge a partial/full theme into a full theme and returns a merged full theme.
 */
export function mergeThemes(theme: Theme, partialTheme: PartialTheme = {}): Theme {
  const mergedTheme = merge<Theme | PartialTheme>({}, theme, partialTheme, {
    semanticColors: mapSemanticColors(
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
      mergedTheme.fonts[fontStyle] = merge(mergedTheme.fonts[fontStyle], partialTheme.defaultFontStyle);
    }
  }

  if (partialTheme.fonts) {
    for (const fontStyle of Object.keys(theme.fonts) as (keyof IFontStyles)[]) {
      mergedTheme.fonts[fontStyle] = merge(mergedTheme.fonts[fontStyle], partialTheme.fonts[fontStyle]);
    }
  }

  if (partialTheme.stylesheets) {
    mergedTheme.stylesheets = (theme.stylesheets || []).concat(partialTheme.stylesheets);
  }

  return mergedTheme;
}
