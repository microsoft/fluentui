import * as React from 'react';

import { FluentProviderProps } from './FluentProvider.types';
import { renderFluentProvider } from './renderFluentProvider';
import { useFluentProvider } from './useFluentProvider';
import { useFluentProviderStyles } from './useFluentProviderStyles';
import { useFluentProviderContextValues } from './useFluentProviderContextValues';

export const FluentProvider = React.forwardRef<HTMLElement, FluentProviderProps>((props, ref) => {
  const state = useFluentProvider(props, ref);
  const contextValues = useFluentProviderContextValues(state);

  useFluentProviderStyles(state);

  return renderFluentProvider(state, contextValues);
});

FluentProvider.displayName = 'FluentProvider';
