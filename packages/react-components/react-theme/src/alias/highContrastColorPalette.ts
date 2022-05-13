import { hcHighlight, white, black, sharedColors } from '../global/colors';
import { ColorPaletteTokens, GlobalSharedColors } from '../types';

export const colorPaletteTokens: ColorPaletteTokens = (Object.keys(sharedColors) as Array<
  keyof GlobalSharedColors
>).reduce((acc, sharedColor) => {
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
}, {} as ColorPaletteTokens);
