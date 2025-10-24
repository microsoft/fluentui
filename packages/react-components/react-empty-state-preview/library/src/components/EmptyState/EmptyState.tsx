import * as React from 'react';
import { useEmptyState } from './useEmptyState';
import { renderEmptyState } from './renderEmptyState';
import { EmptyStateProps } from './EmptyState.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

export const EmptyState: ForwardRefComponent<EmptyStateProps> = React.forwardRef((props, ref) => {
  const state = useEmptyState(props, ref);

  // useCustomStyleHook_unstable(props);
  return renderEmptyState(state);
});

EmptyState.displayName = 'EmptyState';
