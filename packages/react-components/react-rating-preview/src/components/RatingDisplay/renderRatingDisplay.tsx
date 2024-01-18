/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { RatingDisplayState, RatingDisplaySlots } from './RatingDisplay.types';
import { RatingContextValues, RatingProvider } from '../../index';

/**
 * Render the final JSX of RatingDisplay
 */
export const renderRatingDisplay_unstable = (state: RatingDisplayState, contextValues: RatingContextValues) => {
  assertSlots<RatingDisplaySlots>(state);
  const value = { interactive: false, ...contextValues.rating };

  return (
    <RatingProvider value={value}>
      <state.root>
        {state.root.children}
        {state.valueText && <state.valueText />}
        {state.countText && <state.countText />}
      </state.root>
    </RatingProvider>
  );
};
