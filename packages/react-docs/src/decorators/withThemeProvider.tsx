import React from 'react';
// TODO: replace with converged Theme Provider
import { FakeProvider } from '../components/FakeProvider';
import { StorybookStoryContext } from '../types';

export const withThemeProvider = (Story: React.ComponentType, context: StorybookStoryContext) => {
  const { theme } = context.globals;
  return (
    <FakeProvider theme={theme}>
      <div
        style={{
          padding: '0.5rem 1rem',
          margin: '-1rem -1rem 1rem -1rem',
          fontFamily: 'monospace',
          fontSize: 11,
          fontWeight: 'bold',
          color: theme.light.global.palette.brand.primary,
          background: theme.light.global.palette.brand.tint60,
        }}
      >
        Brand: {theme.friendlyName}
      </div>
      <Story />
    </FakeProvider>
  );
};
