/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { RatingDisplayState, RatingDisplaySlots } from './RatingDisplay.types';

/**
 * Render the final JSX of RatingDisplay
 */
export const renderRatingDisplay_unstable = (state: RatingDisplayState) => {
  assertSlots<RatingDisplaySlots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root />;
};
