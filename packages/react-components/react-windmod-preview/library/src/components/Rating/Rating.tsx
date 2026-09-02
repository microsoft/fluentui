'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderRating, useRating, useRatingContextValues } from '@fluentui/react-headless-components-preview/rating';
import { StarFilled, StarRegular } from '@fluentui/react-icons/headless/svg/star';

import { RatingItem } from '../RatingItem';
import { RatingItemContextProvider } from '../RatingItem/RatingItemContext';
import type { RatingProps } from './Rating.types';
import { useRatingStyles } from './useRatingStyles';

/**
 * A Rating collects a star rating. Windmod Rating: the headless rating decorated with the Fluent
 * visual contract (Tailwind v4 + CSS Modules).
 */
export const Rating: ForwardRefComponent<RatingProps> = React.forwardRef(
  // The headless surface defaults both glyphs to a bare span so it needs no icon dependency;
  // windmod restores the Fluent defaults alongside the look props the headless hook never accepts.
  (
    { color = 'neutral', iconFilled = StarFilled, iconOutline = StarRegular, max = 5, size = 'extra-large', ...rest },
    ref,
  ) => {
    // The headless hook supplies no children at all, so the items exist only if windmod builds
    // them; a consumer's own children still win. `max` is not forwarded — the hook never reads it.
    const children = React.useMemo(
      () => Array.from(Array(max), (_, index) => <RatingItem key={index + 1} value={index + 1} />),
      [max],
    );

    const styled = useRatingStyles({
      ...useRating({ children, iconFilled, iconOutline, ...rest }, ref as React.Ref<HTMLDivElement>),
      color,
      size,
    });
    const contextValues = useRatingContextValues(styled);
    const itemContext = React.useMemo(() => ({ color, size }), [color, size]);

    return (
      <RatingItemContextProvider value={itemContext}>{renderRating(styled, contextValues)}</RatingItemContextProvider>
    );
  },
);

Rating.displayName = 'Rating';
