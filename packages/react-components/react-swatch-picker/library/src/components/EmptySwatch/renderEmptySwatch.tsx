/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { EmptySwatchState, EmptySwatchSlots } from './EmptySwatch.types';

/**
 * Render the final JSX of EmptySwatch
 */
export const renderEmptySwatch_unstable = (state: EmptySwatchState) => {
  assertSlots<EmptySwatchSlots>(state);

  return <state.root />;
};
