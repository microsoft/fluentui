import * as React from 'react';
import { getIntrinsicElementProps, slot, useMergedRefs } from '@fluentui/react-utilities';
import { useFocusWithin } from '@fluentui/react-tabster';
import type { RatingItemProps, RatingItemState } from './RatingItem.types';
import { useRatingItemContextValue_unstable } from '../../contexts/RatingItemContext';

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
  const context = useRatingItemContextValue_unstable();
  const { value = 0 } = props;
  const { itemLabel = num => num + '' } = context;

  const ratingValue = Math.round((context.value || 0) * 2) / 2; // round to the nearest 0.5

  const displayedRatingValue = context.hoveredValue ?? ratingValue;

  let iconFillWidth;
  if (context.compact || displayedRatingValue >= value) {
    iconFillWidth = 1;
  } else if (displayedRatingValue >= value - 0.5) {
    iconFillWidth = 0.5;
  } else {
    iconFillWidth = 0;
  }

  const root = slot.always(
    getIntrinsicElementProps('span', {
      ref: useMergedRefs(useFocusWithin<HTMLSpanElement>(), ref),
      ...props,
    }),
    { elementType: 'span' },
  );

  let unselectedOutlineIcon;
  // The unselectedOutlineIcon always needs to be rendered when unselected,
  // even for 'filled' appearance, since high contrast always shows an outline.
  if (iconFillWidth < 1) {
    unselectedOutlineIcon = slot.always(props.unselectedOutlineIcon, {
      defaultProps: {
        children: context.iconOutline,
        'aria-hidden': true,
      },
      elementType: 'div',
    });
  }

  let unselectedFilledIcon;
  if (iconFillWidth < 1 && !context.interactive) {
    unselectedFilledIcon = slot.always(props.unselectedFilledIcon, {
      defaultProps: {
        children: context.iconFilled,
        'aria-hidden': true,
      },
      elementType: 'div',
    });
  }

  let selectedIcon;
  if (iconFillWidth > 0) {
    selectedIcon = slot.always(props.selectedIcon, {
      defaultProps: {
        children: context.iconFilled,
        'aria-hidden': true,
      },
      elementType: 'div',
    });
  }

  let halfValueInput;
  if (context.interactive && context.step === 0.5) {
    halfValueInput = slot.always(props.halfValueInput, {
      defaultProps: {
        type: 'radio',
        name: context.name,
        value: value - 0.5,
        checked: ratingValue === value - 0.5,
        'aria-label': itemLabel(value - 0.5),
        onChange: () => {
          // This empty onChange handler silences an incorrect React warning about not using onChange for a controlled input.
          // The parent Rating component has the real onChange handler to listen to change events from this input.
        },
      },
      elementType: 'input',
    });
  }

  let fullValueInput;
  if (context.interactive) {
    fullValueInput = slot.always(props.fullValueInput, {
      defaultProps: {
        type: 'radio',
        name: context.name,
        value,
        checked: ratingValue === value,
        'aria-label': itemLabel(value),
        onChange: () => {
          // This empty onChange handler silences an incorrect React warning about not using onChange for a controlled input.
          // The parent Rating component has the real onChange handler to listen to change events from this input.
        },
      },

      elementType: 'input',
    });
  }

  const state: RatingItemState = {
    color: context.color,
    step: context.step,
    size: context.size,
    iconFillWidth,
    value,
    components: {
      root: 'span',
      selectedIcon: 'div',
      unselectedFilledIcon: 'div',
      unselectedOutlineIcon: 'div',
      halfValueInput: 'input',
      fullValueInput: 'input',
    },
    root,
    selectedIcon,
    unselectedFilledIcon,
    unselectedOutlineIcon,
    halfValueInput,
    fullValueInput,
  };

  return state;
};
