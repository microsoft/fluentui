import React from 'react';
import { AzureLightTheme } from '@sample/azure-theme';
import { FluentProvider } from '@fluentui/react-components';

export const ThemedApp = () => (
  <FluentProvider theme={AzureLightTheme}>
    <span>Hello</span>
  </FluentProvider>
);
