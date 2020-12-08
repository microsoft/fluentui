import { makeStyles /*, makeVariantClasses, Theme*/ } from '@fluentui/react-theme-provider';
import { css } from '@fluentui/utilities';
import {
  /*useButtonClasses*/ useButtonStyles,
  useButtonContentStyles,
  useButtonIconStyles,
  ButtonClassNames,
} from '../Button/useButtonClasses';
import { MenuButtonState /*, MenuButtonVariants*/ } from './MenuButton.types';

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
  /* --- Icon-only state --- */
  [
    { iconOnly: true },
    {
      // menu icon
      [`& > .${MenuButtonClassNames.icon} + *`]: {
        marginLeft: 0,
      },
    },
  ],
]);
export const useMenuButtonStyles = (state: MenuButtonState) => {
  return css(useButtonStyles(state), useMenuButtonBaseStyles(state));
};

export const useMenuButtonContentStyles = useButtonContentStyles;
export const useMenuButtonIconStyles = useButtonIconStyles;

export const useMenuButtonMenuIconStyles = makeStyles([
  /* --- CSS definition --- */
  [null, { fontSize: 'var(--button-menu-icon-size)' }],
  /* --- Default state --- */
  [
    null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-menu-icon-color': tokens.buttonMenuIconColor || tokens.color?.body?.menuIconColor,
      '--button-hovered-menu-icon-color': tokens.buttonHoveredMenuIconColor,
      '--button-pressed-menu-icon-color': tokens.buttonPressedMenuIconColor,

      '--button-menu-icon-size': tokens.buttonMenuIconSize || '12px',
    }),
  ],
  /* --- Ghost state --- */
  [
    { ghost: true },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-menu-icon-color': tokens.buttonGhostMenuIconColor || tokens.palette?.neutralSecondary,
      '--button-hovered-menu-icon-color': tokens.buttonGhostHoveredMenuIconColor || tokens.palette?.themePrimary,
      '--button-pressed-menu-icon-color': tokens.buttonGhostPressedMenuIconColor || tokens.palette?.black,
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

// const useMenuButtonBaseClasses = makeVariantClasses<MenuButtonState, MenuButtonVariants>({
//   name: 'MenuButton',
//   prefix: '--button',

//   styles: {
//     root: [
//       GlobalClassNames.root,
//       {
//         // This seems like a bad selector.
//         [`& > .${GlobalClassNames.menuIcon} + *`]: {
//           marginLeft: 0,
//         },

//         '& .ms-layer': {
//           position: 'absolute',
//         },

//         [`&:hover .${GlobalClassNames.menuIcon}`]: {
//           color: 'var(--button-hovered-menuIconColor, var(--button-menuIconColor))',
//         },

//         [`&:active .${GlobalClassNames.menuIcon}`]: {
//           color:
//             'var(--button-pressed-menuIconColor, var(--button-hovered-menuIconColor, var(--button-menuIconColor)))',
//         },
//       },
//     ],

//     menuIcon: [
//       GlobalClassNames.menuIcon,
//       {
//         color: 'var(--button-menuIconColor)',
//         fontSize: 'var(--button-menuIconSize)',

//         [`.${GlobalClassNames._disabled} &`]: {
//           color: 'var(--button-disabled-menuIconColor)',
//         },
//       },
//     ],

//     _disabled: [GlobalClassNames._disabled],

//     _iconOnly: [
//       GlobalClassNames._iconOnly,
//       {
//         '& > .ms-Button-icon + *': {
//           marginLeft: 0,
//         },
//       },
//     ],
//   },

//   variants: (theme: Theme): MenuButtonVariants => {
//     const { palette, tokens } = theme;
//     const body = tokens?.color?.body;

//     return {
//       root: {
//         menuIconSize: '12px',
//         menuIconColor: body?.menuIconColor,
//       },

//       ghost: {
//         menuIconColor: palette?.neutralSecondary,
//         hovered: {
//           menuIconColor: palette?.themePrimary,
//         },
//         pressed: {
//           menuIconColor: palette?.black,
//         },
//       },

//       transparent: {
//         menuIconColor: palette?.neutralSecondary,
//       },
//     };
//   },
// });

// export const useMenuButtonClasses = (state: MenuButtonState) => {
//   useButtonClasses(state);
//   useMenuButtonBaseClasses(state);
// };
