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
    (selectors: ToggleButtonState) => selectors.checked,
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
    (selectors: ToggleButtonState) => selectors.checked && selectors.primary,
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
    (selectors: ToggleButtonState) => selectors.checked && selectors.ghost,
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
    (selectors: ToggleButtonState) => selectors.checked && selectors.transparent,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-background': tokens.buttonCheckedTransparentBackground || 'transparent',
      '--button-hovered-background': tokens.buttonHoveredCheckedTransparentBackground || 'transparent',

      '--button-content-color': tokens.buttonCheckedTransparentContentColor || tokens.palette?.themePrimary,
      '--button-hovered-content-color': tokens.buttonHoveredCheckedTransparentContentColor || tokens.palette?.black,
    }),
  ],
]);
export const useToggleButtonStyles = <Selectors, Tokens>(
  selectors: Selectors,
  options: MakeStylesOptions<Tokens>,
  ...classNames: (string | undefined)[]
) => {
  return css(
    useButtonStyles(selectors, options, ...classNames),
    useToggleButtonBaseStyles(selectors, options, ...classNames),
  );
};

export const useToggleButtonContentStyles = useButtonContentStyles;

const useToggleButtonIconBaseStyles = makeStyles([
  /* Checked state */
  [
    (selectors: ToggleButtonState) => selectors.checked,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-icon-color': tokens.buttonCheckedIconColor,
      '--button-hovered-icon-color': tokens.buttonHoveredCheckedIconColor,
      '--button-pressed-icon-color': tokens.buttonPressedCheckedIconColor,
    }),
  ],
  /* Checked and ghost states */
  [
    (selectors: ToggleButtonState) => selectors.checked && selectors.ghost,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-icon-color': tokens.buttonCheckedGhostIconColor || tokens.palette?.themeDark,
      '--button-hovered-icon-color': tokens.buttonHoveredCheckedGhostIconColor || tokens.palette?.themeDark,
    }),
  ],
  /* Checked and transparent states */
  [
    (selectors: ToggleButtonState) => selectors.checked && selectors.transparent,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-icon-color': tokens.buttonCheckedTransparentIconColor || tokens.palette?.themePrimary,
      '--button-hovered-icon-color': tokens.buttonHoveredCheckedTransparentIconColor || tokens.palette?.themeDarker,
    }),
  ],
]);
export const useToggleButtonIconStyles = <Selectors, Tokens>(
  selectors: Selectors,
  options: MakeStylesOptions<Tokens>,
  ...classNames: (string | undefined)[]
) => {
  return css(
    useButtonIconStyles(selectors, options, ...classNames),
    useToggleButtonIconBaseStyles(selectors, options, ...classNames),
  );
};
