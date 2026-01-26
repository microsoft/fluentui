import { makeStyles, mergeClasses } from '@griffel/react';
import { ButtonState } from '@fluentui/react-components';
import { CAPTokens } from '../CAPTheme';

const useCAPButtonStyles = makeStyles({
  root: {
    borderRadius: '12px',
  },
  primary: {
    backgroundColor: CAPTokens.buttonPrimaryBackgroundColor,

    ':hover': {
      backgroundColor: CAPTokens.buttonPrimaryBackgroundColorHover,
    },
  },
  secondary: {
    backgroundColor: CAPTokens.buttonSecondaryBackgroundColor,

    ':hover': {
      backgroundColor: CAPTokens.buttonSecondaryBackgroundColorHover,
    },
  },
  outline: {
    backgroundColor: CAPTokens.buttonOutlineBackgroundColor,

    ':hover': {
      backgroundColor: CAPTokens.buttonOutlineBackgroundColorHover,
    },
  },
  subtle: {},
  tint: {
    backgroundColor: CAPTokens.buttonTintBackgroundColor,

    ':hover': {
      backgroundColor: CAPTokens.buttonTintBackgroundColorHover,
    },
  },
  transparent: {},
});

export function useCAPButtonStylesHook(state: ButtonState) {
  const styles = useCAPButtonStyles();
  state.root.className = mergeClasses(state.root.className, styles.root, state.appearance && styles[state.appearance]);
  return state;
}
