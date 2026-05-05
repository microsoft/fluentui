'use client';

import * as React from 'react';

import { renderProvider } from './renderProvider';
import { useProvider } from './useProvider';
import type { ProviderProps } from './Provider.types';
import { useProviderContextValues } from './useProviderContextValues';

/**
 * Renders required context providers for Fluent Headless Components.
 */
export const Provider = React.forwardRef<HTMLDivElement, ProviderProps>((props, ref) => {
  const state = useProvider(props, ref);
  const contextValues = useProviderContextValues(state);

  return renderProvider(state, contextValues);
});

Provider.displayName = 'Provider';
