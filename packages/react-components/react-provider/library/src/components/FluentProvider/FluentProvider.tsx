import * as React from 'react';
import { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderFluentProvider_unstable } from './renderFluentProvider';
import { useFluentProvider_unstable } from './useFluentProvider';
import { useFluentProviderStyles_unstable } from './useFluentProviderStyles.styles';
import { useFluentProviderContextValues_unstable } from './useFluentProviderContextValues';
import type { FluentProviderProps } from './FluentProvider.types';

export const FluentProvider: ForwardRefComponent<FluentProviderProps> = React.forwardRef<
  HTMLElement,
  FluentProviderProps
>((props, ref) => {
  const state = useFluentProvider_unstable(props, ref);
  useFluentProviderStyles_unstable(state);

  const contextValues = useFluentProviderContextValues_unstable(state);

  return renderFluentProvider_unstable(state, contextValues);
}) as ForwardRefComponent<FluentProviderProps>;

FluentProvider.displayName = 'FluentProvider';
