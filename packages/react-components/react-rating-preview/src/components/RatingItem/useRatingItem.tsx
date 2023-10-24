import * as React from 'react';
import { getPartitionedNativeProps, slot } from '@fluentui/react-utilities';
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
export const useRatingItem_unstable = (props: RatingItemProps, ref: React.Ref<HTMLInputElement>): RatingItemState => {
  const context = useRatingContextValue_unstable();
  const { value = 0 } = props;

  const ratingValue = context.value || 0;

  const displayedRatingValue = context.hoveredValue !== undefined ? context.hoveredValue : ratingValue;

  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['defaultChecked', 'onChange'],
  });

  const root = slot.always(props.root, {
    defaultProps: { ref: useFocusWithin<HTMLSpanElement>(), ...nativeProps.root },
    elementType: 'span',
  });

  let icon;
  if (displayedRatingValue && displayedRatingValue >= value) {
    icon = <StarFilled />;
  } else if (displayedRatingValue && displayedRatingValue >= value - 0.5) {
    icon = <StarHalfRegular />;
  } else {
    icon = <StarRegular />;
  }
  const indicator = slot.always(props.indicator, {
    defaultProps: {
      children: icon,
    },
    elementType: 'div',
  });

  let halfValueInput;
  if (!context.readOnly && context.precision) {
    halfValueInput = slot.always(props.halfValueInput, {
      defaultProps: {
        type: 'radio',
        ref,
        name: context.name,
        value: value - 0.5,
        defaultChecked: ratingValue === value - 0.5,
      },
      elementType: 'input',
    });
  }

  let fullValueInput;
  if (!context.readOnly) {
    fullValueInput = slot.always(props.fullValueInput, {
      defaultProps: {
        type: 'radio',
        name: context.name,
        ref,
        value,
        defaultChecked: ratingValue === value,
        ...nativeProps.primary,
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
