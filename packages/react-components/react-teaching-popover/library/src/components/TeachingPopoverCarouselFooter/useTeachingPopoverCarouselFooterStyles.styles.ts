import { clsx } from 'clsx';
import type { TeachingPopoverCarouselFooterState } from './TeachingPopoverCarouselFooter.types';

import styles from './TeachingPopoverCarouselFooter.module.css';

/**
 * TeachingPopoverCarouselFooter's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but terminates
 * it in selector position, so `'.' + teachingPopoverCarouselFooterClassNames.root` is invalid
 * CSS. Use `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5);
 * `element.classList.contains(...)` is token-taking and needs no escaping.
 */
export const teachingPopoverCarouselFooterClassNames: { root: string } = {
  root: 'group/fui-teaching-popover-carousel-footer',
};

/** Applies style classnames to slots */
export const useTeachingPopoverCarouselFooterStyles_unstable = (
  state: TeachingPopoverCarouselFooterState,
): TeachingPopoverCarouselFooterState => {
  const { layout } = state;

  // Module class FIRST, named group marker second, consumer className last (DECISIONS.md
  // D16.2). `styles.root` is unconditional, so index 0 is always the hashed, selector-safe
  // `fuicm-*` token — which is what keeps the marker off `classList[0]`, where nwsapi's
  // `:scope` polyfill would throw on its `/` under jsdom (D15.1).
  //
  // `layout` selects a module class rather than a `data-*` attribute: it picks between two
  // mutually exclusive looks on the very element this hook composes, and nothing reads it from
  // a selector (D3 / D15.6, resolved).
  //
  // Cascade priority is decided by the `@layer fui.*` order in
  // TeachingPopoverCarouselFooter.module.css — including the l2 half of `.right-aligned`,
  // which reaches into a react-button root — not by the order of these arguments.
  state.root.className = clsx(
    styles.root,
    teachingPopoverCarouselFooterClassNames.root,
    layout === 'centered' ? styles.centered : styles['right-aligned'],
    state.root.className,
  );

  // The `previous` / `next` assignments are GONE (D16.1 + cookbook, "A slot whose only library
  // token is the static"): the Griffel hook wrote nothing to either slot but
  // `fui-TeachingPopoverCarouselFooter__previous` / `__next`, so with the statics removed what
  // remained was `clsx(state.previous.className)` — an identity on the consumer's own string,
  // i.e. dead code implying this hook styles slots it does not. Both slots keep rendering and
  // are styled by `useTeachingPopoverCarouselFooterButtonStyles_unstable`; the
  // `if (state.previous)` guard went with the assignment it protected.

  return state;
};
