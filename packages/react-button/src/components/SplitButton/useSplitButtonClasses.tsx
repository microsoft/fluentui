import { makeStyles } from '@fluentui/react-theme-provider';
import { css } from '@fluentui/utilities';
import { ButtonClassNames } from '../Button/useButtonClasses';
import { MenuButtonClassNames } from '../MenuButton/useMenuButtonClasses';

export const SplitButtonClassNames = {
  root: css(ButtonClassNames.root, 'ms-SplitButton'),
  button: css(ButtonClassNames.root, 'ms-SplitButton-button'),
  menuButton: css(MenuButtonClassNames.root, 'ms-SplitButton-menuButton'),
  divider: 'ms-SplitButton-divider',
};

const menuButtonWidth = '32px';

export const useSplitButtonStyles = makeStyles([
  /* --- CSS definition --- */
  [
    null,
    {
      display: 'inline-flex',
      justifyContent: 'stretch',
      position: 'relative',
    },
  ],
  /* --- Block state --- */
  [
    { block: true },
    {
      maxWidth: '100%',
      width: '100%',
    },
  ],
]);

export const useSplitButtonButtonStyles = makeStyles([
  /* --- CSS definition --- */
  [
    null,
    {
      '--button-border-right-width': 0,
      '--button-border-bottom-right-radius': 0,
      '--button-border-top-right-radius': 0,
    },
  ],
  /* --- Block state --- */
  [
    { block: true },
    {
      flexGrow: 1,
      '--button-max-width': '100%',
    },
  ],
]);

export const useSplitButtonMenuButtonStyles = makeStyles([
  /* --- CSS definition --- */
  [
    null,
    {
      '--button-border-left-width': 0,
      '--button-border-bottom-left-radius': 0,
      '--button-border-top-left-radius': 0,
      '--button-min-width': menuButtonWidth,
      '--button-width': menuButtonWidth,

      [`& > .${MenuButtonClassNames.icon}`]: {
        '--button-icon-color': 'var(--button-menu-icon-color)',
        '--button-icon-size': 'var(--button-split-menu-icon-size)',
      },
    },
  ],
  /* --- Default state --- */
  [
    null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-menu-icon-color': tokens.buttonMenuIconColor || tokens.color?.body?.menuIconColor,
      '--button-menu-icon-size': tokens.buttonMenuIconSize || '12px',

      // Forward the menuIconSize to a variable which can be consumed by the child menu button.
      '--button-split-menu-icon-size': tokens.buttonSplitMenuIconSize || 'var(--button-menu-icon-size)',
    }),
  ],
  /* --- Transparent state --- */
  [
    { transparent: true },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-menu-icon-color': tokens.buttonTransparentMenuIconColor || tokens.palette?.neutralSecondary,
    }),
  ],
  /* --- Disabled state --- */
  [
    { disabled: true },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-menu-icon-color': tokens.buttonDisabledMenuIconColor || 'inherit',
    }),
  ],
]);

export const useSplitButtonDividerStyles = makeStyles([
  /* --- CSS definition --- */
  [
    null,
    {
      position: 'absolute',
      right: menuButtonWidth,

      background: 'var(--button-divider-color)',
      bottom: 'calc(100% - var(--button-divider-length, 100% + 8px))',
      top: 'calc(100% - var(--button-divider-length, 100% + 8px))',
      width: 'var(--button-divider-thickness)',
    },
  ],
  /* --- Default state --- */
  [
    null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-divider-color': tokens.buttonDividerColor || tokens.palette?.neutralTertiaryAlt,
      '--button-divider-thickness': tokens.buttonDividerThickness || '1px',
    }),
  ],
  /* --- Primary state --- */
  [
    { primary: true },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-divider-color': tokens.buttonPrimaryDividerColor || tokens.palette?.white,
    }),
  ],
  /* --- Disabled state --- */
  [
    { disabled: true },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-divider-color': tokens.buttonDisabledDividerColor || tokens.semanticColors?.disabledText,
    }),
  ],
]);
