'use client';

/*
 * NOTE: this file keeps `'use client'` because
 * it still calls `useColorSliderStyles_unstable()`, so eslint treats this styles hook as a
 * React hook and `enforce-use-client` never reports the directive as unnecessary.
 * ColorPicker/ColorArea/ColorSlider call nothing after conversion and carry no directive.
 */

import { clsx } from 'clsx';
import { useColorSliderStyles_unstable } from '../ColorSlider/useColorSliderStyles.styles';
import type { AlphaSliderState } from './AlphaSlider.types';

import styles from './AlphaSlider.module.css';

/**
 * Public identity class for AlphaSlider.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as this component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a
 * selector and as a `group-*` variant target. The BEM statics (`fui-AlphaSlider`,
 * `fui-AlphaSlider__rail`, `fui-AlphaSlider__thumb`, `fui-AlphaSlider__input`) are no longer
 * rendered and the per-slot keys are gone (DECISIONS.md D16.1); there is no public
 * class-name handle on component internals.
 *
 * An AlphaSlider root carries TWO markers: this one and `group/fui-color-slider`, because
 * `useAlphaSliderStyles_unstable` renders ColorSlider's slots through
 * `useColorSliderStyles_unstable` (D16.3 — a component that renders another component's root
 * carries that component's marker too). That mirrors the pre-D16 DOM exactly, where the root
 * carried both `fui-ColorSlider` and `fui-AlphaSlider`; `AlphaSlider.test.tsx` declares the
 * pair via `testOptions['has-group-marker'].markers`.
 *
 * The marker token contains a `/`. That is legal inside a class TOKEN but terminates the
 * name inside a SELECTOR, so `'.' + alphaSliderClassNames.root` is an invalid selector even
 * though it type-checks. Use `fuiSelector(alphaSliderClassNames.root)` from
 * `@fluentui/react-utilities`.
 */
export const alphaSliderClassNames: { root: string } = {
  root: 'group/fui-alpha-slider',
};

/**
 * Apply styling to the AlphaSlider slots based on the state
 */
export const useAlphaSliderStyles_unstable = (state: AlphaSliderState): AlphaSliderState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state = {
    ...state,
    root: { ...state.root, className: clsx(styles.root, alphaSliderClassNames.root, state.root.className) },
  };

  state = { ...state, rail: { ...state.rail, className: clsx(styles.rail, state.rail.className) } };

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state = { ...state, thumb: { ...state.thumb, className: clsx(styles.thumb, state.thumb.className) } };

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.

  // Applied LAST, exactly as before: it prepends ColorSlider's own classes to each slot and
  // keeps `state.*.className` — and therefore the consumer's className — trailing.
  state = useColorSliderStyles_unstable(state);

  return state;
};
