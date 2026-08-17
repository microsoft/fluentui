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
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
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

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, radioGroupClassNames.root, state.root.className);

  return state;
};
