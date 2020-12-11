import { makeStyles, MakeStylesOptions } from '@fluentui/react-theme-provider';
import { css } from '@fluentui/utilities';
import { ToggleButtonState } from './ToggleButton.types';
import {
  useButtonStyles,
  useButtonContentStyles,
  useButtonIconStyles,
  ButtonClassNames,
} from '../Button/useButtonClasses';

export const ToggleButtonClassNames = ButtonClassNames;

const useToggleButtonBaseStyles = makeStyles([
  /* Checked state */
  [
    { checked: true },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-background': tokens.buttonCheckedBackground || tokens.semanticColors?.buttonBackgroundPressed,
      '--button-hovered-background':
        tokens.buttonHoveredCheckedBackground || tokens.semanticColors?.buttonBackgroundPressed,
      '--button-pressed-background': tokens.buttonPressedCheckedBackground,

      '--button-content-color': tokens.buttonCheckedContentColor || tokens.semanticColors?.buttonTextChecked,
      '--button-hovered-content-color':
        tokens.buttonHoveredCheckedContentColor || tokens.semanticColors?.buttonTextCheckedHovered,
      '--button-pressed-content-color': tokens.buttonPressedCheckedContentColor,
    }),
  ],
  /* Checked and primary states */
  [
    { checked: true, primary: true },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-background': tokens.buttonCheckedPrimaryBackground || tokens.color?.brand?.checked?.background,
      '--button-hovered-background':
        tokens.buttonHoveredCheckedPrimaryBackground || tokens.color?.brand?.checkedHovered?.background,
      '--button-pressed-background':
        tokens.buttonPressedCheckedPrimaryBackground || tokens.color?.brand?.checkedPressed?.background,

      '--button-content-color': tokens.buttonCheckedPrimaryContentColor || tokens.color?.brand?.checked?.contentColor,
      '--button-hovered-content-color':
        tokens.buttonHoveredCheckedPrimaryContentColor || tokens.color?.brand?.checkedHovered?.contentColor,
      '--button-pressed-content-color':
        tokens.buttonPressedCheckedPrimaryContentColor || tokens.color?.brand?.checkedPressed?.contentColor,
    }),
  ],
  /* Checked and ghost states */
  [
    { checked: true, ghost: true },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-background': tokens.buttonCheckedGhostBackground || tokens.palette?.neutralLight,
      '--button-hovered-background': tokens.buttonHoveredCheckedGhostBackground || tokens.palette?.neutralQuaternaryAlt,

      '--button-content-color': tokens.buttonCheckedGhostContentColor || tokens.palette?.neutralDark,
      '--button-hovered-content-color': tokens.buttonHoveredCheckedGhostContentColor || tokens.palette?.neutralDark,
    }),
  ],
  /* Checked and transparent states */
  [
    { checked: true, transparent: true },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-background': tokens.buttonCheckedTransparentBackground || 'transparent',
      '--button-hovered-background': tokens.buttonHoveredCheckedTransparentBackground || 'transparent',

      '--button-content-color': tokens.buttonCheckedTransparentContentColor || tokens.palette?.themePrimary,
      '--button-hovered-content-color': tokens.buttonHoveredCheckedTransparentContentColor || tokens.palette?.black,
    }),
  ],
]);
export const useToggleButtonStyles = (state: ToggleButtonState, styleOptions: MakeStylesOptions) => {
  return css(useButtonStyles(state, styleOptions), useToggleButtonBaseStyles(state, styleOptions));
};

export const useToggleButtonContentStyles = useButtonContentStyles;

const useToggleButtonIconBaseStyles = makeStyles([
  /* Checked state */
  [
    { checked: true },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-icon-color': tokens.buttonCheckedIconColor,
      '--button-hovered-icon-color': tokens.buttonHoveredCheckedIconColor,
      '--button-pressed-icon-color': tokens.buttonPressedCheckedIconColor,
    }),
  ],
  /* Checked and ghost states */
  [
    { checked: true, ghost: true },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-icon-color': tokens.buttonCheckedGhostIconColor || tokens.palette?.themeDark,
      '--button-hovered-icon-color': tokens.buttonHoveredCheckedGhostIconColor || tokens.palette?.themeDark,
    }),
  ],
  /* Checked and transparent states */
  [
    { checked: true, transparent: true },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-icon-color': tokens.buttonCheckedTransparentIconColor || tokens.palette?.themePrimary,
      '--button-hovered-icon-color': tokens.buttonHoveredCheckedTransparentIconColor || tokens.palette?.themeDarker,
    }),
  ],
]);
export const useToggleButtonIconStyles = (state: ToggleButtonState, styleOptions: MakeStylesOptions) => {
  return css(useButtonIconStyles(state, styleOptions), useToggleButtonIconBaseStyles(state, styleOptions));
};
