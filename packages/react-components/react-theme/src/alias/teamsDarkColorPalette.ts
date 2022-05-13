import { sharedColors } from '../global/colors';
import { ColorPaletteTokens, GlobalSharedColors } from '../types';

export const colorPaletteTokens: ColorPaletteTokens = (Object.keys(sharedColors) as Array<
  keyof GlobalSharedColors
>).reduce((acc, sharedColor) => {
  const color = sharedColor.slice(0, 1).toUpperCase() + sharedColor.slice(1);
  const sharedColorTokens = {
    [`colorPalette${color}Background1`]: sharedColors[sharedColor].shade40,
    [`colorPalette${color}Background2`]: sharedColors[sharedColor].shade30,
    [`colorPalette${color}Background3`]: sharedColors[sharedColor].primary,
    [`colorPalette${color}Foreground1`]: sharedColors[sharedColor].tint30,
    [`colorPalette${color}Foreground2`]: sharedColors[sharedColor].tint40,
    [`colorPalette${color}Foreground3`]: sharedColors[sharedColor].tint20,
    [`colorPalette${color}BorderActive`]: sharedColors[sharedColor].tint30,
    [`colorPalette${color}Border1`]: sharedColors[sharedColor].primary,
    [`colorPalette${color}Border2`]: sharedColors[sharedColor].tint20,
  };

  return { ...acc, ...sharedColorTokens };
}, {} as ColorPaletteTokens);
