import * as React from 'react';
import { assertSlots } from '@fluentui/react-utilities';
import type { EmptyStateSlots, EmptyStateState } from './EmptyState.types';

export const renderEmptyState = (state: EmptyStateState) => {
  assertSlots<EmptyStateSlots>(state);
  return <state.root>{state.title && <state.title />}</state.root>;
};
