import { makeStyles, MakeStylesOptions } from '@fluentui/react-theme-provider';
import { css } from '@fluentui/utilities';
import {
  useButtonStyles,
  useButtonContentStyles,
  useButtonIconStyles,
  ButtonClassNames,
} from '../Button/useButtonClasses';
import { MenuButtonState } from './MenuButton.types';

export const MenuButtonClassNames = {
  root: css(ButtonClassNames.root, 'ms-Button-root'),
  content: ButtonClassNames.content,
  icon: ButtonClassNames.icon,
  menuIcon: 'ms-Button-menuIcon',
  _disabled: 'ms-Button--disabled',
  _iconOnly: 'ms-Button--iconOnly',
  _ghost: 'ms-Button--ghost',
  _expanded: 'ms-Button--expanded',
};

const useMenuButtonBaseStyles = makeStyles([
  /* --- CSS definition --- */
  [
    null,
    {
      // menu icon
      [`& > .${MenuButtonClassNames.menuIcon} + *`]: {
        color: 'var(--button-menu-icon-color)',
        marginLeft: 0,
      },

      [`&:hover > .${MenuButtonClassNames.menuIcon}`]: {
        color: 'var(--button-hovered-menuIconColor, var(--button-menuIconColor))',
      },

      [`&:active > .${MenuButtonClassNames.menuIcon}`]: {
        color: 'var(--button-pressed-menuIconColor, var(--button-hovered-menuIconColor, var(--button-menuIconColor)))',
      },

      '& .ms-layer': {
        position: 'absolute',
      },
    },
  ],
  /* --- Default state --- */
  [
    null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      // menu icon styling
      '--button-menu-icon-color': tokens.buttonMenuIconColor || tokens.color?.body?.menuIconColor,
      '--button-hovered-menu-icon-color': tokens.buttonHoveredMenuIconColor,
      '--button-pressed-menu-icon-color': tokens.buttonPressedMenuIconColor,

      '--button-menu-icon-size': tokens.buttonMenuIconSize || '12px',
    }),
  ],
  /* --- Icon-only state --- */
  [
    (selectors: MenuButtonState) => selectors.iconOnly,
    {
      // menu icon
      [`& > .${MenuButtonClassNames.icon} + *`]: {
        marginLeft: 0,
      },
    },
  ],
  /* --- Ghost state --- */
  [
    (selectors: MenuButtonState) => selectors.ghost,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      // menu icon styling
      '--button-menu-icon-color': tokens.buttonGhostMenuIconColor || tokens.palette?.neutralSecondary,
      '--button-hovered-menu-icon-color': tokens.buttonGhostHoveredMenuIconColor || tokens.palette?.themePrimary,
      '--button-pressed-menu-icon-color': tokens.buttonGhostPressedMenuIconColor || tokens.palette?.black,
    }),
  ],
  /* --- Transparent state --- */
  [
    (selectors: MenuButtonState) => selectors.transparent,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      // menu icon styling
      '--button-menu-icon-color': tokens.buttonTransparentMenuIconColor || tokens.palette?.neutralSecondary,
    }),
  ],
  /* --- Disabled state --- */
  [
    (selectors: MenuButtonState) => selectors.disabled || selectors['aria-disabled'],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      // menu icon styling
      '--button-menu-icon-color': tokens.buttonDisabledMenuIconColor || 'inherit',
    }),
  ],
]);
export const useMenuButtonStyles = <Selectors, Tokens>(
  selectors: Selectors,
  options: MakeStylesOptions<Tokens>,
  ...classNames: (string | undefined)[]
) => {
  return css(
    useButtonStyles(selectors, options, ...classNames),
    useMenuButtonBaseStyles(selectors, options, ...classNames),
  );
};

export const useMenuButtonContentStyles = useButtonContentStyles;
export const useMenuButtonIconStyles = useButtonIconStyles;

export const useMenuButtonMenuIconStyles = makeStyles([
  /* --- CSS definition --- */
  [null, { fontSize: 'var(--button-menu-icon-size)' }],
]);
