import * as React from 'react';
import { useEmptyState_unstable } from './useEmptyState';
import { renderEmptyState_unstable } from './renderEmptyState';
import { EmptyStateProps } from './EmptyState.types';
import { useColorSliderStyles_unstable } from './useEmptyStateStyles.styles';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
// import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

export const EmptyState: ForwardRefComponent<EmptyStateProps> = React.forwardRef((props, ref) => {
  const state = useEmptyState_unstable(props, ref);

  useColorSliderStyles_unstable(state);
  // useCustomStyleHook_unstable(props);
  return renderEmptyState_unstable(state);
});

EmptyState.displayName = 'EmptyState';
