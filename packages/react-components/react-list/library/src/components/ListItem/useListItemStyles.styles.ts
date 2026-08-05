import { clsx } from 'clsx';
import { slot } from '@fluentui/react-utilities';
import type { ExtractSlotProps, Slot } from '@fluentui/react-utilities';
import type { ListItemState } from './ListItem.types';

import styles from './ListItem.module.css';

/**
 * Props of the `indicator` sub-slot of the `<Checkbox>` this component renders as its
 * `checkmark` slot, with the shorthand and nullish members of `Slot<'div', 'span'>` excluded.
 *
 * Spelled out rather than inferred because `slot.always` needs a concrete `Props` to widen
 * its `SlotOptions`/return type against; left to inference it collapses to
 * `UnknownSlotProps`, whose optional `as` is no longer assignable back to the slot prop.
 * Mirrors `CheckboxSlots['indicator']` — the FIXME there notes the default should have been
 * `span`; if that ever changes this alias changes with it and nothing else here does.
 */
type CheckmarkIndicatorProps = ExtractSlotProps<Slot<'div', 'span'>>;

/**
 * Public identity classes for ListItem.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a selector
 * and as a `group-*` variant target. The BEM statics (`fui-ListItem`,
 * `fui-ListItem__checkmark`) were removed in D16.1, and with them the `checkmark` key: there
 * is no public class-name handle on component internals.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + listItemClassNames.root` is a `SyntaxError`. Use
 * `fuiSelector(listItemClassNames.root)` from `@fluentui/react-utilities` at every selector
 * site (D16.5).
 */
export const listItemClassNames: { root: string } = {
  root: 'group/fui-list-item',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * `data-interactive` carries the `selectable || navigable` union that gated Griffel's
 * `rootClickableOrSelectable` slice. It is ONE attribute rather than two because neither
 * half gates anything on its own (cookbook: "prefer ONE presence attribute over two").
 *
 * Both are *presence* selectors, so the flags are written `flag || undefined` — React
 * omits an attribute whose value is `undefined`, whereas `false` would render
 * `data-interactive="false"` and still match `[data-interactive]`.
 *
 * The checkmark slot carries no data attributes: its only slice is unconditional.
 */
type ListItemRootDataAttributes = {
  'data-interactive'?: true;
  'data-disabled'?: true;
};

/**
 * Apply styling to the ListItem slots based on the state
 */
export const useListItemStyles_unstable = (state: ListItemState): ListItemState => {
  const root = state.root as ListItemState['root'] & ListItemRootDataAttributes;

  root['data-interactive'] = state.selectable || state.navigable || undefined;
  root['data-disabled'] = state.disabled || undefined;

  // Module class FIRST, then the named group marker, consumer className last (DECISIONS.md
  // D16.2). `styles.root` is unconditional, so it is always the leading token and the marker
  // is never `classList[0]` — nwsapi's `:scope` polyfill throws on the `/` under jsdom
  // (D15.1). Before the statics sweep the `fui-ListItem` class held that position
  // incidentally; now it is held explicitly by the hashed CSS-Modules class. The marker is a
  // literal, unhashed, GLOBAL token: it is the only handle by which another module — in this
  // package or any other — can style an element from this ListItem's state, because
  // `styles.root` is hashed and unaddressable from outside this file (DECISIONS.md D15).
  //
  // ListItem needs no state mirrors: `data-interactive` and `data-disabled` are stamped on
  // this very element above, so `@variant group-interactive/fui-list-item` /
  // `group-disabled/fui-list-item` work as-is (D15.6, Tier 0). The marker nests under
  // `group/fui-list` for free — each component root carries its own (D15.1).
  //
  // Cascade priority is decided by the `@layer fui.*` order in ListItem.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces, including why the checkmark slot's rules
  // live in `fui.components.l2` rather than l1.
  state.root.className = clsx(styles.root, 'group/fui-list-item', state.root.className);

  if (state.checkmark) {
    state.checkmark.className = clsx(styles.checkmark, state.checkmark.className);

    // JS slot composition, the D16.3 mechanism for styling a sub-slot of a component this
    // package RENDERS ITSELF (M2 in reports/statics-removal-design.md §2.2).
    //
    // The `checkmark` slot IS a `<Checkbox>` (`slot.optional(props.checkmark, { elementType:
    // Checkbox })` in useListItem.tsx), and the 4px margin this component wants belongs on
    // Checkbox's `indicator` sub-slot. That element used to be reached from CSS by its
    // owner's static class — `.checkmark :global(.fui-Checkbox__indicator)` — which D16.1
    // deletes. Rather than renaming that coupling to a marker, this removes it: ListItem
    // hands its OWN hashed class down through the slot props it already controls, so nothing
    // in this package depends on react-checkbox's internal DOM shape any more.
    //
    // `slot.always` normalises whatever the consumer passed — shorthand, element, props
    // object, or nothing — into a props object, and the `clsx` MERGES onto it rather than
    // replacing it: `slot.always`'s own `{ ...defaultProps, ...props }` would let a
    // consumer's `checkmark={{ indicator: { className: 'x' } }}` silently drop our class.
    // Checkbox re-resolves this object in `useCheckbox_unstable` (idempotent) and its own
    // `clsx` keeps this className last, so ours still wins its ties. Altitude is unchanged:
    // `.checkmark-indicator` sits in `fui.components.l2` against Checkbox's `fui.base`
    // indicator reset — see ListItem.module.css.
    //
    // An explicit `null` is a SUPPRESSED slot (`checkmark={{ indicator: null }}` renders no
    // indicator — Checkbox's `slot.optional` drops it) and must pass through untouched: a
    // `?? undefined` here used to convert it into "use the default", making `slot.always`
    // recreate the very element the consumer disabled (PR-36513 review item 15). Only
    // `undefined`/shorthand/props go through normalisation.
    if (state.checkmark.indicator !== null) {
      const indicator = slot.always<CheckmarkIndicatorProps>(state.checkmark.indicator, {
        elementType: 'div',
      });
      indicator.className = clsx(styles['checkmark-indicator'], indicator.className);
      state.checkmark.indicator = indicator;
    }
  }

  return state;
};
