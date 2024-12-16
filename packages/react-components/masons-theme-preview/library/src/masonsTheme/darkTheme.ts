import { createDarkTheme } from '../../../../../tokens/src/utils/createDarkTheme';
import { brandWeb } from '../../../../../tokens/src/global/brandColors';
import { masonsBorderRadius } from './masonsThemeOverrides';
import { AcrylicTheme } from './acrylicTheme';

export const masonsDarkTheme: AcrylicTheme = {
  ...createDarkTheme(brandWeb),
  ...masonsBorderRadius,

  blurAcrylicBackground: 'blur(60px)',
  colorAcrylicBackground: '#2E2D34E6',
};
