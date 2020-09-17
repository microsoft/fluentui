import { makeClasses } from './makeClasses';
import { tokensToStyleObject } from './tokensToStyleObject';

export const useThemeProviderClasses = makeClasses(theme => {
  const { tokens } = theme;

  return {
    root: [
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tokensToStyleObject(tokens) as any,
      {
        color: 'var(--color-body-contentColor)',
        fontFamily: 'var(--body-fontFamily)',
        fontWeight: 'var(--body-fontWeight)',
        fontSize: 'var(--body-fontSize)',
      },
    ],
  };
});
