import * as React from 'react';
import { getIntrinsicElementProps, slot, useId } from '@fluentui/react-utilities';
import type { RatingDisplayProps, RatingDisplayState } from './RatingDisplay.types';
import { StarFilled, StarRegular } from '@fluentui/react-icons';
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
  const generatedName = useId('ratingDisplay-');
  const {
    color = 'neutral',
    compact = false,
    iconFilled = <StarFilled />,
    iconOutline = <StarRegular />,
    max = 5,
    name = generatedName,
    step = 1,
    size = 'medium',
    value = 3,
  } = props;

  const ratingId = useId('ratingLabel');
  const countId = useId('countLabel');

  //Prevents unnecessary rerendering of children
  const rootChildren = React.useMemo(() => {
    return compact ? (
      <RatingItem value={1} key={1} />
    ) : (
      Array.from(Array(max), (_, i) => <RatingItem value={i + 1} key={i + 1} />)
    );
  }, [compact, max]);

  const state: RatingDisplayState = {
    color,
    compact,
    iconFilled,
    iconOutline,
    name,
    step,
    size,
    value,
    components: {
      root: 'div',
      ratingDisplayLabel: 'label',
      ratingDisplayCountLabel: 'label',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        children: rootChildren,
        ...props,
      }),
      { elementType: 'div' },
    ),
    ratingDisplayLabel: slot.always(props.ratingDisplayLabel, {
      defaultProps: { id: ratingId, children: value },
      elementType: 'label',
    }),
    ratingDisplayCountLabel: slot.optional(props.ratingDisplayCountLabel, {
      defaultProps: { id: countId },
      elementType: 'label',
    }),
  };
  return state;
};
