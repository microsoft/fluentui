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
import type { CarouselCardState } from './CarouselCard.types';

import styles from './CarouselCard.module.css';

/**
 * Public identity class for CarouselCard.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5).
 *
 * This constant is also consumed as a live SELECTOR by `components/useEmblaCarousel.ts`
 * (embla's `slides` option). `'.' + carouselCardClassNames.root` is invalid — the `/`
 * terminates the class name — so that call site uses `fuiSelector(...)` from
 * `@fluentui/react-utilities` (D16.5), and so must any consumer doing the same.
 *
 * It is deliberately NOT the seed of the card's `id` any more: `useCarouselCard.ts` keeps a
 * private `fui-CarouselCard` prefix for `useId`, so rendered ids are unchanged and never
 * contain a `/`. See the note there.
 */
export const carouselCardClassNames: { root: string } = {
  root: 'group/fui-carousel-card',
};

/**
 * Apply styling to the CarouselCard slots based on the state
 */
export const useCarouselCardStyles_unstable = (state: CarouselCardState): CarouselCardState => {
  const { autoSize } = state;
  const appearance = useCarouselContext(context => context.appearance);

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state = {
    ...state,
    root: {
      ...state.root,
      className: clsx(
        styles.root,
        carouselCardClassNames.root,
        appearance === 'elevated' && styles.elevated,
        autoSize && styles['auto-size'],
        state.root.className,
      ),
    },
  };

  return state;
};
