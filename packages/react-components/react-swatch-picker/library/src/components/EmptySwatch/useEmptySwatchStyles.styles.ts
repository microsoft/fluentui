import { clsx } from 'clsx';
import type { EmptySwatchState } from './EmptySwatch.types';

import styles from './EmptySwatch.module.css';

/**
 * Public identity class for EmptySwatch.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as this component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a
 * selector and as a `group-*` variant target. The BEM static (`fui-EmptySwatch`) is no
 * longer rendered; there is no public class-name handle on component internals.
 *
 * The marker token contains a `/`. That is legal inside a class TOKEN but terminates the
 * name inside a SELECTOR, so `'.' + emptySwatchClassNames.root` is an invalid selector even
 * though it type-checks. Use `fuiSelector(emptySwatchClassNames.root)` from
 * `@fluentui/react-utilities`.
 */
export const emptySwatchClassNames: { root: string } = {
  root: 'group/fui-empty-swatch',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant` catalog in
 * `@fluentui/react-tailwind-theme` (`css/variants.css`).
 */
type EmptySwatchRootDataAttributes = {
  'data-size': NonNullable<EmptySwatchState['size']>;
};

/**
 * Apply styling to the EmptySwatch slots based on the state
 */
export const useEmptySwatchStyles_unstable = (state: EmptySwatchState): EmptySwatchState => {
  const size = state.size ?? 'medium';
  const shape = state.shape ?? 'square';

  const root = state.root as EmptySwatchState['root'] & EmptySwatchRootDataAttributes;

  root['data-size'] = size;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, emptySwatchClassNames.root, styles[shape], state.root.className);

  return state;
};
