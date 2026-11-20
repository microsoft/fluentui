import { makeStyles, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

const disabledLook = {
  backgroundColor: tokens.colorPaletteBerryBackground2,
  color: tokens.colorPaletteBerryForeground2,
  cursor: 'not-allowed',
};
const disabledHover = { backgroundColor: tokens.colorPaletteBlueBackground2 };

export const useStateStyles = makeStyles({
  /** An app restyling every interaction state, as design systems built on Fluent do. */
  everyState: {
    backgroundColor: tokens.colorPaletteBerryBackground2,
    color: tokens.colorPaletteBerryForeground2,
    ':hover': { backgroundColor: tokens.colorPaletteBlueBackground2, color: tokens.colorPaletteBlueForeground2 },
    ':hover:active': { backgroundColor: tokens.colorPaletteGreenBackground2 },
    ':active': { color: tokens.colorPaletteGreenForeground2 },
    ':focus-visible': { backgroundColor: tokens.colorPaletteRedBackground2 },
    ':focus-within': shorthands.borderColor(tokens.colorPaletteBerryBorderActive),
  },
  /** Disabled overrides through the selectors apps use; Fluent's own disabled styles are classes. */
  disabledPseudo: { ':disabled': disabledLook, ':disabled:hover': disabledHover },
  ariaDisabled: { '&[aria-disabled="true"]': disabledLook, '&[aria-disabled="true"]:hover': disabledHover },
  disabledAttribute: { '&[disabled]': disabledLook },
  /** A class the app only passes to disabled components. */
  disabledClass: { ...disabledLook, ':hover': disabledHover },
});
