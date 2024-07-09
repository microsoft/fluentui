import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { CarouselCardProps, CarouselCardState } from './CarouselCard.types';
import { CAROUSEL_ACTIVE_ITEM, CAROUSEL_ITEM } from '../constants';
import { useCarouselContext_unstable } from '../CarouselContext';
import { useCarouselStore_unstable } from '../useCarouselStore';

/**
 * Create the state required to render CarouselCard.
 *
 * The returned state can be modified with hooks such as useCarouselCardStyles_unstable,
 * before being passed to renderCarouselCard_unstable.
 *
 * @param props - props from this instance of CarouselCard
 * @param ref - reference to root HTMLDivElement of CarouselCard
 */
export const useCarouselCard_unstable = (
  props: CarouselCardProps,
  ref: React.Ref<HTMLDivElement>,
): CarouselCardState => {
  const { value } = props;
  const { circular, peeking } = useCarouselContext_unstable();

  const visible = useCarouselStore_unstable(snapshot => snapshot.activeValue === value);
  const bufferPosition: number | undefined = useCarouselStore_unstable(snapshot => {
    // if (!peeking) {
    //   return;
    // }

    const bufferSize = 2; // TODO: customize the value

    const afterBuffer = snapshot.values.slice(-bufferSize).reverse();
    const afterBufferIndex = afterBuffer.indexOf(value);

    if (afterBufferIndex !== -1) {
      return afterBufferIndex;
    }

    const beforeBuffer = snapshot.values.slice(0, bufferSize);
    const beforeBufferIndex = beforeBuffer.indexOf(value);

    if (beforeBufferIndex !== -1) {
      return 2 + beforeBufferIndex;
    }

    // const currentIndex = snapshot.activeValue ? snapshot.values.indexOf(snapshot.activeValue) : null;
    // // const offset = peeking ? 2 : 1;
    //
    // if (currentIndex !== null && currentIndex >= 0) {
    //   let nextValue = currentIndex + 1 < snapshot.values.length ? snapshot.values[currentIndex + 1] : null;
    //   let prevValue = currentIndex - 1 >= 0 ? snapshot.values[currentIndex - 1] : null;
    //
    //   if (!nextValue && circular) {
    //     nextValue = snapshot.values[0];
    //   }
    //
    //   if (!prevValue && circular) {
    //     prevValue = snapshot.values[snapshot.values.length - 1];
    //   }
    //
    //   if (nextValue === value || prevValue === value) {
    //     return nextValue === value ? 'next' : 'prev';
    //   }
    // }
  });

  // console.log('renderCard', { value, peekDir, isTrailing });

  const state: CarouselCardState = {
    value,
    visible,
    bufferPosition,
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        [CAROUSEL_ITEM]: value,
        [CAROUSEL_ACTIVE_ITEM]: visible,
        // hidden: !visible && !peekDir,
        'aria-hidden': !visible,
        inert: !visible,
        role: 'presentation',
        ...props,
      }),
      { elementType: 'div' },
    ),
  };

  return state;
};
