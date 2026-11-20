import { makeStyles, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

const appColor = tokens.colorPaletteBerryBorderActive;

/**
 * One app override per CSS shorthand family. Griffel's `mergeClasses()` removes component longhand classes that a
 * later shorthand class overrides; static CSS can't, so every family is checked against component longhands.
 */
export const useShorthandStyles = makeStyles({
  padding: { padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalXXL}` },
  paddingInline: { paddingInline: tokens.spacingHorizontalXXL },
  paddingBlock: { paddingBlock: tokens.spacingVerticalXS },
  paddingLeft: { paddingLeft: tokens.spacingHorizontalXXL },
  margin: { margin: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalL}` },
  marginInline: { marginInline: tokens.spacingHorizontalL },
  border: { border: `${tokens.strokeWidthThick} dashed ${appColor}` },
  // `shorthands.*()` expands to longhands; Griffel's types forbid these shorthands as raw properties.
  borderColor: shorthands.borderColor(appColor),
  borderWidth: shorthands.borderWidth(tokens.strokeWidthThick),
  borderLeft: { borderLeft: `${tokens.strokeWidthThick} dashed ${appColor}` },
  borderRadius: { borderRadius: tokens.borderRadiusCircular },
  outline: { outline: `${tokens.strokeWidthThick} solid ${appColor}` },
  gap: { gap: tokens.spacingHorizontalXXL },
  flex: { flex: '1 1 auto' },
  overflow: { overflow: 'visible' },
  textDecoration: { textDecoration: `underline dotted ${appColor}` },
});
