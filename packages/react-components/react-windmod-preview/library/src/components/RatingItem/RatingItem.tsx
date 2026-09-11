'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderRatingItem, useRatingItem } from '@fluentui/react-headless-components-preview/rating';

import { mergeContextProps } from '../../utils/mergeContextProps';
import { useRatingItemContext } from './RatingItemContext';
import type { RatingItemProps } from './RatingItem.types';
import { useRatingItemStyles } from './useRatingItemStyles';

/**
 * A RatingItem is one star of a rating. Windmod RatingItem: the headless rating item decorated
 * with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const RatingItem: ForwardRefComponent<RatingItemProps> = React.forwardRef(
  // The context is read in the body, so the look props cannot default in the parameter list.
  (props, ref) => {
    const context = useRatingItemContext();
    const { color = 'neutral', size = 'medium', ...rest } = mergeContextProps(context, props);

    const state = useRatingItem(rest, ref as React.Ref<HTMLSpanElement>);
    const styled = useRatingItemStyles({
      ...state,
      color,
      size,
    });

    return renderRatingItem(styled);
  },
);

RatingItem.displayName = 'RatingItem';
