import { Tokens } from '@fluentui/theme';
import { ButtonTokens } from '@fluentui/react-button';

export const defaultTokens: Tokens = {
  body: { background: '#ffffff' },
  accent: {
    background: '#0078d4',
    contentColor: '#ffffff',
    borderColor: 'transparent',
    iconColor: '#ffffff',
    dividerColor: '#ffffff',
    disabled: {
      background: '#f3f2f1',
      contentColor: '#c8c6c4',
      borderColor: 'var(--accent-disabled-background)',
      iconColor: 'var(--accent-disabled-contentColor)',
      dividerColor: '#c8c6c4',
    },
    hovered: {
      background: '#106ebe',
      contentColor: '#ffffff',
      borderColor: 'var(--accent-borderColor)',
      iconColor: '#ffffff',
    },
    pressed: {
      background: '#005a9e',
      contentColor: 'var(--accent-contentColor)',
      borderColor: 'var(--accent-borderColor)',
      iconColor: 'var(--accent-iconColor)',
    },
    checked: {
      background: 'var(--acent-pressed-background)',
      contentColor: 'var(--acent-pressed-contentColor)',
    },
    checkedHovered: {
      background: 'var(--acent-pressed-background)',
      contentColor: 'var(--acent-pressed-contentColor)',
    },
  },
  button: ButtonTokens,
};
