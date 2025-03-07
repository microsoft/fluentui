/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { EmptyStateSlots, EmptyStateState } from './EmptyState.types';

/**
 * Render the final JSX of EmptyState
 */
export const renderEmptyState_unstable = (state: EmptyStateState) => {
  assertSlots<EmptyStateSlots>(state);

  return <state.root>{state.header && <state.header />}</state.root>;
};
