'use client';

import * as React from 'react';
import { StarFilled, StarRegular } from '@fluentui/react-icons';
import { useRating as useRatingBase } from '@fluentui/react-headless-components-preview/rating';
import { RatingItem } from '../RatingItem/RatingItem';
import type { RatingProps, RatingState } from './Rating.types';

export const useRating = (props: RatingProps, ref: React.Ref<HTMLDivElement>): RatingState => {
  const {
    color = 'neutral',
    size = 'extra-large',
    iconFilled = StarFilled,
    iconOutline = StarRegular,
    max = 5,
    children,
    ...rest
  } = props;
  const state = useRatingBase({ ...rest, iconFilled, iconOutline, children: children ?? null }, ref);

  const defaultChildren = React.useMemo(
    () => Array.from({ length: max }, (_, index) => <RatingItem value={index + 1} key={index + 1} />),
    [max],
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
