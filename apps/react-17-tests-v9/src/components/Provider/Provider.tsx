import * as React from 'react';
import { webLightTheme, FluentProvider } from '@fluentui/react-components';

export const Provider = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <React.StrictMode>
      <FluentProvider theme={webLightTheme}>{children}</FluentProvider>
    </React.StrictMode>
  );
};
