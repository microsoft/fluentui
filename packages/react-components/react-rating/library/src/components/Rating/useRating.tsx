'use client';

import * as React from 'react';
import {
  getIntrinsicElementProps,
  isHTMLElement,
  mergeCallbacks,
  slot,
  useControllableState,
  useId,
} from '@fluentui/react-utilities';
import type { RatingBaseProps, RatingBaseState, RatingProps, RatingState } from './Rating.types';
import { RatingItem } from '../../RatingItem';
import { StarFilled, StarRegular } from '@fluentui/react-icons';

/**
 * Create the state required to render Rating.
 *
 * The returned state can be modified with hooks such as useRatingStyles_unstable,
 * before being passed to renderRating_unstable.
 *
 * @param props - props from this instance of Rating
 * @param ref - reference to root HTMLElement of Rating
 */
export const useRating_unstable = (props: RatingProps, ref: React.Ref<HTMLDivElement>): RatingState => {
  const { color = 'neutral', size = 'extra-large', ...baseProps } = props;
  const state = useRatingBase_unstable(baseProps, ref);

  return {
    ...state,
    color,
    size,
  };
};

/**
 * Base hook for Rating component. Manages state related to controlled/uncontrolled
 * rating value, hover state, radiogroup ARIA role, and keyboard/mouse interaction —
 * without design props (color, size).
 *
 * @param props - props from this instance of Rating (without color, size)
 * @param ref - reference to root HTMLElement of Rating
 */
export const useRatingBase_unstable = (props: RatingBaseProps, ref: React.Ref<HTMLDivElement>): RatingBaseState => {
  const generatedName = useId('rating-');
  const {
    iconFilled = StarFilled,
    iconOutline = StarRegular,
    max = 5,
    name = generatedName,
    onChange,
    step = 1,
    itemLabel,
  } = props;

  const [value, setValue] = useControllableState({
    state: props.value,
    defaultState: props.defaultValue,
    initialState: 0,
  });

  const isRatingRadioItem = (target: EventTarget): target is HTMLInputElement =>
    isHTMLElement(target, { constructorName: 'HTMLInputElement' }) && target.type === 'radio' && target.name === name;

  const [hoveredValue, setHoveredValue] = React.useState<number | undefined>(undefined);

  // Generate the child RatingItems and memoize them to prevent unnecessary re-rendering
  const rootChildren = React.useMemo(() => {
    return Array.from(Array(max), (_, i) => <RatingItem value={i + 1} key={i + 1} />);
  }, [max]);

  const state: RatingBaseState = {
    iconFilled,
    iconOutline,
    name,
    step,
    itemLabel,
    value,
    hoveredValue,
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps(
        'div',
        {
          ref,
          children: rootChildren,
          role: 'radiogroup',
          ...props,
        },
        ['onChange'],
      ),
      { elementType: 'div' },
    ),
  };

  state.root.onChange = ev => {
    if (isRatingRadioItem(ev.target)) {
      const newValue = parseFloat(ev.target.value);
      if (!isNaN(newValue)) {
        setValue(newValue);
        onChange?.(ev, { type: 'change', event: ev, value: newValue });
      }
    }
  };
  state.root.onMouseOver = mergeCallbacks(props.onMouseOver, ev => {
    if (isRatingRadioItem(ev.target)) {
      const newValue = parseFloat(ev.target.value);
      if (!isNaN(newValue)) {
        setHoveredValue(newValue);
      }
    }
  });
  state.root.onMouseLeave = mergeCallbacks(props.onMouseLeave, ev => {
    setHoveredValue(undefined);
  });

  return state;
};
