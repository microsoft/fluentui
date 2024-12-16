import { createLightTheme } from '../../../../../tokens/src/utils/createLightTheme';
import { brandWeb } from '../../../../../tokens/src/global/brandColors';
import { masonsBorderRadius } from './masonsThemeOverrides';
import { AcrylicTheme } from './acrylicTheme';

export const masonsLightTheme: AcrylicTheme = {
  ...createLightTheme(brandWeb),
  ...masonsBorderRadius,
  blurAcrylicBackground: 'blur(60px)',
  colorAcrylicBackground: '#F5F7AD9',
};
