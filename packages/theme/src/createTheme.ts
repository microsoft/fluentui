import { DefaultPalette } from './colors/index';
import { DefaultEffects } from './effects/index';
import { DefaultFontStyles } from './fonts/index';
import { mergeThemes } from './mergeThemes';
import { DefaultSpacing } from './spacing/index';
import { makeSemanticColors } from './utilities/makeSemanticColors';
import type { PartialTheme, Theme } from './types/index';

/**
 * Creates a custom theme definition.
 * @param theme - Partial theme object.
 * @param depComments - Whether to include deprecated tags as comments for deprecated slots.
 */
export function createTheme(theme: PartialTheme = {}, depComments: boolean = false): Theme {
  const isInverted = !!theme.isInverted;
  const baseTheme: Theme = {
    palette: DefaultPalette,
    effects: DefaultEffects,
    fonts: DefaultFontStyles,
    spacing: DefaultSpacing,
    isInverted,
    disableGlobalClassNames: false,
    semanticColors: makeSemanticColors(DefaultPalette, DefaultEffects, undefined, isInverted, depComments),
    rtl: undefined,
  };

  return mergeThemes(baseTheme, theme);
}
