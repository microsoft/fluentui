import { makeStyles /*, makeVariantClasses, Theme */ } from '@fluentui/react-theme-provider';
import { css } from '@fluentui/utilities';
import { CompoundButtonState /*, CompoundButtonVariants*/ } from './CompoundButton.types';
import {
  /* useButtonClasses, */ useButtonStyles,
  useButtonContentStyles,
  useButtonIconStyles,
  ButtonClassNames,
} from '../Button/useButtonClasses';

export const CompoundButtonClassNames = {
  root: css(ButtonClassNames.root, 'ms-CompoundButton'),
  content: ButtonClassNames.content,
  icon: ButtonClassNames.icon,
  contentContainer: 'ms-CompoundButton-contentContainer',
  secondaryContent: 'ms-CompoundButton-secondaryContent',
};

const useCompoundButtonBaseStyles = makeStyles([
  /* --- CSS definition --- */
  [
    null,
    {
      alignItems: 'flex-start',

      // secondary content
      [`& > .${CompoundButtonClassNames.secondaryContent}`]: {
        color: 'var(--button-secondary-content-color, var(--button-content-color))',
      },

      // hovered state
      [`&:hover > .${CompoundButtonClassNames.secondaryContent}`]: {
        color: 'var(--button-hovered-secondary-content-color, var(--button-secondary-content-color))',
      },

      // pressed state
      [`&:active > .${CompoundButtonClassNames.secondaryContent}`]: {
        color:
          'var(--button-pressed-secondary-content-color, ' +
          'var(--button-hovered-secondary-content-color, ' +
          'var(--button-secondary-content-color)))',
      },
    },
  ],
  /* --- Default state --- */
  [
    null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-height': tokens.buttonHeight || 'auto',
      '--button-max-width': tokens.buttonMaxWidth || '280px',
      '--button-min-width': tokens.buttonMinWidth || '72px',
      '--button-padding-bottom': tokens.buttonPaddingBottom || '16px',
      '--button-padding-left': tokens.buttonPaddingLeft || '12px',
      '--button-padding-right': tokens.buttonPaddingRight || '12px',
      '--button-padding-top': tokens.buttonPaddingTop || '16px',
    }),
  ],
  /* --- Icon-only state --- */
  [
    { iconOnly: true },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-min-height': tokens.buttonMinHeight || 'var(--button-size-regular)',
      '--button-min-width': tokens.buttonMinWidth || '0',
      '--button-padding-bottom': tokens.buttonPaddingBottom || '0',
      '--button-padding-left': tokens.buttonPaddingLeft || '0',
      '--button-padding-right': tokens.buttonPaddingRight || '0',
      '--button-padding-top': tokens.buttonPaddingTop || '0',
      '--button-width': tokens.buttonWidth || 'varr(--button-min-height)',
    }),
  ],
]);
export const useCompoundButtonStyles = (state: CompoundButtonState) => {
  return css(useButtonStyles(state), useCompoundButtonBaseStyles(state));
};

export const useCompoundButtonContentStyles = useButtonContentStyles;

const useCompoundButtonBaseIconStyles = makeStyles([
  [
    null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-icon-size': tokens.buttonIconSize || '28px',
    }),
  ],
]);
export const useCompoundButtonIconStyles = (state: CompoundButtonState) => {
  return css(useButtonIconStyles(state), useCompoundButtonBaseIconStyles(state));
};

export const useCompoundButtonContentContainerStyles = makeStyles([
  [
    null,
    {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'left',
    },
  ],
]);

export const useCompoundButtonSecondaryContentStyles = makeStyles([
  /* --- CSS definition --- */
  [
    null,
    {
      lineHeight: '100%',

      fontSize: 'var(--button-secondary-content-font-size)',
      fontWeight: 'var(--button-secondary-content-font-weight)',
      marginTop: 'var(--button-secondary-content-gap)',

      // '@media (forced-colors: active)': {
      //   color: 'var(--button-highContrast-secondaryContentColor)',
      // },
    },
  ],
  /* --- Default state --- */
  [
    null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      // '--button-secondary-content-color': tokens.buttonSecondaryContentColor || tokens.palette?.neutralSecondary,
      '--button-secondary-content-font-size':
        tokens.buttonSecondaryContentFontSize || (tokens.fonts?.small?.fontSize as string),
      '--button-secondary-content-font-weight': tokens.buttonSecondaryContentFontWeight || 'normal',
      '--button-secondary-content-gap': tokens.buttonSecondaryContentGap || '4px',

      // hovered state
      '--button-hovered-secondary-content-color':
        tokens.buttonHoveredSecondaryContentColor || tokens.palette?.neutralDark,

      // pressed state
      '--button-pressed-secondary-content-color':
        tokens.buttonPressedSecondaryContentColor || tokens.semanticColors?.buttonTextPressed,
    }),
  ],
  /* --- Primary state --- */
  [
    { primary: true },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-secondary-content-color':
        tokens.buttonPrimarySecondaryContentColor || tokens.color?.brand?.secondaryContentColor,
      '--button-hovered-secondary-content-color':
        tokens.buttonPrimaryHoveredSecondaryContentColor || tokens.color?.brand?.hovered?.secondaryContentColor,
      '--button-pressed-secondary-content-color':
        tokens.buttonPrimaryPressedSecondaryContentColor || tokens.color?.brand?.pressed?.secondaryContentColor,
    }),
  ],
  /* --- Ghost state --- */
  [
    { ghost: true },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-secondary-content-color': tokens.buttonGhostSecondaryContentColor || tokens.palette?.neutralSecondary,
      '--button-hovered-secondary-content-color':
        tokens.buttonGhostHoveredSecondaryContentColor || tokens.palette?.neutralDark,
      '--button-pressed-secondary-content-color':
        tokens.buttonGhostPressedSecondaryContentColor || tokens.palette?.black,
    }),
  ],
  /* --- Transparent state --- */
  [
    { transparent: true },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-hovered-secondary-content-color':
        tokens.buttonTransparentHoveredSecondaryContentColor || tokens.palette?.themePrimary,
    }),
  ],
  /* --- Disabled state --- */
  [
    { disabled: true },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-secondary-content-color':
        tokens.buttonDisabledSecondaryContentColor || tokens.semanticColors?.buttonTextDisabled,
    }),
  ],
  /* --- Ghost and disabled states --- */
  [
    { disabled: true, ghost: true },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-secondary-content-color':
        tokens.buttonGhostDisabledSecondaryContentColor || tokens.palette?.neutralTertiary,
    }),
  ],
]);

// const useCompoundButtonBaseClasses = makeVariantClasses<CompoundButtonState, CompoundButtonVariants>({
//   name: 'CompoundButton',
//   prefix: '--button',

//   styles: {
//     root: [
//       GlobalClassNames.root,
//       {
//         alignItems: 'flex-start',
//       },
//     ],

//     contentContainer: [
//       GlobalClassNames.contentContainer,
//       {
//         display: 'flex',
//         flexDirection: 'column',
//         textAlign: 'left',
//       },
//     ],

//     secondaryContent: [
//       GlobalClassNames.secondaryContent,
//       {
//         color: 'var(--button-secondaryContentColor, var(--button-contentColor))',
//         fontSize: 'var(--button-secondaryContentFontSize)',
//         fontWeight: 'var(--button-secondaryContentFontWeight)',
//         lineHeight: '100%',
//         marginTop: 'var(--button-secondaryContentGap)',

//         '@media (forced-colors: active)': {
//           color: 'var(--button-highContrast-secondaryContentColor)',
//         },

//         [`.${GlobalClassNames.root}:hover &`]: {
//           color: 'var(--button-hovered-secondaryContentColor, var(--button-secondaryContentColor))',

//           '@media (forced-colors: active)': {
//             color:
//               'var(--button-highContrast-hovered-secondaryContentColor, ' +
//               'var(--button-highContrast-secondaryContentColor))',
//           },
//         },

//         [`.${GlobalClassNames.root}:active &`]: {
//           color:
//             'var(--button-pressed-secondaryContentColor, ' +
//             'var(--button-hovered-secondaryContentColor, ' +
//             'var(--button-secondaryContentColor)))',

//           '@media (forced-colors: active)': {
//             color:
//               'var(--button-highContrast-pressed-secondaryContentColor, ' +
//               'var(--button-highContrast-hovered-secondaryContentColor, ' +
//               'var(--button-highContrast-secondaryContentColor)))',
//           },
//         },

//         [`.${GlobalClassNames.root}[aria-disabled="true"] &`]: {
//           color: 'var(--button-disabled-secondaryContentColor, var(--button-disabled-contentColor))',

//           '@media (forced-colors: active)': {
//             color:
//               'var(--button-highContrast-disabled-secondaryContentColor, ' +
//               'var(--button-highContrast-secondaryContentColor))',
//           },
//         },
//       },
//     ],
//   },

//   variants: (theme: Theme): CompoundButtonVariants => {
//     const { fonts, palette, semanticColors, tokens } = theme;
//     const brand = tokens?.color?.brand;

//     return {
//       root: {
//         height: 'auto',
//         maxWidth: '280px',
//         minWidth: '72px',
//         paddingBottom: '16px',
//         paddingLeft: '12px',
//         paddingRight: '12px',
//         paddingTop: '16px',
//         iconSize: '28px',
//         secondaryContentColor: palette.neutralSecondary,
//         secondaryContentGap: '4px',
//         secondaryContentFontSize: fonts?.small.fontSize as string,
//         secondaryContentFontWeight: 'normal',

//         hovered: {
//           secondaryContentColor: palette.neutralDark,
//         },

//         pressed: {
//           secondaryContentColor: semanticColors.buttonTextPressed,
//         },

//         disabled: {
//           secondaryContentColor: semanticColors.buttonTextDisabled,
//         },

//         highContrast: {
//           secondaryContentColor: 'WindowText',
//           hovered: {
//             secondaryContentColor: 'Highlight',
//           },
//           pressed: {
//             secondaryContentColor: 'WindowText',
//           },
//           disabled: {
//             secondaryContentColor: 'GrayText',
//           },
//         },
//       },

//       block: {
//         maxWidth: '100%',
//       },

//       iconOnly: {
//         minHeight: 'var(--button-size-regular)',
//         width: 'var(--button-minHeight)',
//         minWidth: '0',
//         paddingBottom: '0',
//         paddingTop: '0',
//         paddingLeft: '0',
//         paddingRight: '0',
//       },

//       primary: {
//         secondaryContentColor: color?.brand?.secondaryContentColor,

//         focused: {
//           secondaryContentColor: color?.brand?.focused?.secondaryContentColor,
//         },

//         hovered: {
//           secondaryContentColor: color?.brand?.hovered?.secondaryContentColor,
//         },

//         pressed: {
//           secondaryContentColor: color?.brand?.pressed?.secondaryContentColor,
//         },

//         highContrast: {
//           secondaryContentColor: 'Window',
//           hovered: {
//             secondaryContentColor: 'Window',
//           },
//           pressed: {
//             secondaryContentColor: 'Window',
//           },
//           disabled: {
//             secondaryContentColor: 'GrayText',
//           },
//         },
//       },

//       ghost: {
//         secondaryContentColor: palette.neutralSecondary,
//         disabled: {
//           secondaryContentColor: palette.neutralTertiary,
//         },
//         focused: {
//           secondaryContentColor: palette.neutralSecondary,
//         },
//         hovered: {
//           secondaryContentColor: palette.neutralDark,
//         },
//         pressed: {
//           secondaryContentColor: palette.black,
//         },

//         highContrast: {
//           secondaryContentColor: 'WindowText',
//           hovered: {
//             secondaryContentColor: 'Highlight',
//           },
//           pressed: {
//             secondaryContentColor: 'Highlight',
//           },
//           disabled: {
//             secondaryContentColor: 'GrayText',
//           },
//         },
//       },

//       transparent: {
//         hovered: {
//           secondaryContentColor: palette?.themePrimary,
//         },
//       },
//     };
//   },
// });

// export const useCompoundButtonClasses = (state: CompoundButtonState) => {
//   useButtonClasses(state);
//   useCompoundButtonBaseClasses(state);
// };
