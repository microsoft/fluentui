import * as React from 'react';
import { getIntrinsicElementProps, slot, useId } from '@fluentui/react-utilities';
import type { RatingDisplayProps, RatingDisplayState } from './RatingDisplay.types';
import { StarFilled } from '@fluentui/react-icons';
import { RatingItem } from '../RatingItem/RatingItem';

/**
 * Create the state required to render RatingDisplay.
 *
 * The returned state can be modified with hooks such as useRatingDisplayStyles_unstable,
 * before being passed to renderRatingDisplay_unstable.
 *
 * @param props - props from this instance of RatingDisplay
 * @param ref - reference to root HTMLDivElement of RatingDisplay
 */
export const useRatingDisplay_unstable = (
  props: RatingDisplayProps,
  ref: React.Ref<HTMLDivElement>,
): RatingDisplayState => {
  const { color = 'neutral', count, compact = false, icon = StarFilled, max = 5, size = 'medium', value } = props;

  const valueTextId = useId('rating-value-');
  const countTextId = useId('rating-count-');

  // Generate the child RatingItems and memoize them to prevent unnecessary re-rendering
  const rootChildren = React.useMemo(() => {
    return compact ? (
      <RatingItem value={1} key={1} aria-hidden={true} />
    ) : (
      Array.from(Array(max), (_, i) => <RatingItem value={i + 1} key={i + 1} aria-hidden={true} />)
    );
  }, [compact, max]);

  const state: RatingDisplayState = {
    color,
    compact,
    icon,
    max,
    size,
    value,
    components: {
      root: 'div',
      valueText: 'span',
      countText: 'span',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        children: rootChildren,
        role: 'img',
        ...props,
      }),
      { elementType: 'div' },
    ),
    valueText: slot.optional(props.valueText, {
      renderByDefault: value !== undefined,
      defaultProps: { children: value, id: valueTextId, 'aria-hidden': true },
      elementType: 'span',
    }),
    countText: slot.optional(props.countText, {
      renderByDefault: count !== undefined,
      defaultProps: { children: count?.toLocaleString(), id: countTextId, 'aria-hidden': true },
      elementType: 'span',
    }),
  };
  if (!state.root['aria-label'] && !state.root['aria-labelledby']) {
    state.root['aria-labelledby'] = [state.valueText?.id, state.countText?.id].filter(Boolean).join(' ');
  }
  return state;
};
