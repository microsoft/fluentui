import { makeStyles, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

/** App-level Griffel styles applied on top of the components under test. */
export const useParityAppStyles = makeStyles({
  base: {
    backgroundColor: tokens.colorPaletteBerryBackground2,
    color: tokens.colorPaletteBerryForeground2,
    ...shorthands.borderColor(tokens.colorPaletteBerryBorderActive),
  },
  stateful: {
    backgroundColor: tokens.colorPaletteBerryBackground2,
    ':hover': { backgroundColor: tokens.colorPaletteBlueBackground2, color: tokens.colorPaletteBlueForeground2 },
    ':hover:active': { backgroundColor: tokens.colorPaletteGreenBackground2 },
    ':focus-within': { ...shorthands.borderColor(tokens.colorPaletteBerryBorderActive) },
  },
  slot: { color: tokens.colorPaletteBerryForeground2, fontSize: tokens.fontSizeBase600 },
  layout: {
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalXXL}`,
    minWidth: 'auto',
    borderRadius: tokens.borderRadiusCircular,
    fontWeight: tokens.fontWeightRegular,
  },
  hook: { backgroundColor: tokens.colorPaletteRedBackground2, color: tokens.colorPaletteRedForeground2 },
  hookSlot: { color: tokens.colorPaletteRedForeground2 },
  caller: { backgroundColor: tokens.colorPaletteGreenBackground2 },
  wrapper: { backgroundColor: tokens.colorPaletteBerryBackground2, fontWeight: tokens.fontWeightRegular },
});
