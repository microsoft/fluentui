import React from 'react';
// TODO: replace with converged Theme Provider
import { FakeProvider } from '../components/FakeProvider';

export const withThemeProvider = (Story, context) => {
  const { theme } = context.globals;
  return (
    <FakeProvider theme={theme}>
      <Story />
      <pre>{JSON.stringify(theme, null, 2)}</pre>
    </FakeProvider>
  );
};
