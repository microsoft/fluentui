import { Theme, PartialTheme } from './types';
import { createTheme as createThemeLegacy } from '@uifabric/styling';

/**
 * Create theme using partial theme based on default theme.
 */
export const createTheme = (partialTheme: PartialTheme): Theme => createThemeLegacy(partialTheme);
