'use client';

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * this file keeps `'use client'` because it still calls `useButtonStyles_unstable`, so
 * `enforce-use-client` sees a hook call and never reports the directive as unnecessary. The
 * converted leaf hooks (Toolbar, ToolbarGroup) call nothing and carry no directive at all —
 * see useToolbarStyles.styles.ts.
 */

import { clsx } from 'clsx';
import { useButtonStyles_unstable } from '@fluentui/react-button';
import type { ToolbarButtonState } from './ToolbarButton.types';

import styles from './ToolbarButton.module.css';

/**
 * Data attribute rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * It sits on the ROOT only, even though one of the two slices styles the `icon` slot. The
 * icon reads it from there through a `group-*` variant on the root's marker — see the
 * `state.icon` assignment below and ToolbarButton.module.css — so the icon slot needs no
 * data attribute of its own.
 */
type ToolbarButtonRootDataAttributes = {
  'data-orientation': 'horizontal' | 'vertical';
};

/**
 * Apply styling to the ToolbarButton slots based on the state
 */
export const useToolbarButtonStyles_unstable = (state: ToolbarButtonState): ToolbarButtonState => {
  const rootDataAttributes: ToolbarButtonRootDataAttributes = {
    'data-orientation': state.vertical ? 'vertical' : 'horizontal',
  };

  // Module class first, then the named group marker, consumer className last — the marker
  // must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under jsdom;
  // DECISIONS.md D15.1). The marker is a literal, unhashed, GLOBAL token: it is the only
  // handle by which another module — in this package or any other — can style an element
  // from this ToolbarButton's state, because `styles.root` is hashed and unaddressable from
  // outside this file. `data-orientation` is already stamped on this very element above
  // (DECISIONS.md D15, Tier 0 — no state mirrors needed).
  //
  // This root IS react-button's root, and `useButtonStyles_unstable` (called below)
  // contributes its own `group/fui-button` marker to the same element. TWO markers therefore
  // land on it, which is correct — the element genuinely is both a Button and a
  // ToolbarButton, and a descendant can address whichever identity it means. The component
  // declares BOTH markers to react-conformance's `component-has-group-marker` through
  // `testOptions['has-group-marker'].markers` (D16.3), so that test still runs here — as an
  // exact set comparison, an undeclared marker still fails, and its `classList[0]` half is
  // asserted along with it.
  //
  // Ordering here is per-argument within THIS clsx; because the Button hook runs afterwards
  // and prepends its own arguments, the marker sits further right still in the final class
  // string. That is fine in both directions — class order within the attribute has no
  // effect on CSS matching, and the D15.1 invariant only requires that the marker never be
  // the first token, which Button's own unconditional `styles.root` guarantees now that its
  // `fui-Button` static is gone (D16.1).
  //
  // Cascade priority is decided by the `@layer fui.*` order in
  // ToolbarButton.module.css — everything here is `fui.components.l2`, because both slices
  // style @fluentui/react-button's slots rather than elements of our own. See that file's
  // header for the mapping back to the mergeClasses() argument order this replaces.
  state = {
    ...state,
    root: {
      ...state.root,
      ...rootDataAttributes,
      className: clsx(styles.root, 'group/fui-toolbar-button', state.root.className),
    },
  };

  // JS slot composition, the D16.3 mechanism for styling a sub-slot of a component this
  // package RENDERS ITSELF (M2 in reports/statics-removal-design.md §2.3). ToolbarButton
  // renders react-button's <Button> and therefore HOLDS `state.icon` — the very slot object
  // `useButtonStyles_unstable` will decorate on the next line — so it can hand the icon its
  // own hashed class instead of reaching for `:global(.fui-Button__icon)`, which D16.1
  // deletes. Nothing in this package names a react-button class any more.
  //
  // The rule this class carries is scoped by the ROOT's orientation, which the icon reads
  // through `@variant group-vertical/fui-toolbar-button` — the ancestor-state capability
  // D15.1's marker exists for. Written BEFORE `useButtonStyles_unstable`, whose own `clsx`
  // puts the incoming className last, so this class still beats Button's icon rules in a
  // tie exactly as the descendant selector did. `state.icon` is optional, hence the guard.
  if (state.icon) {
    state = { ...state, icon: { ...state.icon, className: clsx(styles.icon, state.icon.className) } };
  }

  // Called LAST, exactly as before: `useButtonStyles_unstable` composes its own classes
  // ahead of the incoming className, which is what made ToolbarButton win under Griffel.
  // The layer altitude reproduces that winner now, but the call order still has to stand
  // so the consumer className stays last in the rendered class attribute.
  // `useButtonStyles_unstable` is typed on `ButtonState`, which ToolbarButtonState widens with
  // `vertical`; the spread re-merges the composed Button slots onto this component's own state
  // shape (F1 of the D14 mutation removal — thread the composed result, do not discard it).
  state = { ...state, ...useButtonStyles_unstable(state) };

  return state;
};
