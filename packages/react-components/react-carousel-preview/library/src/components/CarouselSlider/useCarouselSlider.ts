import * as React from 'react';
import { getIntrinsicElementProps, slot, useMergedRefs } from '@fluentui/react-utilities';
import type { CarouselSliderProps, CarouselSliderState } from './CarouselSlider.types';
import { useCarouselStore_unstable } from '../useCarouselStore';
import { useCarouselContext_unstable } from '../CarouselContext';
import { sliderAnimationDelayToken } from './useCarouselSliderStyles.styles';
import { tokens } from '@fluentui/react-theme';

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
  const animating = React.useRef<boolean>(false);
  const carouselSliderRef = React.useRef<HTMLDivElement>(null);
  const { cardWidth } = useCarouselContext_unstable();

  const numCards: number = useCarouselStore_unstable(snapshot => {
    return snapshot.values.length;
  });

  const currentIndex: number = useCarouselStore_unstable(snapshot =>
    snapshot.activeValue === null ? 0 : snapshot.values.indexOf(snapshot.activeValue),
  );

  const loopCount: number = useCarouselStore_unstable(snapshot => snapshot.loopCount);

  const animationRef = React.useMemo<React.Ref<HTMLDivElement>>(() => {
    const onAnimationStart = (ev: AnimationEvent) => {
      const el = ev.currentTarget as HTMLDivElement;
      if (animating.current) {
        el.style.setProperty(sliderAnimationDelayToken, tokens.durationFast);
      }
      animating.current = true;
    };
    const onAnimationEnd = (ev: AnimationEvent) => {
      const el = ev.currentTarget as HTMLDivElement;
      el.style.setProperty(sliderAnimationDelayToken, '0');
      animating.current = false;
    };
    let currentEl: HTMLDivElement | null = null;
    return {
      set current(newEl: HTMLDivElement | null) {
        if (currentEl) {
          currentEl.removeEventListener('animationstart', onAnimationStart);
          currentEl.removeEventListener('animationend', onAnimationEnd);
        }
        if (newEl) {
          currentEl = newEl;
          newEl.addEventListener('animationstart', onAnimationStart);
          newEl.addEventListener('animationend', onAnimationEnd);
        }
      },
    };
  }, []);

  const slider = slot.always(props.slider, {
    defaultProps: {
      role: 'presentation',
    },
    elementType: 'div',
  });
  const sliderMergedRefs = useMergedRefs<HTMLDivElement>(animationRef, slider.ref);
  slider.ref = sliderMergedRefs;

  const windowMergedRefs = useMergedRefs<HTMLDivElement>(carouselSliderRef, ref);

  return {
    cardWidth,
    currentIndex,
    loopCount,
    numCards,
    carouselSliderRef,
    components: {
      root: 'div',
      slider: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: windowMergedRefs,
        ...props,
      }),
      { elementType: 'div' },
    ),
    slider,
  };
};
