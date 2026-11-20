import { makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

const booster = { backgroundColor: tokens.colorPaletteBerryBackground2, color: tokens.colorPaletteBerryForeground2 };

/**
 * Three layers apps stack to beat component styles: a repeated-class booster, a global custom style hook, and the
 * `className` the app passes. Griffel compiles `&&` to a single class (no boost, though apps write it) and `&&&` to a
 * doubled class. Every layer sets other values, so the winner of
 * each property shows which layer applied.
 */
export const useSpecificityBoosterStyles = makeStyles({
  booster2: { '&&': booster },
  booster3: { '&&&': booster },
  /** Merged by the custom style hook, before the app's `className`. */
  hook: {
    borderRadius: tokens.borderRadiusCircular,
    ':hover': { backgroundColor: tokens.colorPaletteBlueBackground2 },
  },
  className: {
    fontWeight: tokens.fontWeightSemibold,
    ':hover': { color: tokens.colorPaletteBlueForeground2 },
  },
});
