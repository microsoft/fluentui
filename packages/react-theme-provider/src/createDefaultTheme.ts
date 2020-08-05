import { Theme } from './types';
import { getTheme } from '@uifabric/styling';

/**
 * Creates a blank initial theme.
 */
export const createDefaultTheme = (): Theme => getTheme();
