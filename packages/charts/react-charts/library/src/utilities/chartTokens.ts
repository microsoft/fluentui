/**
 * Chart-specific token constants for runtime usage.
 * These are hardcoded values to avoid importing the entire tokens object from @fluentui/react-theme,
 * which would prevent tree-shaking and increase bundle size.
 *
 * Note: For styling (makeStyles), continue using `import { tokens } from '@fluentui/react-theme'`
 * as Griffel's build-time processing handles tree-shaking correctly.
 */

// Neutral colors
export const colorNeutralForeground1 = '#242424';
export const colorNeutralBackground1 = '#ffffff';
export const colorNeutralStroke1 = '#d1d1d1';
export const colorNeutralStroke2 = '#e0e0e0';
export const colorBackgroundOverlay = 'rgba(0, 0, 0, 0.4)';
export const colorStrokeFocus2 = '#005a9e';

// Typography
export const fontSizeHero700 = '28px';

// Palette colors for chart defaults
export const colorPaletteBlueForeground2 = '#0078d4';
export const colorPaletteBlueBackground2 = '#c7e0f4';
export const colorPaletteBlueBorderActive = '#0078d4';
export const colorPaletteCornflowerForeground2 = '#4f6bed';
export const colorPaletteDarkGreenForeground2 = '#0b6a0b';
export const colorPaletteNavyForeground2 = '#0027b4';
export const colorPaletteDarkOrangeForeground2 = '#bc4b09';
export const colorPaletteYellowBackground1 = '#fef7b2';
export const colorPaletteYellowForeground1 = '#817400';
