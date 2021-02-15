import { EdgeChromiumHighContrastSelector } from '@fluentui/style-utilities';
import { makeVariantClasses, Theme } from '@fluentui/react-theme-provider/lib/compat/index';
import { ToggleButtonState, ToggleButtonVariants } from './ToggleButton.types';
import { useButtonClasses } from '../Button/useButtonClasses';

const useToggleButtonBaseClasses = makeVariantClasses<ToggleButtonState, ToggleButtonVariants>({
  name: 'ToggleButton',
  prefix: '--button',

  styles: {
    // When checked is applied, apply the right tokens to the right css properties.
    _checked: {
      background: 'var(--button-checked-background)',
      borderColor: 'var(--button-checked-borderColor, var(--button-borderColor))',
      color: 'var(--button-checked-contentColor)',
      '.ms-Button-icon': {
        color: 'var(--button-checked-iconColor)',
      },

      [EdgeChromiumHighContrastSelector]: {
        background: 'var(--button-highContrast-checked-background)',
        borderColor: 'var(--button-highContrast-checked-borderColor, var(--button-highContrast-borderColor))',
        color: 'var(--button-highContrast-checked-contentColor)',
        '.ms-Button-icon': {
          color: 'var(--button-highContrast-checked-iconColor)',
        },
      },

      ':hover': {
        background: 'var(--button-checkedHovered-background)',
        borderColor:
          'var(--button-checkedHovered-borderColor, var(--button-checked-borderColor), var(--button-borderColor)))',
        color: 'var(--button-checkedHovered-contentColor)',
        '.ms-Button-icon': {
          color: 'var(--button-checkedHovered-iconColor)',
        },

        [EdgeChromiumHighContrastSelector]: {
          background:
            'var(--button-highContrast-checkedHovered-background, var(--button-highContrast-checked-background))',
          borderColor:
            'var(--button-highContrast-checkedHovered-borderColor, ' +
            'var(--button-highContrast-checked-borderColor, ' +
            'var(--button-highContrast-borderColor)))',
          color:
            'var(--button-highContrast-checkedHovered-contentColor, var(--button-highContrast-checked-contentColor))',
          '.ms-Button-icon': {
            color: 'var(--button-highContrast-checkedHovered-iconColor, var(--button-highContrast-checked-iconColor))',
          },
        },
      },

      ':active': {
        background: 'var(--button-checkedPressed-background, var(--button-checkedHovered-background))',
        borderColor:
          'var(--button-checkedPressed-borderColor, ' +
          'var(--button-checkedHovered-borderColor, ' +
          'var(--button-checked-borderColor, ' +
          'var(--button-borderColor))))',
        color: 'var(--button-checkedPressed-contentColor, var(--button-checkedHovered-contentColor))',
        '.ms-Button-icon': {
          color: 'var(--button-checkedPressed-iconColor, var(--button-checkedHovered-iconColor))',
        },

        [EdgeChromiumHighContrastSelector]: {
          background:
            'var(--button-highContrast-checkedPressed-background, ' +
            'var(--button-highContrast-checkedHovered-background, ' +
            'var(--button-highContrast-checked-background)))',
          borderColor:
            'var(--button-highContrast-checkedPressed-borderColor, ' +
            'var(--button-highContrast-checkedHovered-borderColor, ' +
            'var(--button-highContrast-checked-borderColor, ' +
            'var(--button-highContrast-borderColor))))',
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

  variants: (theme: Theme): ToggleButtonVariants => {
    const { palette, semanticColors, tokens } = theme;
    const brand = tokens?.color?.brand;

    return {
      root: {
        checked: {
          background: semanticColors?.buttonBackgroundChecked,
          contentColor: semanticColors?.buttonTextChecked,
        },

        checkedHovered: {
          background: semanticColors?.buttonBackgroundCheckedHovered,
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
          background: brand?.checked?.background,
          contentColor: brand?.checked?.contentColor,
        },

        checkedHovered: {
          background: brand?.checkedHovered?.background,
          contentColor: brand?.checkedHovered?.contentColor,
        },

        checkedPressed: {
          background: brand?.checkedPressed?.background,
          contentColor: brand?.checkedPressed?.contentColor,
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

export const useToggleButtonClasses = (state: ToggleButtonState) => {
  useButtonClasses(state);
  useToggleButtonBaseClasses(state);
};
