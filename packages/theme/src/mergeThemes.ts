import { merge } from '@uifabric/utilities';
import { IFontStyles, PartialTheme, Theme } from './types/index';
import { mapSemanticColors } from './utilities/makeSemanticColors';

export function mergeThemes(theme: Theme, partialTheme: PartialTheme = {}): Theme {
  const newTheme = { ...partialTheme };
  newTheme.semanticColors = mapSemanticColors(
    newTheme.palette,
    newTheme.effects,
    newTheme.semanticColors,
    newTheme.isInverted === undefined ? theme.isInverted : newTheme.isInverted,
  );

  const mergedTheme = merge<Theme | PartialTheme>({}, theme, newTheme) as Theme;

  if (newTheme.palette?.themePrimary && !newTheme.palette?.accent) {
    mergedTheme.palette.accent = newTheme.palette.themePrimary;
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
