import * as React from 'react';
import {
  getIntrinsicElementProps,
  isHTMLElement,
  mergeCallbacks,
  slot,
  useControllableState,
  useId,
} from '@fluentui/react-utilities';
import type { RatingProps, RatingState } from './Rating.types';
import { Label } from '@fluentui/react-label';
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
    compact = false,
    countLabel = undefined,
    max = 5,
    name = generatedName,
    onChange,
    precision,
    readOnly,
    shape = 'star',
    size = 'medium',
    valueLabel = undefined,
  } = props;

  const ratingId = useId('ratingLabel');
  const countId = useId('countLabel');

  const [value, setValue] = useControllableState({
    state: props.value,
    defaultState: props.defaultValue,
    initialState: 0,
  });

  const [hoveredValue, setHoveredValue] = React.useState<number | undefined>(undefined);

  const isRatingRadioItem = (target: EventTarget): target is HTMLInputElement =>
    isHTMLElement(target, { constructorName: 'HTMLInputElement' }) && target.type === 'radio' && target.name === name;

  //Prevents unnecessary rerendering of children
  const rootChildren = React.useMemo(() => {
    return !compact ? (
      Array.from(Array(max), (_, i) => <RatingItem value={i + 1} key={i + 1} />)
    ) : (
      <RatingItem value={1} key={1} />
    );
  }, [compact, max]);

  const state: RatingState = {
    compact,
    countLabel,
    name,
    precision,
    readOnly,
    shape,
    size,
    value,
    valueLabel,
    hoveredValue,
    components: {
      root: 'div',
      ratingLabel: Label,
      ratingCountLabel: Label,
      divider: 'span',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        children: rootChildren,
        ...props,
      }),
      { elementType: 'div' },
    ),
    ratingLabel: slot.always(props.ratingLabel, {
      defaultProps: { id: ratingId, children: valueLabel },
      elementType: Label,
    }),
    ratingCountLabel: slot.always(props.countLabel, {
      defaultProps: { id: countId, children: countLabel },
      elementType: Label,
    }),
    divider: slot.optional(props.divider, {
      defaultProps: { children: '.' },
      elementType: 'span',
      renderByDefault: true,
    }),
  };

  if (!readOnly) {
    state.root.onChange = ev => {
      if (isRatingRadioItem(ev.target)) {
        const newValue = parseFloat(ev.target.value);
        if (!isNaN(newValue)) {
          setValue(newValue);
          onChange?.(ev, { value: newValue });
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
  }

  return state;
};
