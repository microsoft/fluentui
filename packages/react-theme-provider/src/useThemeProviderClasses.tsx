import { makeClasses } from './makeClasses';

export const useThemeProviderClasses = makeClasses({
  root: {
    background: 'var(--body-background)',
    color: 'var(--body-contentColor)',
    fontFamily: 'var(--body-fontFamily)',
    fontWeight: 'var(--body-fontWeight)',
    fontSize: 'var(--body-fontSize)',
    lineHeight: 'var(--body-fontLineHeight)',
    boxSizing: 'border-box',
  },
});
