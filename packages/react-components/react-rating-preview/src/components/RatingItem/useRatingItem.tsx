import * as React from 'react';
import { getNativeElementProps, slot } from '@fluentui/react-utilities';
import type { RatingItemProps, RatingItemState } from './RatingItem.types';
import { useRatingContextValue_unstable } from '../../contexts/RatingContext';
import { StarRegular, StarFilled, StarHalfRegular } from '@fluentui/react-icons';

/**
 * Create the state required to render RatingItem.
 *
 * The returned state can be modified with hooks such as useRatingItemStyles_unstable,
 * before being passed to renderRatingItem_unstable.
 *
 * @param props - props from this instance of RatingItem
 * @param ref - reference to root HTMLElement of RatingItem
 */
export const useRatingItem_unstable = (props: RatingItemProps, ref: React.Ref<HTMLInputElement>): RatingItemState => {
  const rating = useRatingContextValue_unstable();
  const { value = 0 } = props;

  const root = slot.always(getNativeElementProps('div', { ref, ...props }), {
    elementType: 'div',
  });

  const ratingValue = rating.value || 0;
  const displayedRatingValue = rating.hoveredValue !== undefined ? rating.hoveredValue : ratingValue;

  let icon;
  if (displayedRatingValue >= value) {
    icon = <StarFilled />;
  } else if (displayedRatingValue >= value - 0.5) {
    icon = <StarHalfRegular />;
  } else {
    icon = <StarRegular />;
  }
  const indicator = slot.always(props.indicator, {
    defaultProps: {
      children: icon,
    },
    elementType: 'span',
  });

  let halfValueInput;
  if (!rating.readOnly && rating.precision) {
    halfValueInput = slot.optional(props.halfValueInput, {
      defaultProps: {
        type: 'radio',
        name: rating.name,
        value: value - 0.5,
        checked: ratingValue >= value - 0.5,
      },
      elementType: 'input',
    });
  }

  let fullValueInput;
  if (!rating.readOnly) {
    fullValueInput = slot.optional(props.fullValueInput, {
      defaultProps: {
        type: 'radio',
        name: rating.name,
        value,
        checked: ratingValue >= value,
      },

      elementType: 'input',
    });
  }

  return {
    value,
    components: {
      root: 'div',
      indicator: 'span',
      halfValueInput: 'input',
      fullValueInput: 'input',
    },
    root,
    indicator,
    halfValueInput,
    fullValueInput,
  };
};
