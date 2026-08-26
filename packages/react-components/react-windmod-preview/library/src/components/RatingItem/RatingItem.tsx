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
    const { color = 'neutral', size = 'medium', ...rest } = mergeContextProps(useRatingItemContext(), props);

    return renderRatingItem(
      useRatingItemStyles({
        ...useRatingItem(rest, ref as React.Ref<HTMLSpanElement>),
        color,
        size,
      }),
    );
    // Casting is required due to lack of distributive union to support union on @types/react
  },
) as ForwardRefComponent<RatingItemProps>;

RatingItem.displayName = 'RatingItem';
