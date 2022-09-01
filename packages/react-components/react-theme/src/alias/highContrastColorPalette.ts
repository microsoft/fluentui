import { hcHighlight, hcCanvas, hcCanvasText } from '../global/colors';
import { statusSharedColorNames, personaSharedColorNames } from '../sharedColorNames';
import { ColorPaletteTokens, PersonaColorPaletteTokens, StatusColorPaletteTokens } from '../types';

const statusColorPaletteTokens = statusSharedColorNames.reduce((acc, sharedColor) => {
  const color = sharedColor.slice(0, 1).toUpperCase() + sharedColor.slice(1);
  const sharedColorTokens = {
    [`colorPalette${color}Background1`]: hcCanvas,
    [`colorPalette${color}Background2`]: hcCanvas,
    [`colorPalette${color}Background3`]: hcCanvasText,
    [`colorPalette${color}Foreground1`]: hcCanvasText,
    [`colorPalette${color}Foreground2`]: hcCanvasText,
    [`colorPalette${color}Foreground3`]: hcCanvasText,
    [`colorPalette${color}BorderActive`]: hcHighlight,
    [`colorPalette${color}Border1`]: hcCanvasText,
    [`colorPalette${color}Border2`]: hcCanvasText,
  };

  return { ...acc, ...sharedColorTokens };
}, {} as StatusColorPaletteTokens);

const personaColorPaletteTokens = personaSharedColorNames.reduce((acc, sharedColor) => {
  const color = sharedColor.slice(0, 1).toUpperCase() + sharedColor.slice(1);
  const sharedColorTokens = {
    [`colorPalette${color}Background2`]: hcCanvas,
    [`colorPalette${color}Foreground2`]: hcCanvasText,
    [`colorPalette${color}BorderActive`]: hcHighlight,
  };

  return { ...acc, ...sharedColorTokens };
}, {} as PersonaColorPaletteTokens);

export const colorPaletteTokens: ColorPaletteTokens = { ...statusColorPaletteTokens, ...personaColorPaletteTokens };
