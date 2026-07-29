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
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * `size` is the one prop that rides an attribute rather than a module class: it is a
 * scale prop, not a look prop (DECISIONS.md D3), and the catalog's `data-size` gains this
 * component's numeric scale (`size-8` … `size-128`) next to Button's `size-small|medium|
 * large`. `animation`, `appearance` and `shape` are look props and stay class lookups.
 *
 * `size` is always defined on the state (`useSkeletonItem_unstable` defaults it to the
 * context value or `16`), so the attribute is unconditional — no `|| undefined` presence
 * form is needed here.
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

  // Unconditional module class FIRST, then the named group marker, then the conditional
  // module classes, with the consumer className last (DECISIONS.md D16.2). The marker must
  // never be `classList[0]` — nwsapi's `:scope` polyfill throws on it under jsdom
  // (DECISIONS.md D15.1) — and `styles.root` is the token that guarantees it, since clsx
  // never drops an unconditional argument. The BEM static that used to hold that position
  // is gone (DECISIONS.md D16.1).
  //
  // The marker is a literal, unhashed, GLOBAL token and now the component's SOLE public
  // identity class: it is the only handle by which another module — in this package
  // or any other — can style an element from this SkeletonItem's state, because `styles.root`
  // is hashed and unaddressable from outside this file. No state mirrors are needed:
  // `data-size` is already stamped on this very element above, and `animation` / `appearance`
  // / `shape` are look props carried as module classes, which a group variant cannot read
  // anyway (DECISIONS.md D15, Tier 0).
  //
  // Cascade priority is decided by the `@layer fui.*` order in SkeletonItem.module.css,
  // not by the order of these arguments — see that file's header for the mapping back to
  // the mergeClasses() argument order this replaces, including the media-query bucket
  // rule that keeps `prefers-reduced-motion` beating the pulse animation duration.
  //
  // `styles[animation]` covers the mutually exclusive `wave` / `pulse` slices in one
  // lookup. `styles[appearance]` resolves to `undefined` for `opaque` — that slice does
  // not exist in Griffel either, and clsx drops the falsy argument exactly as
  // mergeClasses dropped the `false` one.
  //
  // The `react-hooks/immutability` disables the Griffel version carried are gone: the rule
  // no longer reports here, and the state-mutation pattern itself stays until the Phase 3
  // sweep (DECISIONS.md D14) — only the now-unused directives were dropped.
  state.root.className = clsx(
    styles.root,
    'group/fui-skeleton-item',
    state.root.as === 'span' && styles['block-styling'],
    styles[animation],
    styles[appearance],
    animation === 'pulse' && appearance === 'translucent' && styles['translucent-pulse'],
    styles[shape],
    state.root.className,
  );

  return state;
};
