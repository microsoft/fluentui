import { clsx } from 'clsx';
import type { RadioGroupState } from './RadioGroup.types';

import styles from './RadioGroup.module.css';

/**
 * Public identity class for RadioGroup.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable both as a selector and as a
 * `group-*` variant target. It replaces the `fui-RadioGroup` BEM static removed in
 * DECISIONS.md D16.1/D16.5.
 *
 * The value is a class TOKEN, not a selector — `'.' + radioGroupClassNames.root` is invalid
 * CSS, because the `/` must be escaped in a selector. Use
 * `fuiSelector(radioGroupClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 */
export const radioGroupClassNames: { root: string } = {
  root: 'group/fui-radio-group',
};

/**
 * Data attribute rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * `data-layout` is one of the headless preview's 25 attribute names
 * (reports/headless-precedent.md) and carries the public prop verbatim, including the
 * `horizontal-stacked` value that has no CSS rule of its own — the Griffel source styled
 * `layout === 'vertical'` alone, leaving both horizontal modes on the base
 * `flex-direction: row`. Stamping the full union keeps the attribute a faithful mirror of
 * the prop (and a usable hook for consumer CSS) rather than a boolean in disguise.
 *
 * It is deliberately NOT `data-orientation`: `horizontal-stacked` is a layout mode rather
 * than an axis. `layout` also feeds the child Radios' default `labelPosition` through React
 * context (useRadioBase_unstable), which is a JS concern, not a CSS one.
 */
type RadioGroupRootDataAttributes = {
  'data-layout': RadioGroupState['layout'];
};

/**
 * Apply styling to the RadioGroup slots based on the state
 */
export const useRadioGroupStyles_unstable = (state: RadioGroupState): RadioGroupState => {
  const root = state.root as RadioGroupState['root'] & RadioGroupRootDataAttributes;

  root['data-layout'] = state.layout;

  // `styles.root` first — hashed, unconditional and selector-safe — then the named group
  // marker, then the consumer className. The marker must never be `classList[0]` (nwsapi's
  // `:scope` polyfill throws on it under jsdom; DECISIONS.md D15.1/D16.2).
  //
  // RadioGroup is stamped here for the first time. It was one of only two converted roots
  // (with AvatarGroupPopover) that carried a `fui-*` static but no marker, so removing the
  // static under D16.1 would have left it with NO public identity class at all — an
  // unrecorded identity loss, which D16.7 admits for the 17 react-text presets and nowhere
  // else. D15.1 requires every converted component to stamp `group/fui-<component-kebab>`
  // on its outermost slot; this closes that gap and is what `radioGroupClassNames.root`
  // now points at (D16.5). No rule in this package or any other reads the marker today, so
  // the change is pixel-inert.
  //
  // Cascade priority is decided by the `@layer fui.*` order in RadioGroup.module.css, not
  // by the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  state.root.className = clsx(styles.root, radioGroupClassNames.root, state.root.className);

  return state;
};
