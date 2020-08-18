import { Tokens } from '../types';
import { defaultButtonTokens } from './button/tokens';

/**
 * Default tokens for Fluent UI React Components
 */
export const defaultTokens: Tokens = {
  body: { background: '#ffffff' },
  accent: {
    background: '#0078d4',
    contentColor: '#ffffff',
    borderColor: 'transparent',
    iconColor: '#ffffff',
    disabled: {
      background: '#f3f2f1',
      contentColor: '#c8c6c4',
      borderColor: 'var(--accent-disabled-background)',
      iconColor: 'var(--accent-disabled-contentColor)',
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
    focused: {
      background: 'var(--accent-background)',
      borderColor: 'var(--accent-borderColor)',
      contentColor: 'var(--accent-contentColor)',
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
  button: defaultButtonTokens,
};
