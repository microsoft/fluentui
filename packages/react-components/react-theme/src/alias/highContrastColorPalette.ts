import { hcHighlight, white, black } from '../global/colors';
import { statusSharedColorNames, personaSharedColorNames } from '../sharedColorNames';
import { ColorPaletteTokens, PersonaColorPaletteTokens, StatusColorPaletteTokens } from '../types';

const statusColorPaletteTokens = statusSharedColorNames.reduce((acc, sharedColor) => {
  const color = sharedColor.slice(0, 1).toUpperCase() + sharedColor.slice(1);
  const sharedColorTokens = {
    [`colorPalette${color}Background1`]: white,
    [`colorPalette${color}Background2`]: black,
    [`colorPalette${color}Background3`]: white,
    [`colorPalette${color}Foreground1`]: black,
    [`colorPalette${color}Foreground2`]: white,
    [`colorPalette${color}Foreground3`]: white,
    [`colorPalette${color}BorderActive`]: hcHighlight,
    [`colorPalette${color}Border1`]: white,
    [`colorPalette${color}Border2`]: white,
  };

  return { ...acc, ...sharedColorTokens };
}, {} as StatusColorPaletteTokens);

const personaColorPaletteTokens = personaSharedColorNames.reduce((acc, sharedColor) => {
  const color = sharedColor.slice(0, 1).toUpperCase() + sharedColor.slice(1);
  const sharedColorTokens = {
    [`colorPalette${color}Background2`]: black,
    [`colorPalette${color}Foreground2`]: white,
    [`colorPalette${color}BorderActive`]: hcHighlight,
  };

  return { ...acc, ...sharedColorTokens };
}, {} as PersonaColorPaletteTokens);

export const colorPaletteTokens: ColorPaletteTokens = { ...statusColorPaletteTokens, ...personaColorPaletteTokens };
