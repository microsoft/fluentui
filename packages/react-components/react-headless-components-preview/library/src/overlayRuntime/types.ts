import type * as React from 'react';

export type WithFallbackBehavior<TState> = TState & {
  fallbackBehavior?: React.ReactElement;
};
