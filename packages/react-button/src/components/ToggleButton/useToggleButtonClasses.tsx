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
        background: 'var(--button-checkedHovered-background)',
        color: 'var(--button-checkedHovered-contentColor)',
        '.ms-Button-icon': {
          color: 'var(--button-checkedHovered-iconColor)',
        },
      },

      ':active': {
        background: 'var(--button-checkedPressed-background, var(--button-checkedHovered-background))',
        color: 'var(--button-checkedPressed-contentColor, var(--button-checkedHovered-contentColor))',
        '.ms-Button-icon': {
          color: 'var(--button-checkedPressed-iconColor, var(--button-checkedHovered-iconColor))',
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
        },

        checkedHovered: {
          background: semanticColors?.buttonBackgroundPressed,
          contentColor: semanticColors?.buttonTextCheckedHovered,
        },
      },

      primary: {
        checked: {
          background: 'var(--color-brand-checked-background)',
          contentColor: 'var(--color-brand-checked-contentColor)',
        },

        checkedHovered: {
          background: 'var(--color-brand-checkedHovered-background)',
          contentColor: 'var(--color-brand-checkedHovered-contentColor)',
        },

        checkedPressed: {
          background: 'var(--color-brand-checkedPressed-background)',
          contentColor: 'var(--color-brand-checkedPressed-contentColor)',
        },
      },

      ghost: {
        checked: {
          background: palette?.neutralLight,
          contentColor: palette?.neutralDark,
          iconColor: palette?.themeDark,
        },

        checkedHovered: {
          background: palette?.neutralQuaternaryAlt,
          contentColor: palette?.neutralDark,
          iconColor: palette?.themeDark,
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
