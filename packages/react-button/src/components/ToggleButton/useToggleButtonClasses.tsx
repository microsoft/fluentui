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
    '--button-checked-background': 'var(--accent-checked-background)',
    '--button-checked-contentColor': 'var(--accent-checked-contentColor)',
    '--button-checkedHovered-background': 'var(--accent-checkedHovered-background)',
    '--button-checkedHovered-contentColor': 'var(--accent-checkedHovered-contentColor)',
    '--button-checkedPressed-background': 'var(--accent-checkedPressed-background)',
    '--button-checkedPressed-contentColor': 'var(--accent-checkedPressed-contentColor)',
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
