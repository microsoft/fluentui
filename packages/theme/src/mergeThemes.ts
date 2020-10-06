import { merge } from '@uifabric/utilities';
import { IFontStyles, ISemanticColors, PartialTheme, Theme } from './types/index';
import { makeSemanticColors } from './utilities/makeSemanticColors';

export function mergeThemes(theme: Theme, partialTheme: PartialTheme = {}): Theme {
  const mergedTheme = merge<Theme | PartialTheme>({}, theme, partialTheme) as Theme;

  mergedTheme.semanticColors = getSemanticColors(mergedTheme, partialTheme);

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

function getSemanticColors(mergedTheme: Theme, newTheme: PartialTheme): ISemanticColors {
  const newSemanticColors = makeSemanticColors(
    newTheme.palette,
    newTheme.effects,
    newTheme?.semanticColors,
    !!mergedTheme?.isInverted,
  );

  // remove properties with undefined value
  (Object.keys(newSemanticColors) as (keyof ISemanticColors)[]).forEach(key => {
    if (newSemanticColors[key] === undefined) {
      delete newSemanticColors[key];
    }
  });

  return { ...mergedTheme.semanticColors, ...newSemanticColors };
}
