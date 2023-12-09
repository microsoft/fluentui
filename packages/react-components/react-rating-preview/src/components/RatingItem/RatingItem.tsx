import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useRatingItem_unstable } from './useRatingItem';
import { renderRatingItem_unstable } from './renderRatingItem';
import { useRatingItemStyles_unstable } from './useRatingItemStyles.styles';
import type { RatingItemProps } from './RatingItem.types';

/**
 * RatingItem component - TODO: add more docs
 */
export const RatingItem: ForwardRefComponent<RatingItemProps> = React.forwardRef((props, ref) => {
  const state = useRatingItem_unstable(props, ref);

  useRatingItemStyles_unstable(state);
  return renderRatingItem_unstable(state);
});

RatingItem.displayName = 'RatingItem';
