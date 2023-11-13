import * as React from 'react';
import { getIntrinsicElementProps, slot, useMergedRefs } from '@fluentui/react-utilities';
import { useFocusWithin } from '@fluentui/react-tabster';
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
export const useRatingItem_unstable = (props: RatingItemProps, ref: React.Ref<HTMLSpanElement>): RatingItemState => {
  const context = useRatingContextValue_unstable();
  const { value = 0 } = props;

  const ratingValue = context.value || 0;

  const displayedRatingValue = context.hoveredValue ?? ratingValue;

  const root = slot.always(
    getIntrinsicElementProps('span', {
      ref: useMergedRefs(useFocusWithin<HTMLSpanElement>(), ref),
      ...props,
    }),
    { elementType: 'span' },
  );

  let icon;
  if (displayedRatingValue >= value || context.compact) {
    icon = <StarFilled />;
  } else if (displayedRatingValue >= value - 0.5) {
    icon = <StarHalfRegular />;
  } else {
    icon = <StarRegular />;
  }
  const indicator = slot.always(props.indicator, {
    defaultProps: {
      children: icon,
      'aria-hidden': true,
    },
    elementType: 'div',
  });

  let halfValueInput;
  if (!context.readOnly && context.precision && !context.compact) {
    halfValueInput = slot.always(props.halfValueInput, {
      defaultProps: {
        type: 'radio',
        name: context.name,
        value: value - 0.5,
        checked: ratingValue === value - 0.5,
        onChange: () => {
          // This empty onChange handler silences an incorrect React warning about not using onChange for a controlled input.
          // The parent Rating component has the real onChange handler to listen to change events from this input.
        },
      },
      elementType: 'input',
    });
  }

  let fullValueInput;
  if (!context.readOnly && !context.compact) {
    fullValueInput = slot.always(props.fullValueInput, {
      defaultProps: {
        type: 'radio',
        name: context.name,
        value,
        checked: ratingValue === value,
        onChange: () => {
          // This empty onChange handler silences an incorrect React warning about not using onChange for a controlled input.
          // The parent Rating component has the real onChange handler to listen to change events from this input.
        },
      },

      elementType: 'input',
    });
  }

  const state: RatingItemState = {
    precision: context.precision,
    size: context.size,
    value,
    components: {
      root: 'span',
      indicator: 'div',
      halfValueInput: 'input',
      fullValueInput: 'input',
    },
    root,
    indicator,
    halfValueInput,
    fullValueInput,
  };

  return state;
};
