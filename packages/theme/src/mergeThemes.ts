import { merge } from '@uifabric/utilities';
import { IFontStyles, PartialTheme, Theme } from './types/index';
import { makeSemanticColors } from './utilities/makeSemanticColors';

export function mergeThemes(theme: Theme, partialTheme: PartialTheme = {}): Theme {
  const mergedTheme = merge<Theme | PartialTheme>({}, theme, partialTheme) as Theme;

  mergedTheme.semanticColors = makeSemanticColors(
    mergedTheme.palette,
    mergedTheme.effects,
    partialTheme?.semanticColors,
    !!partialTheme?.isInverted,
    false,
  );

  if (partialTheme.defaultFontStyle) {
    for (const fontStyle of Object.keys(mergedTheme.fonts) as (keyof IFontStyles)[]) {
      mergedTheme.fonts[fontStyle] = merge(mergedTheme.fonts[fontStyle], partialTheme.defaultFontStyle);
    }
  }

  if (partialTheme.stylesheets) {
    mergedTheme.stylesheets = (theme.stylesheets || []).concat(partialTheme.stylesheets);
  }

  return mergedTheme;
}
