/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { RatingState, RatingSlots } from './Rating.types';
import { RatingContextValues, RatingProvider } from '../../index';

/**
 * Render the final JSX of Rating
 */
export const renderRating_unstable = (state: RatingState, contextValues: RatingContextValues) => {
  assertSlots<RatingSlots>(state);
  const value = { interactive: true, ...contextValues.rating };

  return (
    <RatingProvider value={value}>
      <state.root />
    </RatingProvider>
  );
};
