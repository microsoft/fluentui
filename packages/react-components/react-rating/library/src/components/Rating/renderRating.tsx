/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { RatingState, RatingSlots, RatingContextValues } from './Rating.types';
import { RatingItemProvider } from '../../contexts/RatingItemContext';

/**
 * Render the final JSX of Rating
 */
export const renderRating_unstable = (state: RatingState, contextValues: RatingContextValues) => {
  assertSlots<RatingSlots>(state);

  return (
    <RatingItemProvider value={contextValues.ratingItem}>
      <state.root />
    </RatingItemProvider>
  );
};
