import { clsx } from 'clsx';
import type { InputState } from './Input.types';

import styles from './Input.module.css';

/**
 * Public identity class for Input.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable both as a selector and as a
 * `group-*` variant target. The per-slot keys (`input`, `contentBefore`, `contentAfter`) were
 * removed together with the `fui-Input__*` BEM statics (DECISIONS.md D16.1/D16.5): there is no
 * public class-name handle on component internals.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const inputClassNames: { root: string } = {
  root: 'group/fui-input',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * All five live on the ROOT even though three of them drive rules on the `input` and
 * content slots: that is the headless preview's convention (every `data-*` it stamps is
 * on the root — reports/headless-precedent.md), and it is what lets Input.module.css
 * reach the inner slots with `& .input` / `& .content` descendant selectors instead of
 * duplicating the attributes onto every slot.
 *
 * Presence flags are written `flag || undefined`: React omits an attribute whose value is
 * `undefined`, whereas `false` would render `data-invalid="false"` and still match
 * `[data-invalid]`.
 *
 * `data-disabled` mirrors `state.input.disabled`, which the ROOT cannot express natively —
 * the root is a `<span>` and only the inner `<input>` carries the real `disabled`
 * attribute. The `input` slot's own disabled rules therefore need no attribute at all;
 * they key off native `:disabled` through the shared `disabled` variant.
 */
type InputRootDataAttributes = {
  'data-size': InputState['size'];
  'data-disabled'?: true;
  'data-invalid'?: true;
  'data-content-before'?: true;
  'data-content-after'?: true;
};

/**
 * Apply styling to the Input slots based on the state
 */
export const useInputStyles_unstable = (state: InputState): InputState => {
  const { size, appearance } = state;
  const disabled = state.input.disabled;
  const invalid = `${state.input['aria-invalid']}` === 'true';
  const filled = appearance.startsWith('filled');

  const root = state.root as InputState['root'] & InputRootDataAttributes;

  root['data-size'] = size;
  root['data-disabled'] = disabled || undefined;
  root['data-invalid'] = invalid || undefined;
  root['data-content-before'] = !!state.contentBefore || undefined;
  root['data-content-after'] = !!state.contentAfter || undefined;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    inputClassNames.root,
    styles[appearance],
    filled && styles.filled,
    state.root.className,
  );

  state.input.className = clsx(styles.input, state.input.className);

  // Both content slots take the identical class list, the way mergeClasses handed them the
  // identical atomics — one `.content` class covers both.
  if (state.contentBefore) {
    state.contentBefore.className = clsx(styles.content, state.contentBefore.className);
  }
  if (state.contentAfter) {
    state.contentAfter.className = clsx(styles.content, state.contentAfter.className);
  }

  return state;
};
