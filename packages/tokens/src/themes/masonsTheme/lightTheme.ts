import { createLightTheme } from '../../utils/createLightTheme';
import { brandWeb } from '../../global/brandColors';
import type { Theme } from '../../types';
import { masonsBorderRadius } from './masonsThemeOverrides';

export const masonsLightTheme: Theme = { ...createLightTheme(brandWeb), ...masonsBorderRadius };
