'use client';

/*
 * NOTE (Griffel → Tailwind + CSS Modules migration): unlike its three siblings in this
 * package, this file needs NO `enforce-use-client` suppression and KEEPS its
 * `react-hooks/immutability` disables. It still calls `useColorSliderStyles_unstable()`, so
 * eslint still treats this styles hook as a React hook and both rules apply to it exactly as
 * before — the same split react-avatar landed on, versus ColorPicker/ColorArea/ColorSlider,
 * whose converted hooks call nothing and therefore lose both.
 *
 * The state-mutation contract itself is deliberately preserved (DECISIONS.md D14); its
 * removal is a single Phase 3 sweep, not a per-conversion change.
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
 * CSS custom properties the alpha slider position and colours ride on. Set as inline styles
 * by `useAlphaSliderState_unstable`; the runtime-value mechanism ports unchanged from Griffel
 * (CONVERSION_GUIDE "Known special cases"), so these names are still public API.
 *
 * Note these are AlphaSlider's OWN namespace — unlike ColorSlider, which shares the
 * `--fui-Slider*` names with react-slider.
 */
export const alphaSliderCSSVars = {
  sliderDirectionVar: `--fui-AlphaSlider--direction`,
  sliderProgressVar: `--fui-AlphaSlider--progress`,
  thumbColorVar: `--fui-AlphaSlider__thumb--color`,
  railColorVar: `--fui-AlphaSlider__rail--color`,
};

/**
 * Apply styling to the AlphaSlider slots based on the state
 */
export const useAlphaSliderStyles_unstable = (state: AlphaSliderState): AlphaSliderState => {
  // Unconditional module class FIRST, then the named group marker — the marker must never be
  // `classList[0]` (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md D15.1 /
  // D16.2) — with the consumer className last. `styles.root` is the identity-only local minted
  // for exactly this reason (D16.2): AlphaSlider's root has no declarations of its own, so
  // without it the marker would lead. `useColorSliderStyles_unstable` below prepends its own
  // class + marker, so the emitted `classList[0]` is in fact ColorSlider's module class — but
  // this call must be safe on its own terms, not by relying on what runs after it.
  //
  // Every rule these classes carry lives in `@layer fui.components.l2` — see
  // AlphaSlider.module.css for why composition over ColorSlider's output cannot sit in l1.
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(styles.root, 'group/fui-alpha-slider', state.root.className);

  // eslint-disable-next-line react-hooks/immutability
  state.rail.className = clsx(styles.rail, state.rail.className);

  // The thumb was assigned TWICE in the Griffel version, with byte-identical arguments. That
  // was dead code with a visible symptom: `mergeClasses` de-duplicates its own atomics but not
  // plain string classes, so the emitted class list carried `fui-AlphaSlider__thumb` twice
  // (see the committed inline snapshot). One assignment.
  // eslint-disable-next-line react-hooks/immutability
  state.thumb.className = clsx(styles.thumb, state.thumb.className);

  // The `input` slot had a static-class-only assignment, which under D16 leaves
  // `clsx(state.input.className)` — an identity on the consumer's own string, i.e. dead code
  // implying this hook styles a slot it does not (CONVERSION_GUIDE "Known special cases").
  // Deleted; ColorSlider's hook below is the only thing that styles the input.

  // Applied LAST, exactly as before: it prepends ColorSlider's own classes to each slot and
  // keeps `state.*.className` — and therefore the consumer's className — trailing.
  useColorSliderStyles_unstable(state);

  return state;
};
