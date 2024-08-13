/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { RatingDisplayState, RatingDisplaySlots, RatingDisplayContextValues } from './RatingDisplay.types';
import { RatingItemProvider } from '../../contexts/RatingItemContext';

/**
 * Render the final JSX of RatingDisplay
 */
export const renderRatingDisplay_unstable = (state: RatingDisplayState, contextValues: RatingDisplayContextValues) => {
  assertSlots<RatingDisplaySlots>(state);

  return (
    <RatingItemProvider value={contextValues.ratingItem}>
      <state.root>
        {state.root.children}
        {state.valueText && <state.valueText />}
        {state.countText && <state.countText />}
      </state.root>
    </RatingItemProvider>
  );
};
