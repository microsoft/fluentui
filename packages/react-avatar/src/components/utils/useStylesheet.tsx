import { useContext } from 'react';
import { ThemeContext } from 'react-fela';

export const useStylesheet = (stylesheet: string): void => {
  const context = useContext(ThemeContext);

  // tslint:disable-next-line: no-any
  const { registerStyles, target = document.documentElement } = context as any;

  if (registerStyles) {
    registerStyles(stylesheet, target);
  }
};
