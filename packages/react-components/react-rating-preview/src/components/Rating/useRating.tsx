import * as React from 'react';
import {
  getNativeElementProps,
  isHTMLElement,
  mergeCallbacks,
  slot,
  useControllableState,
  useEventCallback,
  useId,
} from '@fluentui/react-utilities';
import type { RatingProps, RatingState } from './Rating.types';
import { Label } from '../../../../react-label/src/Label';
import { RatingItem } from '../../RatingItem';

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
  const generatedName = useId('rating-');
  const {
    disabled,
    name = generatedName,
    precision,
    readOnly,
    shape = 'star',
    size = 'medium',
    max = 5,
    onChange,
  } = props;

  const [value, setValue] = useControllableState({
    state: props.value,
    defaultState: props.defaultValue,
    initialState: 0,
  });

  const [hoveredValue, setHoveredValue] = React.useState<number | undefined>(undefined);

  const isRatingRadioItem = (target: EventTarget): target is HTMLInputElement =>
    isHTMLElement(target, { constructorName: 'HTMLInputElement' }) && target.type === 'radio' && target.name === name;

  const state: RatingState = {
    disabled,
    name,
    precision,
    readOnly,
    shape,
    size,
    value,
    hoveredValue,
    components: {
      root: 'div',
      ratingLabel: Label,
      countLabel: Label,
    },
    root: slot.always(
      getNativeElementProps('div', {
        ref,
        children: Array.from(Array(max), (_, i) => <RatingItem value={i + 1} key={i + 1} />),
        ...props,
      }),
      { elementType: 'div' },
    ),
  };

  if (!readOnly) {
    state.root.onChange = useEventCallback(ev => {
      if (isRatingRadioItem(ev.target)) {
        const newValue = parseInt(ev.target.value);
        if (!isNaN(newValue)) {
          setValue(newValue);
          onChange?.(ev, { value: newValue });
        }
      }
    });
    state.root.onMouseEnter = mergeCallbacks(props.onMouseEnter, ev => {
      if (isRatingRadioItem(ev.target)) {
        const newValue = parseInt(ev.target.value);
        if (!isNaN(newValue)) {
          setHoveredValue(newValue);
        }
      }
    });
    state.root.onMouseLeave = mergeCallbacks(props.onMouseLeave, ev => {
      if (isRatingRadioItem(ev.target)) {
        setHoveredValue(undefined);
      }
    });
  }

  return state;
};
