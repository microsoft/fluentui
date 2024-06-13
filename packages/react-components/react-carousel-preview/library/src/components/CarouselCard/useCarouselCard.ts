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
  const peekDir: 'prev' | 'next' | undefined = useCarouselStore_unstable(snapshot => {
    if (!peeking) {
      return;
    }

    const currentIndex = snapshot.activeValue ? snapshot.values.indexOf(snapshot.activeValue) : null;

    if (currentIndex !== null && currentIndex >= 0) {
      let nextValue = currentIndex + 1 < snapshot.values.length ? snapshot.values[currentIndex + 1] : null;
      let prevValue = currentIndex - 1 >= 0 ? snapshot.values[currentIndex - 1] : null;

      if (!nextValue && circular) {
        nextValue = snapshot.values[0];
      }

      if (!prevValue && circular) {
        prevValue = snapshot.values[snapshot.values.length - 1];
      }

      if (nextValue === value || prevValue === value) {
        return nextValue === value ? 'next' : 'prev';
      }
    }
  });

  const state: CarouselCardState = {
    value,
    visible,
    peekDir,
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        [CAROUSEL_ITEM]: value,
        [CAROUSEL_ACTIVE_ITEM]: visible,
        hidden: !visible && !peekDir,
        'aria-hidden': !visible,
        inert: !visible,
        role: 'presentation',
        ...props,
      }),
      { elementType: 'div' },
    ),
  };

  if (!visible && !peekDir) {
    state.root.children = null;
  }

  return state;
};
