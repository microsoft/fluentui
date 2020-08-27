import { makeClasses } from './makeClasses';

export const useThemeProviderClasses = makeClasses({
  root: {
    background: 'var(--body-background)',
    color: 'var(--body-contentColor)',
    fontFamily: 'var(--body-fontFamily)',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fontWeight: 'var(--body-fontWeight)' as any,
    fontSize: 'var(--body-fontSize)',
    lineHeight: 'var(--body-fontLineHeight)',

    '& > *': {
      boxSizing: 'border-box',
    },
  },
});
