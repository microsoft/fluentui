import { colors } from '../teams/siteVariables';
import { accessibleCyan } from './colors';

export * from './colors';

//
// BORDER STYLES
//
export const focusInnerBorderColor = colors.black;
export const focusOuterBorderColor = accessibleCyan;

//
// SHADOW LEVELS
//
export const shadow2 = '0 0 2px rgba(0, 0, 0, .24), 0 1px 2px rgba(0, 0, 0, .28)';
export const shadow4 = '0 0 2px rgba(0, 0, 0, .24), 0 2px 4px rgba(0, 0, 0, .28)';
export const shadow8 = '0 0 2px rgba(0, 0, 0, .24), 0 4px 8px rgba(0, 0, 0, .28)';
export const shadow16 = '0 0 2px rgba(0, 0, 0, .24), 0 8px 16px rgba(0, 0, 0, .28)';
export const shadow28 = '0 0 8px rgba(0, 0, 0, .40), 0 14px 28px rgba(0, 0, 0, .48)';
export const shadow64 = '0 0 8px rgba(0, 0, 0, .40), 0 32px 64px rgba(0, 0, 0, .48)';

//
// SEMANTIC ASSIGNMENTS
//
export const bodyBackground = colors.black;
export const bodyColor = colors.white;
