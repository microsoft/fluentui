import { clsx } from 'clsx';
import type { SkeletonState } from './Skeleton.types';

import styles from './Skeleton.module.css';

/**
 * Public identity class for Skeleton.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable as a selector and as a
 * `group-*` variant target. The BEM static it used to hold is gone (DECISIONS.md D16.1 /
 * D16.5): there is no public class-name handle on component internals.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + skeletonClassNames.root` is an invalid selector. Use
 * `fuiSelector(skeletonClassNames.root)` from `@fluentui/react-utilities` at every selector
 * site (DECISIONS.md D16.5).
 */
export const skeletonClassNames: { root: string } = {
  root: 'group/fui-skeleton',
};

/**
 * Apply styling to the Skeleton slots based on the state
 */
export const useSkeletonStyles_unstable = (state: SkeletonState): SkeletonState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    skeletonClassNames.root,
    state.root.as === 'span' && styles['block-styling'],
    state.root.className,
  );

  return state;
};
