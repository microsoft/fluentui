import { ButtonTokenSet } from './Button.types';

export const ButtonTokens: ButtonTokenSet = {
  size: {
    // smallest size supported by default theme is 24px.
    smallest: '24px',
    smaller: '24px',
    small: '24px',
    regular: '32px',
    large: '40px',
    larger: '48px',
    largest: '64px',
  },
  padding: '0 16px',
  minHeight: 'var(--button-size-regular)',
  contentGap: '10px',
  iconSize: '16px',
  borderRadius: '2px',
  borderWidth: '1px',
  // eslint-disable-next-line @fluentui/max-len
  fontFamily: `'Segoe UI', 'Segoe UI Web (West European)', 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', sans-serif`,
  fontSize: '14px',
  fontWeight: 400,
  focusColor: '#605e5c',
  focusInnerColor: '#ffffff',
  background: '#ffffff',
  borderColor: '#8a8886',
  contentColor: '#323130',
  iconColor: 'inherit',
  dividerColor: 'rgba(0, 0, 0, 0.1)',
  dividerLength: 'var(--button-minHeight)',
  dividerThickness: 'var(--button-borderWidth)',
  disabled: {
    background: '#f3f2f1',
    borderColor: '#f3f2f1',
    contentColor: '#a19f9d',
    iconColor: 'var(--button-disabled-contentColor)',
    dividerColor: '#c8c6c4',
  },
  hovered: {
    background: '#f3f2f1',
    borderColor: '#8a8886',
    contentColor: '#201f1e',
    iconColor: 'var(--button-iconColor)',
  },
  pressed: {
    background: '#edebe9',
    borderColor: '#8a8886',
    contentColor: '#201f1e',
    iconColor: 'var(--button-iconColor)',
  },
  checked: {
    background: 'var(--button-pressed-background)',
    contentColor: 'var(--button-pressed-contentColor)',
  },
  checkedHovered: {
    background: 'var(--button-pressed-background)',
    contentColor: 'var(--button-pressed-contentColor)',
  },
};
