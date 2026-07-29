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
  // Identity-only module class FIRST, then the named group marker, then the conditional
  // module class, with the consumer className last (DECISIONS.md D16.2). The marker must
  // never be `classList[0]` — nwsapi's `:scope` polyfill throws on it under jsdom
  // (DECISIONS.md D15.1). The BEM static that used to sit between them is gone
  // (DECISIONS.md D16.1); `styles.root` was minted as this root's leading token before the
  // sweep precisely so its removal changes nothing about that guarantee.
  //
  // The marker is a literal, unhashed, GLOBAL token and now the component's SOLE public
  // identity class: it is the only handle by which another module — in this package or any
  // other — can style an element from this Skeleton's state, because `styles.root` and
  // `styles['block-styling']` are hashed and unaddressable from outside this file. It is
  // what lets SkeletonItem.module.css (or a consumer's module) key off "inside a Skeleton"
  // at all (DECISIONS.md D15).
  //
  // `styles.root` carries no declarations; it exists so this root always emits a hashed,
  // selector-safe token ahead of the marker. It is needed because the only styled slice here
  // is conditional — `block-styling` applies just to `as="span"`, and the root defaults to a
  // `div` — so on a default render nothing else in this call is guaranteed to be present.
  // See Skeleton.module.css for why the local carries an inert custom property rather than
  // an empty body (statics-removal design §4b).
  //
  // Cascade priority is decided by the `@layer fui.*` order in Skeleton.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  //
  // Skeleton stamps no data attributes: `animation`, `appearance`, `size` and `shape` are
  // carried to the SkeletonItems through SkeletonContext (useSkeletonContextValues), and
  // the wrapper itself renders no visual of its own.
  //
  // The `react-hooks/immutability` disable the Griffel version carried is gone: the rule
  // no longer reports here, and the state-mutation pattern itself stays until the Phase 3
  // sweep (DECISIONS.md D14) — this is only the now-unused directive.
  state.root.className = clsx(
    styles.root,
    'group/fui-skeleton',
    state.root.as === 'span' && styles['block-styling'],
    state.root.className,
  );

  return state;
};
