import * as React from 'react';
import { makeStyles, MakeStylesOptions } from '@fluentui/react-theme-provider';
import { css } from '@fluentui/utilities';
import {
  useButtonStyles,
  useButtonContentStyles,
  useButtonIconStyles,
  ButtonClassNames,
} from '../Button/useButtonClasses';
import { CompoundButtonState } from './CompoundButton.types';

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
      [`& .${CompoundButtonClassNames.secondaryContent}`]: {
        color: 'var(--button-secondary-content-color, var(--button-content-color))',
      },

      // hovered state
      [`&:hover .${CompoundButtonClassNames.secondaryContent}`]: {
        color: 'var(--button-hovered-secondary-content-color, var(--button-secondary-content-color))',
      },

      // pressed state
      [`&:active .${CompoundButtonClassNames.secondaryContent}`]: {
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

      // icon styling
      '--button-icon-size': tokens.buttonIconSize || '28px',

      // secondary content styling
      '--button-secondary-content-font-size':
        tokens.buttonSecondaryContentFontSize || (tokens.fonts?.small?.fontSize as string),
      '--button-secondary-content-font-weight': tokens.buttonSecondaryContentFontWeight || 'normal',
      '--button-secondary-content-gap': tokens.buttonSecondaryContentGap || '4px',

      '--button-secondary-content-color': tokens.buttonSecondaryContentColor || tokens.palette?.neutralSecondary,
      '--button-hovered-secondary-content-color':
        tokens.buttonHoveredSecondaryContentColor || tokens.palette?.neutralDark,
      '--button-pressed-secondary-content-color':
        tokens.buttonPressedSecondaryContentColor || tokens.semanticColors?.buttonTextPressed,
    }),
  ],
  /* --- Icon-only state --- */
  [
    (selectors: CompoundButtonState) => selectors.iconOnly,
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
  /* --- Primary state --- */
  [
    (selectors: CompoundButtonState) => selectors.primary,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      // secondary content styling
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
    (selectors: CompoundButtonState) => selectors.ghost,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      // secondary content styling
      '--button-secondary-content-color': tokens.buttonGhostSecondaryContentColor || tokens.palette?.neutralSecondary,
      '--button-hovered-secondary-content-color':
        tokens.buttonGhostHoveredSecondaryContentColor || tokens.palette?.neutralDark,
      '--button-pressed-secondary-content-color':
        tokens.buttonGhostPressedSecondaryContentColor || tokens.palette?.black,
    }),
  ],
  /* --- Transparent state --- */
  [
    (selectors: CompoundButtonState) => selectors.transparent,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      // secondary content styling
      '--button-hovered-secondary-content-color':
        tokens.buttonTransparentHoveredSecondaryContentColor || tokens.palette?.themePrimary,
    }),
  ],
  /* --- Disabled state --- */
  [
    (selectors: CompoundButtonState) => selectors.disabled,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      // secondary content styling
      '--button-secondary-content-color':
        tokens.buttonDisabledSecondaryContentColor || tokens.semanticColors?.buttonTextDisabled,
    }),
  ],
  /* --- Ghost and disabled states --- */
  [
    (selectors: CompoundButtonState) => selectors.disabled && selectors.ghost,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      // secondary content styling
      '--button-secondary-content-color':
        tokens.buttonGhostDisabledSecondaryContentColor || tokens.palette?.neutralTertiary,
    }),
  ],
]);
export const useCompoundButtonStyles = <Selectors, Tokens>(
  selectors: Selectors,
  options: MakeStylesOptions<Tokens>,
  ...classNames: (string | undefined)[]
) => {
  return css(
    useButtonStyles(selectors, options, ...classNames),
    useCompoundButtonBaseStyles(selectors, options, ...classNames),
  );
};

export const useCompoundButtonContentStyles = useButtonContentStyles;

export const useCompoundButtonIconStyles = useButtonIconStyles;

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
      fontWeight: 'var(--button-secondary-content-font-weight)' as React.CSSProperties['fontWeight'],
      marginTop: 'var(--button-secondary-content-gap)',
    },
  ],
]);
