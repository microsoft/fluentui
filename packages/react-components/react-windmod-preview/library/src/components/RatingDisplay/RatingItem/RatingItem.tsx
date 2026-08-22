'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderRatingItem, useRatingItem } from '@fluentui/react-headless-components-preview/rating';

import { useRatingItemContext } from '../RatingItemContext';
import type { RatingItemProps, RatingItemState } from './RatingItem.types';
import { useRatingItemStyles } from './useRatingItemStyles';

/**
 * A RatingItem is one star of a rating. Windmod RatingItem: the headless rating item decorated
 * with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const RatingItem: ForwardRefComponent<RatingItemProps> = React.forwardRef((props, ref) => {
  const { color: contextColor, size: contextSize } = useRatingItemContext();
  const { color = contextColor ?? 'neutral', size = contextSize ?? 'medium', ...rest } = props;

  const state: RatingItemState = {
    ...useRatingItem(rest, ref as React.Ref<HTMLSpanElement>),
    color,
    size,
  };

  return renderRatingItem(useRatingItemStyles(state));
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<RatingItemProps>;

RatingItem.displayName = 'RatingItem';
