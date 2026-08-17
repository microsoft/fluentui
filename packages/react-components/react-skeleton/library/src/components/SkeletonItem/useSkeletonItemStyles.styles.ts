import { clsx } from 'clsx';
import type { SkeletonItemState } from './SkeletonItem.types';

import styles from './SkeletonItem.module.css';

/**
 * Public identity class for SkeletonItem.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable as a selector and as a
 * `group-*` variant target. The BEM static it used to hold is gone (DECISIONS.md D16.1 /
 * D16.5): there is no public class-name handle on component internals.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + skeletonItemClassNames.root` is an invalid selector. Use
 * `fuiSelector(skeletonItemClassNames.root)` from `@fluentui/react-utilities` at every
 * selector site (DECISIONS.md D16.5).
 */
export const skeletonItemClassNames: { root: string } = {
  root: 'group/fui-skeleton-item',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant` catalog in
 * `@fluentui/react-tailwind-theme` (`css/variants.css`).
 */
type SkeletonItemRootDataAttributes = {
  'data-size': SkeletonItemState['size'];
};

/**
 * Apply styling to the SkeletonItem slots based on the state
 */
export const useSkeletonItemStyles_unstable = (state: SkeletonItemState): SkeletonItemState => {
  const { animation, appearance, size, shape } = state;

  const root = state.root as SkeletonItemState['root'] & SkeletonItemRootDataAttributes;

  root['data-size'] = size;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    skeletonItemClassNames.root,
    state.root.as === 'span' && styles['block-styling'],
    styles[animation],
    styles[appearance],
    animation === 'pulse' && appearance === 'translucent' && styles['translucent-pulse'],
    styles[shape],
    state.root.className,
  );

  return state;
};
