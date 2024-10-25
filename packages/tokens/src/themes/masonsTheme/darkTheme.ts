import { createDarkTheme } from '../../utils/createDarkTheme';
import { brandWeb } from '../../global/brandColors';
import type { Theme } from '../../types';
import { masonsBorderRadius } from './masonsThemeOverrides';

export const masonsDarkTheme: Theme = { ...createDarkTheme(brandWeb), ...masonsBorderRadius };
