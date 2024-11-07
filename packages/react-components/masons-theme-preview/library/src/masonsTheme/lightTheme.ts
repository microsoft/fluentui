import { createLightTheme } from '../../../../../tokens/src/utils/createLightTheme';
import { brandWeb } from '../../../../../tokens/src/global/brandColors';
import { masonsBorderRadius } from './masonsThemeOverrides';
import { AcrylicTheme } from './acrylicTheme';

export const masonsLightTheme: AcrylicTheme = {
  ...createLightTheme(brandWeb),
  ...masonsBorderRadius,
  // additional values
  materialAcrylicBackground: '#FFFFFF80',
  materialAcrylicStroke: 'black', // todo update this one.
  materialAcrylicBlur: 'blur(10px)',
};
