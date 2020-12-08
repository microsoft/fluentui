import { makeStyles /* makeVariantClasses, Theme*/ } from '@fluentui/react-theme-provider';
import { css } from '@fluentui/utilities';
// import { EdgeChromiumHighContrastSelector } from '@fluentui/style-utilities';
// import { ButtonSizeVariants } from '../Button/index';
import { ButtonClassNames } from '../Button/useButtonClasses';
import { MenuButtonClassNames } from '../MenuButton/useMenuButtonClasses';
// import { SplitButtonState, SplitButtonVariants } from './SplitButton.types';

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

// export const useSplitButtonClasses = makeVariantClasses<SplitButtonState, SplitButtonVariants>({
//   name: 'SplitButton',
//   prefix: '--button',

//   styles: {
//     root: [
//       GlobalClassNames.root,
//       {
//         display: 'inline-flex',
//         justifyContent: 'stretch',
//         position: 'relative',

//         // Forward the menuIconSize to a variable which can be consumed by the child menu button.
//         '--button-splitMenuIconSize': 'var(--button-menuIconSize)',
//       },
//     ],

//     button: [
//       GlobalClassNames.button,
//       {
//         '--button-borderRightWidth': 0,
//         '--button-borderTopRightRadius': 0,
//         '--button-borderBottomRightRadius': 0,
//       },
//     ],

//     menuButton: [
//       GlobalClassNames.menuButton,
//       {
//         // Scope the override to a child component, increase specificity.
//         [`.${GlobalClassNames.root} &`]: {
//           width: menuButtonWidth,
//           minWidth: menuButtonWidth,
//           '--button-borderLeftWidth': 0,
//           '--button-borderTopLeftRadius': 0,
//           '--button-borderBottomLeftRadius': 0,
//           '--button-iconColor': 'var(--button-menuIconColor)',
//           '--button-iconSize': 'var(--button-splitMenuIconSize)',
//         },
//       },
//     ],

//     divider: {
//       width: 'var(--button-dividerThickness)',
//       backgroundColor: 'var(--button-dividerColor)',
//       position: 'absolute',
//       right: menuButtonWidth,
//       top: 'calc(100% - var(--button-dividerLength, 100% + 8px))',
//       bottom: 'calc(100% - var(--button-dividerLength, 100% + 8px))',

//       [EdgeChromiumHighContrastSelector]: {
//         backgroundColor: 'var(--button-highContrast-dividerColor)',
//       },

//       [`.${GlobalClassNames.root}[aria-disabled="true"] &`]: {
//         backgroundColor: 'var(--button-disabled-dividerColor)',

//         [EdgeChromiumHighContrastSelector]: {
//       backgroundColor: 'var(--button-highContrast-disabled-dividerColor, var(--button-highContrast-dividerColor))',
//         },
//       },
//     },

//     _block: {
//       width: '100%',
//       maxWidth: '100%',

//       [`.${GlobalClassNames.button}`]: {
//         flexGrow: 1,
//         maxWidth: '100%',
//       },

//       [`.${GlobalClassNames.menuButton}`]: {
//         width: menuButtonWidth,
//       },
//     },
//   },
//   variants: (theme: Theme): SplitButtonVariants => {
//     const { palette, semanticColors, tokens } = theme;
//     const body = tokens?.color?.body;

//     return {
//       root: {
//         size: {
//           smallest: '24px',
//           smaller: '24px',
//           small: '24px',
//           regular: '32px',
//           large: '40px',
//           larger: '48px',
//           largest: '64px',
//         },
//         dividerThickness: '1px',
//         dividerColor: palette?.neutralTertiaryAlt,
//         disabled: {
//           dividerColor: semanticColors.disabledText,
//         },
//         menuIconColor: body?.menuIconColor,
//         menuIconSize: '12px',

//         highContrast: {
//           dividerColor: 'WindowText',

//           disabled: {
//             dividerColor: 'GrayText',
//           },
//         },
//       },

//       primary: {
//         dividerColor: palette.white,

//         disabled: {
//           dividerColor: semanticColors.disabledText,
//         },

//         highContrast: {
//           dividerColor: 'Window',

//           disabled: {
//             dividerColor: 'GrayText',
//           },
//         },
//       },

//       transparent: {
//         menuIconColor: palette.neutralSecondary,
//       },

//       ...ButtonSizeVariants,
//     };
//   },
// });
