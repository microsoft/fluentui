import { makeVariantClasses } from '@fluentui/react-theme-provider';
import { ToggleButtonState } from './ToggleButton.types';
import { useButtonClasses } from '../Button/useButtonClasses';

export const useToggleButtonClasses = makeVariantClasses<ToggleButtonState>({
  name: 'ToggleButton',
  extends: useButtonClasses,

  styles: {
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
  },

  variants: {
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
