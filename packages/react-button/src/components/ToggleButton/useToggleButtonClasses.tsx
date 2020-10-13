import { EdgeChromiumHighContrastSelector } from '@uifabric/styling';
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

      [EdgeChromiumHighContrastSelector]: {
        background: 'var(--button-highContrast-checked-background)',
        color: 'var(--button-highContrast-checked-contentColor)',
        '.ms-Button-icon': {
          color: 'var(--button-highContrast-checked-iconColor)',
        },
      },

      ':hover': {
        background: 'var(--button-checkedHovered-background)',
        color: 'var(--button-checkedHovered-contentColor)',
        '.ms-Button-icon': {
          color: 'var(--button-checkedHovered-iconColor)',
        },

        [EdgeChromiumHighContrastSelector]: {
          background:
            'var(--button-highContrast-checkedHovered-background, var(--button-highContrast-checked-background))',
          color:
            'var(--button-highContrast-checkedHovered-contentColor, var(--button-highContrast-checked-contentColor))',
          '.ms-Button-icon': {
            color:
              'var(--button-highContrast-checkedHovered-iconColor, var(--button-highContrast-checked-contentColor))',
          },
        },
      },

      ':active': {
        background: 'var(--button-checkedPressed-background, var(--button-checkedHovered-background))',
        color: 'var(--button-checkedPressed-contentColor, var(--button-checkedHovered-contentColor))',
        '.ms-Button-icon': {
          color: 'var(--button-checkedPressed-iconColor, var(--button-checkedHovered-iconColor))',
        },

        [EdgeChromiumHighContrastSelector]: {
          background:
            'var(--button-highContrast-checkedPressed-background, ' +
            'var(--button-highContrast-checkedHovered-background, ' +
            'var(--button-highContrast-checked-background)))',
          color:
            'var(--button-highContrast-checked--pressed-contentColor, ' +
            'var(--button-highContrast-checked--hovered-contentColor, ' +
            'var(--button-highContrast-checked-contentColor)))',
          '.ms-Button-icon': {
            color:
              'var(--button-highContrast-checkedPressed-iconColor, ' +
              'var(--button-highContrast-checkedHovered-iconColor, ' +
              '--button-highContrast-checked-iconColor)))',
          },
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

        highContrast: {
          checked: {
            background: 'Window',
            contentColor: 'Highlight',
            iconColor: 'Highlight',
          },
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

        highContrast: {
          checked: {
            background: 'Highlight',
            contentColor: 'Window',
            iconColor: 'Window',
          },
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
        },

        checkedHovered: {
          background: 'transparent',
          contentColor: palette?.black,
          iconColor: palette?.themeDarker,
        },
      },
    };
  },
});
