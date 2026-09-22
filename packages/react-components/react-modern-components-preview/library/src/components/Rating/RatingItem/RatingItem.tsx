'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { RatingItemProps } from './RatingItem.types';
import { renderRatingItem } from './renderRatingItem';
import { useRatingItem } from './useRatingItem';
import { useRatingItemStyles } from './useRatingItemStyles.styles';

export const RatingItem: ForwardRefComponent<RatingItemProps> = React.forwardRef((props, ref) => {
  const state = useRatingItem(props, ref);
  state.root['data-appearance'] =
    state.iconFillWidth === 1 ? 'filled' : state.iconFillWidth > 0 ? 'filled-half' : 'outline';
  useRatingItemStyles(state);

  return renderRatingItem(state);
});

RatingItem.displayName = 'RatingItem';
