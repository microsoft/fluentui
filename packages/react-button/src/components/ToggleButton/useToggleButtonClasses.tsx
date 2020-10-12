import { makeVariantClasses, Theme } from '@fluentui/react-theme-provider';
import { ToggleButtonState } from './ToggleButton.types';

export const useToggleButtonClasses = makeVariantClasses<ToggleButtonState>({
  name: 'ToggleButton',
  prefix: '--button',

  styles: {
    // When checked is applied, apply the right tokens to the right css properties.
    _checked: {
      background: 'var(--button-checked-background)',
      color: 'var(--button-checked-contentColor)',
      '.ms-Button-icon': {
        color: 'var(--button-checked-iconColor)',
      },

      ':hover': {
        background: 'var(--button-checked-hovered-background)',
        color: 'var(--button-checked-hovered-contentColor)',
        '.ms-Button-icon': {
          color: 'var(--button-checked-hovered-iconColor)',
        },
      },

      ':active': {
        background: 'var(--button-checked-pressed-background, var(--button-checked-hovered-background))',
        color: 'var(--button-checked-pressed-contentColor, var(--button-checked-hovered-contentColor))',
        '.ms-Button-icon': {
          color: 'var(--button-checked-pressed-iconColor, var(--button-checked-hovered-iconColor))',
        },
      },
    },
  },

  variants: (theme: Theme) => {
    const { palette, semanticColors } = theme;

    return {
      root: {
        checked: {
          background: semanticColors?.buttonBackgroundPressed,
          contentColor: semanticColors?.buttonTextChecked,

          hovered: {
            background: semanticColors?.buttonBackgroundPressed,
            contentColor: semanticColors?.buttonTextCheckedHovered,
          },
        },
      },

      primary: {
        checked: {
          background: 'var(--color-brand-checked-background)',
          contentColor: 'var(--color-brand-checked-contentColor)',
          hovered: {
            background: 'var(--color-brand-checked-hovered-background)',
            contentColor: 'var(--color-brand-checked-hovered-contentColor)',
          },
          pressed: {
            background: 'var(--color-brand-checked-pressed-background)',
            contentColor: 'var(--color-brand-checked-pressed-contentColor)',
          },
        },
      },

      ghost: {
        checked: {
          background: palette?.neutralLight,
          contentColor: palette?.black,
          iconColor: palette?.themeDarker,

          hovered: {
            background: palette?.neutralQuaternaryAlt,
            contentColor: palette?.themePrimary,
            iconColor: palette?.themePrimary,
          },
        },
      },

      transparent: {
        checked: {
          background: 'transparent',
          contentColor: palette?.themePrimary,
          iconColor: palette?.themePrimary,
          hovered: {
            background: 'transparent',
            contentColor: palette?.black,
            iconColor: palette?.themeDarker,
          },
        },
      },
    };
  },
});
