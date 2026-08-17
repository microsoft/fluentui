'use client';

/*
 * NOTE on the directive above:
 * this file keeps `'use client'` because it still calls `useToggleButtonStyles_unstable`, so
 * the directive is genuinely required and the rule does not flag it. (Adding a suppression
 * anyway would trip `--report-unused-disable-directives`.) Converted leaf hooks in this
 * package call nothing and carry no directive at all.
 */

import { clsx } from 'clsx';
import { useToggleButtonStyles_unstable } from '@fluentui/react-button';

import type { CarouselAutoplayButtonState } from './CarouselAutoplayButton.types';

/*
 * `@fluentui/react-button` is imported ABOVE this module, deliberately — see the same note
 * in useCarouselButtonStyles.styles.ts. Import order is also stylesheet order; nothing here
 * depends on it, since every rule in the module is layered.
 */
import styles from './CarouselAutoplayButton.module.css';

/**
 * Public identity class for CarouselAutoplayButton.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5). The per-slot `icon` key was
 * removed (DECISIONS.md D16.1); it only ever carried a static class this hook no longer
 * applies, so nothing that used to match stops matching.
 *
 * `'.' + carouselAutoplayButtonClassNames.root` is an invalid SELECTOR (the `/` terminates
 * the class name); use `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5).
 */
export const carouselAutoplayButtonClassNames: { root: string } = {
  root: 'group/fui-carousel-autoplay-button',
};

/**
 * Apply styling to the CarouselAutoplayButton slots based on the state
 */
export const useCarouselAutoplayButtonStyles_unstable = (
  state: CarouselAutoplayButtonState,
): CarouselAutoplayButtonState => {
  const { appearance, checked, disabled, disabledFocusable } = state;

  /*
   * The exact set of configurations in which a LATER mergeClasses argument used to delete
   * this component's colour atomics, reproduced as PER-PROPERTY JS gates because the
   * overriding classes are hashed CSS-Modules locals with no attribute to select on
   * (PR-36513 review item 12 split the former single gate):
   *
   *   • `checked`                      → ToggleButton's `rootCheckedStyles.base`
   *     (background-color, border-*-color, color — all three)
   *   • `disabled` / `disabledFocusable` → react-button's and ToggleButton's
   *     `rootDisabledStyles.base` (all three)
   *   • `primary` / `subtle` / `transparent` → react-button's `useRootStyles[appearance]`
   *     (all three; `secondary` alone is empty — "exactly the same as the base styles")
   *   • `outline`                      → react-button's `useRootStyles.outline` sets ONLY
   *     `background-color`, so carousel's border colours and foreground survived under
   *     Griffel's per-property merge and must survive here (verified against the
   *     pre-conversion useButtonStyles.styles.ts at 60d59a5f72~1).
   *
   * Full derivation, and the probes behind it, in CarouselAutoplayButton.module.css.
   */
  const stateOverridesColors = Boolean(checked || disabled || disabledFocusable);
  const backgroundOverridden = stateOverridesColors || appearance !== 'secondary';
  const strokeAndForegroundOverridden =
    stateOverridesColors || (appearance !== 'secondary' && appearance !== 'outline');

  state = useToggleButtonStyles_unstable(state);

  // Module class FIRST, then the named group marker — which must never be `classList[0]`
  // (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md D15.1/D16.2) — with
  // the consumer className last. `styles.root` is unconditional, so it is always the
  // selector-safe token at index 0 that the invariant requires; the
  // `fui-CarouselAutoplayButton` static that used to hold that position was removed in the
  // D16 sweep.
  //
  // This root ends up carrying THREE markers, which is correct and not a duplication: the
  // element genuinely IS a Button, a ToggleButton and a CarouselAutoplayButton, and each
  // hook stamps its own. (Declared as a set in `testOptions['has-group-marker']` — see
  // CarouselAutoplayButton.test.tsx.)
  //
  // The `icon` slot assignment the Griffel hook carried is gone: its only token was the
  // `fui-CarouselAutoplayButton__icon` static, so what remained after the D16 sweep would
  // have been `clsx(state.icon.className)` — an identity on the consumer's own string, i.e.
  // dead code implying this hook styles a slot it does not (CONVERSION_GUIDE.md §"Known
  // special cases").
  //
  // Cascade priority is decided by the `@layer fui.*` order in
  // CarouselAutoplayButton.module.css, NOT by these arguments — read its header before
  // adding anything, because the composition direction here is the inverse of every other
  // converted wrapper.
  state = {
    ...state,
    root: {
      ...state.root,
      className: clsx(
        styles.root,
        carouselAutoplayButtonClassNames.root,
        !backgroundOverridden && styles['rest-background'],
        !strokeAndForegroundOverridden && styles['rest-stroke-foreground'],
        state.root.className,
      ),
    },
  };

  return state;
};
