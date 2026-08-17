import { clsx } from 'clsx';
import type { SelectState } from './Select.types';

import styles from './Select.module.css';

/**
 * Public identity classes for Select.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as this component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a
 * selector and as a `group-*` variant target. The BEM statics (`fui-Select`,
 * `fui-Select__select`, `fui-Select__icon`) are no longer rendered and the per-slot keys are
 * gone; there is no public class-name handle on component internals.
 *
 * The marker token contains a `/`. That is legal inside a class TOKEN but terminates the
 * name inside a SELECTOR, so `'.' + selectClassNames.root` is an invalid selector even
 * though it type-checks. Use `fuiSelector(selectClassNames.root)` from
 * `@fluentui/react-utilities`.
 */
export const selectClassNames: { root: string } = {
  root: 'group/fui-select',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * All three live on the ROOT even though every rule they drive targets the `select` or
 * `icon` slot: that is the headless preview's convention (every `data-*` it stamps is on
 * the root — reports/headless-precedent.md), and here it is also load-bearing —
 * Select.module.css's header explains why moving `data-invalid` onto the `<select>` would
 * both break the invalid-vs-interactive file-order tie and let the shared `invalid`
 * variant's `:invalid` term fire on a `required` Select the Griffel code never styled.
 *
 * Presence flags are written `flag || undefined`: React omits an attribute whose value is
 * `undefined`, whereas `false` would render `data-invalid="false"` and still match
 * `[data-invalid]`.
 *
 * `data-disabled` mirrors `state.select.disabled`, which the ROOT cannot express natively —
 * the root is a `<span>` and only the inner `<select>` carries the real `disabled`
 * attribute.
 */
type SelectRootDataAttributes = {
  'data-size': SelectState['size'];
  'data-disabled'?: true;
  'data-invalid'?: true;
};

/**
 * Apply styling to the Select slots based on the state
 */
export const useSelectStyles_unstable = (state: SelectState): SelectState => {
  const { size, appearance } = state;
  const disabled = state.select.disabled;
  const invalid = `${state.select['aria-invalid']}` === 'true';

  const root = state.root as SelectState['root'] & SelectRootDataAttributes;

  root['data-size'] = size;
  root['data-disabled'] = disabled || undefined;
  root['data-invalid'] = invalid || undefined;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, selectClassNames.root, state.root.className);

  state.select.className = clsx(styles.select, styles[appearance], state.select.className);

  if (state.icon) {
    state.icon.className = clsx(styles.icon, state.icon.className);
  }

  return state;
};
