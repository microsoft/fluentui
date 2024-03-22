/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { RatingItemState, RatingItemSlots } from './RatingItem.types';

/**
 * Render the final JSX of RatingItem
 */
export const renderRatingItem_unstable = (state: RatingItemState) => {
  assertSlots<RatingItemSlots>(state);

  return (
    <state.root>
      {state.halfValueInput && <state.halfValueInput />}
      {state.fullValueInput && <state.fullValueInput />}
      {state.unselectedIcon && <state.unselectedIcon />}
      {state.selectedIcon && <state.selectedIcon />}
    </state.root>
  );
};
