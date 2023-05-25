/* color palette used in both darkTheme and teamsDarkTheme */

import { statusSharedColors, personaSharedColors } from '../global/colorPalette';
import { statusSharedColorNames, personaSharedColorNames } from '../sharedColorNames';
import { ColorPaletteTokens, PersonaColorPaletteTokens, StatusColorPaletteTokens } from '../types';

const statusColorPaletteTokens = statusSharedColorNames.reduce((acc, sharedColor) => {
  const color = sharedColor.slice(0, 1).toUpperCase() + sharedColor.slice(1);
  const sharedColorTokens = {
    [`colorPalette${color}Background1`]: statusSharedColors[sharedColor].shade40,
    [`colorPalette${color}Background2`]: statusSharedColors[sharedColor].shade30,
    [`colorPalette${color}Background3`]: statusSharedColors[sharedColor].primary,
    [`colorPalette${color}Foreground1`]: statusSharedColors[sharedColor].tint30,
    [`colorPalette${color}Foreground2`]: statusSharedColors[sharedColor].tint40,
    [`colorPalette${color}Foreground3`]: statusSharedColors[sharedColor].tint20,
    [`colorPalette${color}BorderActive`]: statusSharedColors[sharedColor].tint30,
    [`colorPalette${color}Border1`]: statusSharedColors[sharedColor].primary,
    [`colorPalette${color}Border2`]: statusSharedColors[sharedColor].tint20,
  };

  return Object.assign(acc, sharedColorTokens);
}, {} as StatusColorPaletteTokens);

// one-off patches
statusColorPaletteTokens.colorPaletteRedForeground3 = statusSharedColors.red.tint30;
statusColorPaletteTokens.colorPaletteRedBorder2 = statusSharedColors.red.tint30;
statusColorPaletteTokens.colorPaletteGreenForeground3 = statusSharedColors.green.tint40;
statusColorPaletteTokens.colorPaletteGreenBorder2 = statusSharedColors.green.tint40;
statusColorPaletteTokens.colorPaletteDarkOrangeForeground3 = statusSharedColors.darkOrange.tint30;
statusColorPaletteTokens.colorPaletteDarkOrangeBorder2 = statusSharedColors.darkOrange.tint30;

statusColorPaletteTokens.colorPaletteRedForegroundInverted = statusSharedColors.red.primary;
statusColorPaletteTokens.colorPaletteGreenForegroundInverted = statusSharedColors.green.primary;
statusColorPaletteTokens.colorPaletteYellowForegroundInverted = statusSharedColors.yellow.shade30;

const personaColorPaletteTokens = personaSharedColorNames.reduce((acc, sharedColor) => {
  const color = sharedColor.slice(0, 1).toUpperCase() + sharedColor.slice(1);
  const sharedColorTokens = {
    [`colorPalette${color}Background2`]: personaSharedColors[sharedColor].shade30,
    [`colorPalette${color}Foreground2`]: personaSharedColors[sharedColor].tint40,
    [`colorPalette${color}BorderActive`]: personaSharedColors[sharedColor].tint30,
  };

  return Object.assign(acc, sharedColorTokens);
}, {} as PersonaColorPaletteTokens);

// one-off patches
personaColorPaletteTokens.colorPaletteDarkRedBackground2 = personaSharedColors.darkRed.shade20;
personaColorPaletteTokens.colorPalettePlumBackground2 = personaSharedColors.plum.shade20;

export const colorPaletteTokens: ColorPaletteTokens = { ...statusColorPaletteTokens, ...personaColorPaletteTokens };
