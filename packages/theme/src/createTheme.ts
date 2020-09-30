import { merge } from '@uifabric/utilities';
import { DefaultPalette } from './colors/index';
import { DefaultEffects } from './effects/index';
import { DefaultFontStyles } from './fonts/index';
import { DefaultSpacing } from './spacing/index';
import { IFontStyles, IPartialTheme, ITheme } from './types/index';
import { makeSemanticColors } from './utilities/makeSemanticColors';

/**
 * Creates a custom theme definition which can be used with the Customizer.
 * @param theme - Partial theme object.
 * @param depComments - Whether to include deprecated tags as comments for deprecated slots.
 */
export function createTheme(theme: IPartialTheme, depComments: boolean = false): ITheme {
  const newPalette = { ...DefaultPalette, ...theme.palette };
  const newEffects = { ...DefaultEffects, ...theme.effects };

  if (!theme.palette || !theme.palette.accent) {
    newPalette.accent = newPalette.themePrimary;
  }

  // mix in custom overrides with good slots first, since custom overrides might be used in fixing deprecated slots
  const newSemanticColors = {
    ...makeSemanticColors(newPalette, newEffects, theme.semanticColors, !!theme.isInverted, depComments),
    ...theme.semanticColors,
  };

  const defaultFontStyles: IFontStyles = { ...DefaultFontStyles };

  if (theme.defaultFontStyle) {
    for (const fontStyle of Object.keys(defaultFontStyles) as (keyof IFontStyles)[]) {
      defaultFontStyles[fontStyle] = merge({}, defaultFontStyles[fontStyle], theme.defaultFontStyle);
    }
  }

  if (theme.fonts) {
    for (const fontStyle of Object.keys(theme.fonts) as (keyof IFontStyles)[]) {
      defaultFontStyles[fontStyle] = merge({}, defaultFontStyles[fontStyle], theme.fonts[fontStyle]);
    }
  }

  return {
    palette: newPalette,
    fonts: {
      ...defaultFontStyles,
    },
    rtl: theme.rtl,
    semanticColors: newSemanticColors,
    isInverted: !!theme.isInverted,
    disableGlobalClassNames: !!theme.disableGlobalClassNames,
    spacing: {
      ...DefaultSpacing,
      ...theme.spacing,
    },
    effects: newEffects,
  };
}
