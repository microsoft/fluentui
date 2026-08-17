import { clsx } from 'clsx';
import type { InfoButtonState } from './InfoButton.types';

import styles from './InfoButton.module.css';

/**
 * Public identity class for InfoButton.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a selector
 * and as a `group-*` variant target. The per-slot keys were removed together with the BEM
 * statics (D16.1): there is no public class-name handle on component internals any more.
 * That also retires the `popover` key, which never named a rendered class at all — it only
 * existed to satisfy `SlotClassNames<InfoButtonSlots>`, a constraint the narrowed type drops.
 *
 * `'.' + infoButtonClassNames.root` is an INVALID selector — `/` is legal in a class TOKEN
 * but terminates the name in selector position. Use `fuiSelector(infoButtonClassNames.root)`
 * from `@fluentui/react-utilities`.
 */
export const infoButtonClassNames: { root: string } = {
  root: 'group/fui-info-button',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * `size` is a scale prop, so it rides `data-size` rather than a module class
 * (DECISIONS.md D3). `data-open` is a *presence* selector, so the flag is written
 * `open || undefined` — React omits an attribute whose value is `undefined`, whereas
 * `false` would render `data-open="false"` and still match `[data-open]`.
 *
 * `data-open` is stamped rather than reusing the `aria-expanded` PopoverTrigger already
 * writes on this same button: that attribute is explicitly consumer-overridable
 * (react-popover's PopoverTrigger.test.tsx "should allow user to override aria-expanded"),
 * while `state.popover.open` is exactly the boolean the Griffel hook branched on.
 */
type InfoButtonRootDataAttributes = {
  'data-size': InfoButtonState['size'];
  'data-open'?: true;
};

/**
 * Apply styling to the InfoButton slots based on the state
 */
export const useInfoButtonStyles_unstable = (state: InfoButtonState): InfoButtonState => {
  const { size } = state;
  const { open } = state.popover;

  const root = state.root as InfoButtonState['root'] & InfoButtonRootDataAttributes;

  // The four `react-hooks/immutability` disables this function used to carry are gone: once the
  // Griffel `usePopoverSurfaceStyles()` call was removed (see InfoButton.module.css §HISTORY) the
  // rule stopped reporting these assignments, and eslint flagged all four directives as unused.
  // Measured, not assumed — `nx run react-infolabel:lint` is clean with them deleted. The
  // MUTATIONS below are unchanged and still belong to the D14 sweep (worklist Item 2); this file
  // simply no longer needs a suppression for them.
  root['data-size'] = size;
  root['data-open'] = open || undefined;

  // The `info` slot is a `PopoverSurface` root, so these classes reach that component's hook as
  // its CONSUMER className — the position mergeClasses gave them the win from. They sit in
  // `@layer fui.components.l2`, above PopoverSurface's own l1 rules, which is what now
  // guarantees the win; see InfoButton.module.css §ALTITUDE. The size branch stays a class pick
  // rather than a `@variant size-large` block because `data-size` rides the BUTTON, and the
  // surface is portalled out of the button's subtree. No named-group marker: the marker is the
  // root slot's public identity, and nothing styles this element from outside.
  state.info.className = clsx(
    styles.info,
    size === 'large' ? styles['info-large'] : styles['info-small-medium'],
    state.info.className,
  );

  // Module class FIRST, then the named group marker — the marker must never be
  // `classList[0]` (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md
  // D15.1 / D16.2) — with the consumer className last. `styles.root` is unconditional and
  // clsx never drops it, so index 0 is always the hashed, selector-safe class; before D16
  // the removed `fui-InfoButton` static was what held that position.
  //
  // The marker is a literal, unhashed, GLOBAL token and, since D16.1 retired the BEM
  // statics, InfoButton's SOLE public identity class: it is the only handle by which another
  // module — in this package or any other — can style an element from this InfoButton's
  // state, because `styles.root` is hashed and unaddressable from outside this file
  // (DECISIONS.md D15).
  //
  // InfoButton needs no state mirrors: `data-size` and `data-open` are stamped on this very
  // element above, so `@variant group-open/fui-info-button` etc. work as-is (D15.6, Tier 0).
  // The marker rides the `root` slot only — the `info` slot is a portalled PopoverSurface and
  // gets nothing.
  //
  // Cascade priority is decided by the `@layer fui.*` order in InfoButton.module.css, not
  // by the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  state.root.className = clsx(styles.root, infoButtonClassNames.root, state.root.className);

  return state;
};
