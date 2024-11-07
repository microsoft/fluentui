import { createDarkTheme } from '../../../../../tokens/src/utils/createDarkTheme';
import { brandWeb } from '../../../../../tokens/src/global/brandColors';
import { masonsBorderRadius } from './masonsThemeOverrides';
import { AcrylicTheme } from './acrylicTheme';

export const masonsDarkTheme: AcrylicTheme = {
  ...createDarkTheme(brandWeb),
  ...masonsBorderRadius,

  // additional values
  materialAcrylicBackground: '#2E2E2ECC',
  materialAcrylicStroke: 'black', // todo update this one.
  materialAcrylicBlur: 'blur(10px)',
};
