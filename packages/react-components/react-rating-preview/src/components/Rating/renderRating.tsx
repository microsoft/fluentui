/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { RatingState, RatingSlots } from './Rating.types';

/**
 * Render the final JSX of Rating
 */
export const renderRating_unstable = (state: RatingState) => {
  assertSlots<RatingSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root />;
};
