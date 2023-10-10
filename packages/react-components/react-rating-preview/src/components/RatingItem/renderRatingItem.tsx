/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { RatingItemState, RatingItemSlots } from './RatingItem.types';

/**
 * Render the final JSX of RatingItem
 */
export const renderRatingItem_unstable = (state: RatingItemState) => {
  assertSlots<RatingItemSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root />;
};
