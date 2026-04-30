'use client';

import * as React from 'react';
import { useRatingDisplayBase_unstable } from '@fluentui/react-rating';

import { RatingItem } from '../Rating';
import type { RatingDisplayProps, RatingDisplayState } from './RatingDisplay.types';

/**
 * Returns the state for a RatingDisplay component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderRatingDisplay`.
 */
export const useRatingDisplay = (props: RatingDisplayProps, ref: React.Ref<HTMLDivElement>): RatingDisplayState => {
  'use no memo';

  const state = useRatingDisplayBase_unstable(
    {
      icon: 'span',
      ...props,
    },
    ref,
  );

  const { compact, max } = state;

  const rootChildren = React.useMemo(() => {
    return compact ? (
      <RatingItem value={1} key={1} aria-hidden={true} />
    ) : (
      Array.from(Array(max), (_, i) => <RatingItem value={i + 1} key={i + 1} aria-hidden={true} />)
    );
  }, [compact, max]);

  state.root.children ??= rootChildren;

  return state;
};
