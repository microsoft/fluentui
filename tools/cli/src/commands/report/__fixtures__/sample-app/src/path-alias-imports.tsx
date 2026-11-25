import React from 'react';
import { AzureLightTheme } from '@sample/azure-theme';
import { FluentProvider } from '@proj/react-components';

export const ThemedApp = () => (
  <FluentProvider theme={AzureLightTheme}>
    <span>Hello</span>
  </FluentProvider>
);
