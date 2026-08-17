import { clsx } from 'clsx';
import type { PopoverSize } from '../Popover/Popover.types';
import type { PopoverSurfaceState } from './PopoverSurface.types';

import styles from './PopoverSurface.module.css';

/**
 * PopoverSurface's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * `fui-PopoverSurface` BEM static is gone (D16.1), and the type has narrowed from
 * `SlotClassNames<PopoverSurfaceSlots>` to `{ root: string }`.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but terminates
 * it in selector position, so `'.' + popoverSurfaceClassNames.root` is invalid CSS. Use
 * `fuiSelector(popoverSurfaceClassNames.root)` from `@fluentui/react-utilities` (D16.5) —
 * `element.classList.contains(popoverSurfaceClassNames.root)`, the form the positioning-
 * customizations RFC uses, is token-taking and needs no escaping.
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's three, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
 */
export const popoverSurfaceClassNames: { root: string } = {
  root: 'group/fui-popover-surface',
};

export const arrowHeights: Record<PopoverSize, number> = {
  small: 6,
  medium: 8,
  large: 8,
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * Both names already exist in the catalog (`size-small`/`-medium`/`-large` and `inline`), so
 * converting PopoverSurface adds no new vocabulary (D15.5).
 *
 * `data-inline` is a *presence* selector, so the flag is written `inline || undefined` —
 * React omits an attribute whose value is `undefined`, whereas `false` would render
 * `data-inline="false"` and still match `[data-inline]`.
 *
 * Neither attribute mirrors something a native selector already expresses (D15.6, as settled
 * 2026-07-28): `size` and `inline` are React props with no DOM state behind them, and the
 * element that needs them IS the element they are stamped on. Nothing is mirrored for a
 * descendant's benefit — the arrow reads its geometry from module classes the hook hands it
 * directly, not from the root (see PopoverSurface.module.css).
 */
type PopoverSurfaceRootDataAttributes = {
  'data-size': PopoverSurfaceState['size'];
  'data-inline'?: true;
};

/**
 * Apply styling to the PopoverSurface slots based on the state
 */
export const usePopoverSurfaceStyles_unstable = (state: PopoverSurfaceState): PopoverSurfaceState => {
  const root = state.root as PopoverSurfaceState['root'] & PopoverSurfaceRootDataAttributes;

  root['data-size'] = state.size;
  root['data-inline'] = state.inline || undefined;

  // Module class FIRST, named group marker second, consumer className last (DECISIONS.md
  // D16.2). `styles.root` is unconditional, so index 0 is always the hashed, selector-safe
  // `fuicm-*` token — which is what keeps the marker off `classList[0]`, where nwsapi's
  // `:scope` polyfill would throw on its `/` under jsdom (D15.1). The `fui-PopoverSurface`
  // BEM static that used to lead this call is gone (D16.1): the marker is now
  // PopoverSurface's SOLE public identity class, and the only handle by which another
  // module — in this package or any other — can style an element from this surface's state,
  // because `styles.root` is hashed and unaddressable from outside this file.
  //
  // The marker rides `root`, which is PopoverSurface's outermost node in both render paths:
  // when `inline` is false `renderPopoverSurface` wraps it in a `<Portal>`, and a Portal
  // emits no element of its own in the surface's own tree.
  //
  // Cascade priority is decided by the `@layer fui.*` order in PopoverSurface.module.css,
  // not by the order of these arguments — see that file's header for the mapping back to
  // the mergeClasses() argument order this replaces.
  state.root.className = clsx(
    styles.root,
    popoverSurfaceClassNames.root,
    state.appearance === 'inverted' && styles.inverted,
    state.appearance === 'brand' && styles.brand,
    state.root.className,
  );

  // `arrowClassName` is not a slot — `renderPopoverSurface` builds the arrow element itself,
  // so there is no consumer className to place last and no marker to stamp (D15.1 puts one
  // marker on the outermost slot only).
  state.arrowClassName = clsx(
    styles.arrow,
    state.size === 'small' ? styles['arrow-small'] : styles['arrow-medium-large'],
  );

  return state;
};
