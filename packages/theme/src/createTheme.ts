import { DefaultPalette } from './colors/index';
import { DefaultEffects } from './effects/index';
import { DefaultFontStyles } from './fonts/index';
import { mergeThemes } from './mergeThemes';
import { DefaultSpacing } from './spacing/index';
import { PartialTheme, Theme } from './types/index';
import { makeSemanticColors } from './utilities/makeSemanticColors';

/**
 * Creates a custom theme definition.
 * @param theme - Partial theme object.
 * @param depComments - Whether to include deprecated tags as comments for deprecated slots.
 */
export function createTheme(theme: PartialTheme = {}, depComments: boolean = false): Theme {
  const baseTheme: Theme = {
    palette: DefaultPalette,
    effects: DefaultEffects,
    fonts: DefaultFontStyles,
    spacing: DefaultSpacing,
    isInverted: false,
    disableGlobalClassNames: false,
    semanticColors: makeSemanticColors(DefaultPalette, DefaultEffects, undefined, false, depComments),
    rtl: undefined,
  };

  return mergeThemes(baseTheme, theme);
}
