import { Theme } from './types';
import { createTheme } from '@uifabric/styling';

/**
 * Creates a blank initial theme.
 */
export const createDefaultTheme = (): Theme => createTheme({});
