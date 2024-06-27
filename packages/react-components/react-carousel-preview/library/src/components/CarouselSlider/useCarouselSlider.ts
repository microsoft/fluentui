import * as React from 'react';
import { getIntrinsicElementProps, slot, useMergedRefs } from '@fluentui/react-utilities';
import type { CarouselSliderProps, CarouselSliderState } from './CarouselSlider.types';
import { useCarouselStore_unstable } from '../useCarouselStore';
import { useResizeObserverRef } from '../../utils/useResizeObserver';

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
  const animating = React.useRef<boolean>(false);
  const interruptedAnimation = React.useRef<boolean>(false);
  const cleanupRef = React.useRef<() => void>(() => undefined);
  const containerWidthRef = React.useRef<number>(0);

  const containerRef = useResizeObserverRef<HTMLDivElement>(([container]) => {
    containerWidthRef.current = container.contentRect.width;
  });

  const numCards: number = useCarouselStore_unstable(snapshot => {
    return snapshot.values.length;
  });

  const currentIndex: number = useCarouselStore_unstable(snapshot => {
    if (!snapshot.activeValue) {
      return 0;
    }
    return snapshot.values.indexOf(snapshot.activeValue);
  });

  const loopCount: number = useCarouselStore_unstable(snapshot => {
    if (!snapshot.loopCount) {
      return 0;
    }
    return snapshot.loopCount;
  });

  const animationRef = React.useCallback((el: HTMLDivElement | null) => {
    if (!el) {
      return;
    }

    const onAnimationStart = () => {
      if (animating.current) {
        interruptedAnimation.current = true;
      }
      animating.current = true;
    };

    const onAnimationEnd = () => {
      animating.current = false;
      interruptedAnimation.current = false;
    };

    el.addEventListener('animationstart', onAnimationStart);
    el.addEventListener('animationend', onAnimationEnd);

    cleanupRef.current = () => {
      el.removeEventListener('animationstart', onAnimationStart);
      el.removeEventListener('animationend', onAnimationEnd);
    };
  }, []);

  const mergedRef = useMergedRefs(ref, animationRef);
  const container = slot.always(props.container, {
    defaultProps: {
      role: 'presentation',
    },
    elementType: 'div',
  });
  const containerMergedRefs = useMergedRefs<HTMLDivElement>(containerRef, container.ref);
  container.ref = containerMergedRefs;

  return {
    cardWidth,
    currentIndex,
    loopCount,
    numCards,
    interruptedAnimation: interruptedAnimation.current,
    containerWidth: containerWidthRef.current,
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
        ref: mergedRef,
        ...props,
      }),
      { elementType: 'div' },
    ),
    container,
  };
};
