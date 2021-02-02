import * as React from 'react';
import { ThemeProvider } from './ThemeProvider';

export const withThemeProvider = <TProps,>(Component: React.FunctionComponent<TProps>) =>
  React.forwardRef<HTMLButtonElement, TProps>((props, ref) => (
    <ThemeProvider>
      <Component {...props} ref={ref} />
    </ThemeProvider>
  ));
