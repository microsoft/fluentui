import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { CarouselSliderProps, CarouselSliderState } from './CarouselSlider.types';
import { useCarouselStore_unstable } from '../useCarouselStore';

/**
 * Create the state required to render CarouselSlider.
 *
 * The returned state can be modified with hooks such as useCarouselSliderStyles_unstable,
 * before being passed to renderCarouselSlider_unstable.
 *
 * @param props - props from this instance of CarouselSlider
 * @param ref - reference to root HTMLDivElement of CarouselSlider
 */
export const useCarouselSlider_unstable = (
  props: CarouselSliderProps,
  ref: React.Ref<HTMLDivElement>,
): CarouselSliderState => {
  const { cardWidth = '100%' } = props;

  const numCards: number = useCarouselStore_unstable(snapshot => {
    return snapshot.values.length;
  });

  return {
    cardWidth,
    numCards,
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
      container: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
    container: slot.always(props.container, {
      defaultProps: {
        role: 'presentation',
      },
      elementType: 'div',
    }),
  };
};
