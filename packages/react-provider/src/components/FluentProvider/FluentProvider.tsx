import * as React from 'react';
import { useFluentProvider_unstable } from './useFluentProvider';
import type { FluentProviderProps } from './FluentProvider.types';

export const FluentProvider = React.forwardRef<HTMLElement, FluentProviderProps>((props, ref) => {
  const [state, render, context] = useFluentProvider_unstable(props, ref);

  return render(state, context);
});

FluentProvider.displayName = 'FluentProvider';
