import {
  statusSharedColors,
  personaSharedColors,
  hcHighlight,
  white,
  black,
  StatusSharedColors,
  PersonaSharedColors,
} from '../global/colors';
import { ColorPaletteTokens, GlobalSharedColors, PersonaColorPaletteTokens, StatusColorPaletteTokens } from '../types';

const statusColorPaletteTokens = (Object.keys(statusSharedColors) as Array<
  keyof Pick<GlobalSharedColors, StatusSharedColors>
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
}, {} as StatusColorPaletteTokens);

const personaColorPaletteTokens = (Object.keys(personaSharedColors) as Array<
  keyof Pick<GlobalSharedColors, PersonaSharedColors>
>).reduce((acc, sharedColor) => {
  const color = sharedColor.slice(0, 1).toUpperCase() + sharedColor.slice(1);
  const sharedColorTokens = {
    [`colorPalette${color}Background2`]: black,
    [`colorPalette${color}Foreground2`]: white,
    [`colorPalette${color}BorderActive`]: hcHighlight,
  };

  return { ...acc, ...sharedColorTokens };
}, {} as PersonaColorPaletteTokens);

export const colorPaletteTokens: ColorPaletteTokens = { ...statusColorPaletteTokens, ...personaColorPaletteTokens };
