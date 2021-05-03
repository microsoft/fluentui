import * as React from 'react';
import { useFluentProvider } from './useFluentProvider';
import { FluentProviderProps } from './FluentProvider.types';
import { renderFluentProvider } from './renderFluentProvider';

export const FluentProvider = React.forwardRef<HTMLElement, FluentProviderProps>((props, ref) => {
  const state = useFluentProvider(props, ref);

  return renderFluentProvider(state);
});

FluentProvider.displayName = 'FluentProvider';
