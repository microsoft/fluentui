import * as React from 'react';
import { getIntrinsicElementProps, slot, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
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

  const isFirstMount = React.useRef(true);
  const [isMotionVisible, setIsMotionVisible] = React.useState(false);

  const navDirection = useCarouselStore_unstable(snapshot => snapshot.navDirection);
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

  useIsomorphicLayoutEffect(() => {
    if (!visible && !isFirstMount.current) {
      setIsMotionVisible(true);
    }
    isFirstMount.current = false;
    // We only want to fire this when visible becomes true (not on first mount)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  // Pass in some useful animation render states
  const lastDir = React.useRef<'next' | 'prev' | null | undefined>(null);
  const directionChanged = lastDir.current !== navDirection;
  lastDir.current = navDirection;

  const lastPeeking = React.useRef<boolean>(visible);
  const wasVisible = lastPeeking.current;
  lastPeeking.current = visible;

  const state: CarouselCardState = {
    value,
    visible,
    peekDir,
    peeking,
    navDirection,
    directionChanged,
    wasVisible,
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        [CAROUSEL_ITEM]: value,
        [CAROUSEL_ACTIVE_ITEM]: visible,
        hidden: !visible && !peekDir && !isMotionVisible,
        'aria-hidden': !visible,
        inert: !visible,
        role: 'presentation',
        ...props,
      }),
      { elementType: 'div' },
    ),
    onAnimationEnd: () => {
      setIsMotionVisible(false);
    },
  };

  if (!visible && !peekDir && !isMotionVisible) {
    state.root.children = null;
  }

  return state;
};
