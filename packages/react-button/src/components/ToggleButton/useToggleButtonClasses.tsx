import { makeClasses } from '@fluentui/react-theme-provider';

export const useToggleButtonClasses = makeClasses({
  // When checked is applied, apply the right tokens to the right css properties.
  _checked: {
    background: 'var(--button-checked-background)',
    color: 'var(--button-checked-contentColor)',
    '> .ms-Button-icon': {
      color: 'var(--button-checked-iconColor)',
    },

    ':hover': {
      background: 'var(--button-checkedHovered-background)',
      color: 'var(--button-checkedHovered-contentColor)',
      '> .ms-Button-icon': {
        color: 'var(--button-checkedHovered-iconColor)',
      },
    },

    ':active': {
      background: 'var(--button-checkedPressed-background, var(--button-checkedHovered-background))',
      color: 'var(--button-checkedPressed-contentColor, var(--button-checkedHovered-contentColor))',
      '> .ms-Button-icon': {
        color: 'var(--button-checkedPressed-iconColor)',
      },
    },

    '@media screen and (-ms-high-contrast: active)': {
      '--button-checked-background': 'Window',
      '--button-checked-contentColor': 'Highlight',
      '--button-checked-iconColor': 'Highlight',
      '--button-checkedHovered-background': 'var(--button-checked-background)',
      '--button-checkedHovered-contentColor': 'var(--button-checked-contentColor)',
      '--button-checkedHovered-iconColor': 'var(--button-checked-iconColor)',
      '--button-checkedPressed-background': 'var(--button-checked-background)',
      '--button-checkedPressed-contentColor': 'var(--button-checked-contentColor)',
      '--button-checkedPressed-iconColor': 'var(--button-checked-iconColor)',
    },
  },

  _primary: {
    '--button-checked-background': 'var(--color-brand-checked-background)',
    '--button-checked-contentColor': 'var(--color-brand-checked-contentColor)',
    '--button-checked-iconColor': 'var(--color-brand-checked-iconColor)',
    '--button-checkedHovered-background': 'var(--color-brand-checkedHovered-background)',
    '--button-checkedHovered-contentColor': 'var(--color-brand-checkedHovered-contentColor)',
    '--button-checkedHovered-iconColor': 'var(--color-brand-checkedHovered-iconColor)',
    '--button-checkedPressed-background': 'var(--color-brand-checkedPressed-background)',
    '--button-checkedPressed-contentColor': 'var(--color-brand-checkedPressed-contentColor)',
    '--button-checkedPressed-iconColor': 'var(--color-brand-checkedPressed-iconColor)',

    '@media screen and (-ms-high-contrast: active)': {
      '--button-checked-background': 'Highlight',
      '--button-checked-contentColor': 'Window',
      '--button-checked-iconColor': 'Window',
      '--button-checkedHovered-background': 'var(--button-checked-background)',
      '--button-checkedHovered-contentColor': 'var(--button-checked-contentColor)',
      '--button-checkedHovered-iconColor': 'var(--button-checked-iconColor)',
      '--button-checkedPressed-background': 'var(--button-checked-background)',
      '--button-checkedPressed-contentColor': 'var(--button-checked-contentColor)',
      '--button-checkedPressed-iconColor': 'var(--button-checked-iconColor)',
    },
  },

  _ghost: {
    '--button-checked-background': 'var(--ghost-checked-background)',
    '--button-checked-contentColor': 'var(--ghost-checked-contentColor)',
    '--button-checked-iconColor': 'var(--ghost-checked-iconColor)',
    '--button-checkedHovered-background': 'var(--ghost-checkedHovered-background)',
    '--button-checkedHovered-contentColor': 'var(--ghost-checkedHovered-contentColor)',
    '--button-checkedHovered-iconColor': 'var(--ghost-checkedHovered-iconColor)',
    '--button-checkedPressed-background': 'var(--ghost-checkedPressed-background)',
    '--button-checkedPressed-contentColor': 'var(--ghost-checkedPressed-contentColor)',
    '--button-checkedPressed-iconColor': 'var(--ghost-checkedPressed-iconColor)',

    '@media screen and (-ms-high-contrast: active)': {
      '--button-checked-background': 'Window',
      '--button-checked-contentColor': 'Highlight',
      '--button-checked-iconColor': 'Highlight',
      '--button-checkedHovered-background': 'var(--button-checked-background)',
      '--button-checkedHovered-contentColor': 'var(--button-checked-contentColor)',
      '--button-checkedHovered-iconColor': 'var(--button-checked-iconColor)',
      '--button-checkedPressed-background': 'var(--button-checked-background)',
      '--button-checkedPressed-contentColor': 'var(--button-checked-contentColor)',
      '--button-checkedPressed-iconColor': 'var(--button-checked-iconColor)',
    },
  },
});
