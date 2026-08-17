import { clsx } from 'clsx';
import type { ColorAreaState } from './ColorArea.types';

import styles from './ColorArea.module.css';

/**
 * Public identity class for ColorArea.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as this component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a
 * selector and as a `group-*` variant target. The BEM statics (`fui-ColorArea`,
 * `fui-ColorArea__thumb`, `fui-ColorArea__inputX`, `fui-ColorArea__inputY`) are no longer
 * rendered and the per-slot keys are gone (DECISIONS.md D16.1); there is no public
 * class-name handle on component internals.
 *
 * The marker token contains a `/`. That is legal inside a class TOKEN but terminates the
 * name inside a SELECTOR, so `'.' + colorAreaClassNames.root` is an invalid selector even
 * though it type-checks. Use `fuiSelector(colorAreaClassNames.root)` from
 * `@fluentui/react-utilities`.
 */
export const colorAreaClassNames: { root: string } = {
  root: 'group/fui-color-area',
};

/**
 * Apply styling to the ColorArea slots based on the state
 */
export const useColorAreaStyles_unstable = (state: ColorAreaState): ColorAreaState => {
  const { shape = 'rounded' } = state;

  // Unconditional module class FIRST, then the named group marker — the marker must never
  // be `classList[0]` (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md
  // D15.1 / D16.2) — with the consumer className last. `styles.root` is unconditional and
  // clsx never drops it, so index 0 is always the hashed, selector-safe module class; it is
  // what keeps the marker safe now that the `fui-ColorArea` static is gone.
  //
  // The marker is this component's SOLE public identity class: it is the only handle by
  // which another module can address a ColorArea root, because `styles.root` is hashed and
  // unaddressable from outside this file.
  //
  // Cascade priority is decided by the `@layer fui.*` order in ColorArea.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  state.root.className = clsx(styles.root, 'group/fui-color-area', styles[shape], state.root.className);

  // `.thumb` carries the focus indicator too: `createFocusOutlineStyle({ selector:
  // 'focus-within' })` is authored directly into the module as the shared
  // `fui-focus-outline` utility under the `focus-within-fui` variant (DECISIONS.md D6), so
  // the second Griffel class this merge used to add has no JS counterpart.
  state.thumb.className = clsx(styles.thumb, state.thumb.className);

  // Both hidden range inputs took the same single Griffel slice and still do.
  state.inputX.className = clsx(styles.input, state.inputX.className);
  state.inputY.className = clsx(styles.input, state.inputY.className);

  return state;
};
