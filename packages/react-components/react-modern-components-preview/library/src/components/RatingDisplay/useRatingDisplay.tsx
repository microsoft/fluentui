'use client';

import * as React from 'react';
import { StarFilled } from '@fluentui/react-icons';
import { useRatingDisplay as useRatingDisplayBase } from '@fluentui/react-headless-components-preview/rating-display';
import { RatingItem } from '../Rating/RatingItem/RatingItem';
import type { RatingDisplayProps, RatingDisplayState } from './RatingDisplay.types';

export const useRatingDisplay = (props: RatingDisplayProps, ref: React.Ref<HTMLDivElement>): RatingDisplayState => {
  const { color = 'neutral', size = 'medium', icon = StarFilled, compact = false, max = 5, children, ...rest } = props;
  const state = useRatingDisplayBase({ ...rest, icon, compact, max, children }, ref);

  const defaultChildren = React.useMemo(
    () =>
      compact ? (
        <RatingItem value={1} key={1} aria-hidden />
      ) : (
        Array.from({ length: max }, (_, index) => <RatingItem value={index + 1} key={index + 1} aria-hidden />)
      ),
    [compact, max],
  );

  return {
    ...state,
    color,
    size,
    root: {
      ...state.root,
      children: children ?? defaultChildren,
      'data-color': color,
      'data-size': size,
    },
  };
};
