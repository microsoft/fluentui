/* eslint-disable @typescript-eslint/naming-convention */
import { makeClasses } from './makeClasses';
import { tokensToStyleObject } from './tokensToStyleObject';

const inheritFont = { fontFamily: 'inherit' };

export const useThemeProviderClasses = makeClasses(theme => {
  const { tokens } = theme;

  const bodyStyles = {
    background: 'var(--body-background)',
  };

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
      {
        '& input': inheritFont,
        '& textarea': inheritFont,
      },
    ],
    _applyTo_body: bodyStyles,
    _applyTo_element: bodyStyles,
  };
});
