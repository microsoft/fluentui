import { makeClasses } from '@fluentui/react-theme-provider';

export const useToggleButtonClasses = makeClasses({
  // When checked is applied, apply the right tokens to the right css properties.
  _checked: {
    background: 'var(--button-checked-background)',
    color: 'var(--button-checked-contentColor)',

    ':hover': {
      background: 'var(--button-checkedHovered-background)',
      color: 'var(--button-checkedHovered-contentColor)',
    },

    ':active': {
      background: 'var(--button-checkedPressed-background, var(--button-checkedHovered-background))',
      color: 'var(--button-checkedPressed-contentColor, var(--button-checkedHovered-contentColor))',
    },
  },

  _primary: {
    '--button-checked-background': 'var(--color-brand-checked-background)',
    '--button-checked-contentColor': 'var(--color-brand-checked-contentColor)',
    '--button-checkedHovered-background': 'var(--color-brand-checkedHovered-background)',
    '--button-checkedHovered-contentColor': 'var(--color-brand-checkedHovered-contentColor)',
    '--button-checkedPressed-background': 'var(--color-brand-checkedPressed-background)',
    '--button-checkedPressed-contentColor': 'var(--color-brand-checkedPressed-contentColor)',
  },

  _ghost: {
    '--button-checked-background': 'var(--ghost-checked-background)',
    '--button-checked-contentColor': 'var(--ghost-checked-contentColor)',
    '--button-checkedHovered-background': 'var(--ghost-checkedHovered-background)',
    '--button-checkedHovered-contentColor': 'var(--ghost-checkedHovered-contentColor)',
    '--button-checkedPressed-background': 'var(--ghost-checkedPressed-background)',
    '--button-checkedPressed-contentColor': 'var(--ghost-checkedPressed-contentColor)',
  },
});
