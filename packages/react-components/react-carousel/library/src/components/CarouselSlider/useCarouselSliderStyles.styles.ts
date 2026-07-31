'use client';

/*
 * NOTE on the directive above:
 * this file keeps `'use client'` because it still calls `useCarouselContext_unstable`, so
 * the directive is genuinely required and the rule does not flag it. (Adding a suppression
 * anyway would trip `--report-unused-disable-directives`.) Converted leaf hooks call nothing
 * and carry no directive at all.
 */

import { clsx } from 'clsx';

import { useCarouselContext_unstable as useCarouselContext } from '../CarouselContext';
import type { CarouselSliderState } from './CarouselSlider.types';

import styles from './CarouselSlider.module.css';

/**
 * Public identity class for CarouselSlider.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5).
 *
 * This constant is also consumed as a live SELECTOR by `components/useEmblaCarousel.ts`
 * (embla's `container` option). `'.' + carouselSliderClassNames.root` is invalid — the `/`
 * terminates the class name — so that call site uses `fuiSelector(...)` from
 * `@fluentui/react-utilities` (D16.5), and so must any consumer doing the same.
 */
export const carouselSliderClassNames: { root: string } = {
  root: 'group/fui-carousel-slider',
};

/**
 * Apply styling to the CarouselSlider slots based on the state
 */
export const useCarouselSliderStyles_unstable = (state: CarouselSliderState): CarouselSliderState => {
  const appearance = useCarouselContext(context => context.appearance);

  // Module class FIRST, then the named group marker — which must never be `classList[0]`
  // (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md D15.1/D16.2) — with
  // the consumer className last. `styles.root` is unconditional, so it is always the
  // selector-safe token at index 0 that the invariant requires.
  //
  // The marker literal here is what embla resolves at runtime (see the constant above), so
  // it must stay unconditional even if this component ever gains conditional classes.
  state = {
    ...state,
    root: {
      ...state.root,
      className: clsx(
        styles.root,
        'group/fui-carousel-slider',
        appearance === 'elevated' && styles.elevated,
        state.root.className,
      ),
    },
  };

  return state;
};
