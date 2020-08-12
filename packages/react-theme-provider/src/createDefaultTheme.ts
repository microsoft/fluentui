import { Theme, Tokens } from './types';
import { createTheme } from '@uifabric/styling';
import { getTokens } from './getTokens';

/**
 * Creates default theme (Fluent theme).
 */
export const createDefaultTheme = (): Theme => {
  const defaultTheme: Theme = createTheme({});
  defaultTheme.tokens = getTokens(defaultTheme);

  return defaultTheme;
};

export const defaultTokens: Tokens = {
  body: {},

  accent: {
    background: '#0078d4',
    contentColor: '#ffffff',
    borderColor: 'transparent',
    iconColor: 'inherit',

    disabled: {
      background: '#f3f2f1',
      contentColor: '#c8c6c4',
      borderColor: 'var(--accent-disabled-background)',
      iconColor: 'var(--accent-disabled-contentColor)',
    },
    hovered: {
      background: '#106ebe',
      contentColor: 'var(--accent-contentColor)',
      borderColor: 'var(--accent-borderColor)',
      iconColor: 'var(--accent-iconColor)',
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
  },

  button: {
    size: {
      smallest: '8px',
      smaller: '16px',
      small: '24px',
      regular: '32px',
      large: '40px',
      larger: '48px',
      largest: '64px',
    },
    padding: '0 16px',
    height: 'var(--button-size-regular)',
    minHeight: 'var(--button-size-regular)',
    contentGap: '10px',
    iconSize: '16px',
    borderRadius: '2px',
    borderWidth: '1px',

    fontFamily: `'Segoe UI', 'Helvetica Neue', 'Apple Color Emoji', 'Segoe UI Emoji', Helvetica, Arial, sans-serif`,
    fontSize: '14px',
    fontWeight: 'normal',

    focusColor: '#000',
    focusInnerColor: '#fff',

    background: 'white',
    borderColor: '#8a8886',
    contentColor: '#2c2621',
    iconColor: 'inherit',

    dividerColor: 'rgba(0, 0, 0, 0.1)',
    dividerLength: 'var(--button-minHeight)',
    dividerThickness: 'var(--button-borderWidth)',

    disabled: {
      background: '#f3f2f1',
      borderColor: 'var(--button-disabled-background)',
      contentColor: '#c8c6c4',
      iconColor: 'var(--button-disabled-contentColor)',
    },
    hovered: {
      background: '#f3f2f1',
      borderColor: 'var(--button-borderColor)',
      contentColor: 'var(--button-contentColor)',
      iconColor: 'var(--button-iconColor)',
    },
    pressed: {
      background: '#edebe9',
      borderColor: 'var(--button-borderColor)',
      contentColor: 'var(--button-contentColor)',
      iconColor: 'var(--button-iconColor)',
    },
    focused: {
      background: 'var(--button-background)',
      borderColor: 'var(--button-borderColor)',
      contentColor: 'var(--button-contentColor)',
      iconColor: 'var(--button-iconColor)',
    },
  },
};
