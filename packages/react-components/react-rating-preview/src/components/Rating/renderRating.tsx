/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { RatingState, RatingSlots, RatingContextValues } from './Rating.types';
import { RatingProvider } from '../../contexts/RatingContext';

/**
 * Render the final JSX of Rating
 */
export const renderRating_unstable = (state: RatingState, contextValues: RatingContextValues) => {
  assertSlots<RatingSlots>(state);

  return (
    <RatingProvider value={contextValues.rating}>
      <state.root>{state.root.children}</state.root>
    </RatingProvider>
  );
};
