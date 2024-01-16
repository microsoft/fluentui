/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { RatingDisplayState, RatingDisplaySlots, RatingDisplayContextValues } from './RatingDisplay.types';
import { RatingDisplayProvider } from '../../contexts/RatingDisplayContext';

/**
 * Render the final JSX of RatingDisplay
 */
export const renderRatingDisplay_unstable = (state: RatingDisplayState, contextValues: RatingDisplayContextValues) => {
  assertSlots<RatingDisplaySlots>(state);

  return (
    <RatingDisplayProvider value={contextValues.ratingDisplay}>
      <state.root>
        {state.root.children}
        {state.ratingDisplayLabel && <state.ratingDisplayLabel />}
        {state.ratingDisplayCountLabel && <state.ratingDisplayCountLabel />}
      </state.root>
    </RatingDisplayProvider>
  );
};
