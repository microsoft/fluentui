import { makeVariantClasses } from '@fluentui/react-theme-provider';
import { ToggleButtonState } from './ToggleButton.types';

export const useToggleButtonClasses = makeVariantClasses<ToggleButtonState>({
  name: 'ToggleButton',
  prefix: '--button',

  styles: {
    // When checked is applied, apply the right tokens to the right css properties.
    _checked: {
      background: 'var(--button-checked-background)',
      color: 'var(--button-checked-contentColor)',

      '@media (forced-colors: active)': {
        background: 'var(--button-highContrast-checked-background)',
        color: 'var(--button-highContrast-checked-contentColor)',
        '.ms-Button-icon': {
          color: 'var(--button-highContrast-checked-iconColor)',
        },
      },

      ':hover': {
        background: 'var(--button-checked-hovered-background)',
        color: 'var(--button-checked-hovered-contentColor)',

        '@media (forced-colors: active)': {
          background:
            'var(--button-highContrast-checked-hovered-background, var(--button-highContrast-checked-background))',
          color:
            'var(--button-highContrast-checked--hovered-contentColor, var(--button-highContrast-checked-contentColor))',
          '.ms-Button-icon': {
            color:
              'var(--button-highContrast-checked-hovered-iconColor, var(--button-highContrast-checked-contentColor))',
          },
        },
      },

      ':active': {
        background: 'var(--button-checked-pressed-background, var(--button-checked-hovered-background))',
        color: 'var(--button-checked-pressed-contentColor, var(--button-checked-hovered-contentColor))',

        '@media (forced-colors: active)': {
          background:
            'var(--button-highContrast-checked-pressed-background, ' +
            'var(--button-highContrast-checked-hovered-background, ' +
            'var(--button-highContrast-checked-background)))',
          color:
            'var(--button-highContrast-checked--pressed-contentColor, ' +
            'var(--button-highContrast-checked--hovered-contentColor, ' +
            'var(--button-highContrast-checked-contentColor)))',
          '.ms-Button-icon': {
            color:
              'var(--button-highContrast-checked-pressed-iconColor, ' +
              'var(--button-highContrast-checked-hovered-iconColor, ' +
              '--button-highContrast-checked-contentColor)))',
          },
        },
      },
    },
  },

  variants: {
    root: {
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

        hovered: {
          background: 'var(--color-brand-checkedHovered-background)',
          contentColor: 'var(--color-brand-checkedHovered-contentColor)',
        },

        pressed: {
          background: 'var(--color-brand-checkedPressed-background)',
          contentColor: 'var(--color-brand-checkedPressed-contentColor)',
        },
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
        background: 'var(--ghost-checked-background)',
        contentColor: 'var(--ghost-checked-contentColor)',
      },
      checkedHovered: {
        background: 'var(--ghost-checkedHovered-background)',
        contentColor: 'var(--ghost-checkedHovered-contentColor)',
      },
      checkedPressed: {
        background: 'var(--ghost-checkedPressed-background)',
        contentColor: 'var(--ghost-checkedPressed-contentColor)',
      },
    },
  },
});
