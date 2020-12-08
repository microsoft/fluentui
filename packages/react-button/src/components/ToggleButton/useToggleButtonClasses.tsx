// import { EdgeChromiumHighContrastSelector } from '@fluentui/style-utilities';
import { makeStyles /* makeVariantClasses, Theme */ } from '@fluentui/react-theme-provider';
import { css } from '@fluentui/utilities';
import { ToggleButtonState /*, ToggleButtonVariants*/ } from './ToggleButton.types';
import {
  /* useButtonClasses */
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
export const useToggleButtonStyles = (state: ToggleButtonState) => {
  return css(useButtonStyles(state), useToggleButtonBaseStyles(state));
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
export const useToggleButtonIconStyles = (state: ToggleButtonState) => {
  return css(useButtonIconStyles(state), useToggleButtonIconBaseStyles(state));
};

// const useToggleButtonBaseClasses = makeVariantClasses<ToggleButtonState, ToggleButtonVariants>({
//   name: 'ToggleButton',
//   prefix: '--button',

//   styles: {
//     // When checked is applied, apply the right tokens to the right css properties.
//     _checked: {
//       background: 'var(--button-checked-background)',
//       color: 'var(--button-checked-contentColor)',
//       '.ms-Button-icon': {
//         color: 'var(--button-checked-iconColor)',
//       },

//       [EdgeChromiumHighContrastSelector]: {
//         background: 'var(--button-highContrast-checked-background)',
//         color: 'var(--button-highContrast-checked-contentColor)',
//         '.ms-Button-icon': {
//           color: 'var(--button-highContrast-checked-iconColor)',
//         },
//       },

//       ':hover': {
//         background: 'var(--button-checkedHovered-background)',
//         color: 'var(--button-checkedHovered-contentColor)',
//         '.ms-Button-icon': {
//           color: 'var(--button-checkedHovered-iconColor)',
//         },

//         [EdgeChromiumHighContrastSelector]: {
//           background:
//             'var(--button-highContrast-checkedHovered-background, var(--button-highContrast-checked-background))',
//           color:
//           'var(--button-highContrast-checkedHovered-contentColor, var(--button-highContrast-checked-contentColor))',
//           '.ms-Button-icon': {
//           color: 'var(--button-highContrast-checkedHovered-iconColor, var(--button-highContrast-checked-iconColor))',
//           },
//         },
//       },

//       ':active': {
//         background: 'var(--button-checkedPressed-background, var(--button-checkedHovered-background))',
//         color: 'var(--button-checkedPressed-contentColor, var(--button-checkedHovered-contentColor))',
//         '.ms-Button-icon': {
//           color: 'var(--button-checkedPressed-iconColor, var(--button-checkedHovered-iconColor))',
//         },

//         [EdgeChromiumHighContrastSelector]: {
//           background:
//             'var(--button-highContrast-checkedPressed-background, ' +
//             'var(--button-highContrast-checkedHovered-background, ' +
//             'var(--button-highContrast-checked-background)))',
//           color:
//             'var(--button-highContrast-checked--pressed-contentColor, ' +
//             'var(--button-highContrast-checked--hovered-contentColor, ' +
//             'var(--button-highContrast-checked-contentColor)))',
//           '.ms-Button-icon': {
//             color:
//               'var(--button-highContrast-checkedPressed-iconColor, ' +
//               'var(--button-highContrast-checkedHovered-iconColor, ' +
//               '--button-highContrast-checked-iconColor)))',
//           },
//         },
//       },
//     },
//   },

//   variants: (theme: Theme): ToggleButtonVariants => {
//     const { palette, semanticColorss, tokens } = theme;
//     const brand = tokens?.color?.brand;

//     return {
//       root: {
//         checked: {
//           background: semanticColors?.buttonBackgroundPressed,
//           contentColor: semanticColors?.buttonTextChecked,
//         },

//         checkedHovered: {
//           background: semanticColors?.buttonBackgroundPressed,
//           contentColor: semanticColors?.buttonTextCheckedHovered,
//         },

//         highContrast: {
//           checked: {
//             background: 'Window',
//             contentColor: 'Highlight',
//             iconColor: 'Highlight',
//           },
//         },
//       },

//       primary: {
//         checked: {
//           background: brand?.checked?.background,
//           contentColor: brand?.checked?.contentColor,
//         },

//         checkedHovered: {
//           background: brand?.checkedHovered?.background,
//           contentColor: brand?.checkedHovered?.contentColor,
//         },

//         checkedPressed: {
//           background: brand?.checkedPressed?.background,
//           contentColor: brand?.checkedPressed?.contentColor,
//         },

//         highContrast: {
//           checked: {
//             background: 'Highlight',
//             contentColor: 'Window',
//             iconColor: 'Window',
//           },
//         },
//       },

//       ghost: {
//         checked: {
//           background: palette?.neutralLight,
//           contentColor: palette?.neutralDark,
//           iconColor: palette?.themeDark,
//         },

//         checkedHovered: {
//           background: palette?.neutralQuaternaryAlt,
//           contentColor: palette?.neutralDark,
//           iconColor: palette?.themeDark,
//         },
//       },

//       transparent: {
//         checked: {
//           background: 'transparent',
//           contentColor: palette?.themePrimary,
//           iconColor: palette?.themePrimary,
//         },

//         checkedHovered: {
//           background: 'transparent',
//           contentColor: palette?.black,
//           iconColor: palette?.themeDarker,
//         },
//       },
//     };
//   },
// });

// export const useToggleButtonClasses = (state: ToggleButtonState) => {
//   useButtonClasses(state);
//   useToggleButtonBaseClasses(state);
// };
