'use client';

/*
 * NOTE (Griffel → Tailwind + CSS Modules migration): this file keeps `'use client'` because
 * it still calls a React hook (`useDialogTitleStyles_unstable`), so `enforce-use-client`
 * never reports the directive as unnecessary. Every other styles hook in this package calls
 * nothing after conversion and carries no directive at all.
 */

import { clsx } from 'clsx';
import { useDialogTitleStyles_unstable } from '@fluentui/react-dialog';

import type { DrawerHeaderTitleState } from './DrawerHeaderTitle.types';

import styles from './DrawerHeaderTitle.module.css';

/**
 * DrawerHeaderTitle's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * `heading` / `action` keys are gone along with the `fui-DrawerHeaderTitle*` BEM statics
 * (D16.1), and the type has narrowed from `SlotClassNames<DrawerHeaderTitleSlots>` to
 * `{ root: string }` so that any read of a per-slot key is a compile error on the exact line
 * that would otherwise have silently stopped matching.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but
 * terminates it in selector position, so `'.' + drawerHeaderTitleClassNames.root` is invalid
 * CSS. Use `fuiSelector(drawerHeaderTitleClassNames.root)` from `@fluentui/react-utilities`
 * (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
 */
export const drawerHeaderTitleClassNames: { root: string } = {
  root: 'group/fui-drawer-header-title',
};

/**
 * Apply styling to the DrawerHeaderTitle slots based on the state
 */
export const useDrawerHeaderTitleStyles_unstable = (state: DrawerHeaderTitleState): DrawerHeaderTitleState => {
  const {
    heading: root = {},
    action,
    // We should not use components to pass along the base element type of a slot
    // but there's no way to retrieve the element type of a slot from the slot definition
    // right now without using SLOT_ELEMENT_TYPE_SYMBOL
    // TODO: create a method to retrieve the element type of a slot
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    components,
  } = state;

  // Unchanged. react-dialog converted in this same batch, so this now decorates `heading`
  // and `action` with hashed module classes in `@layer fui.base` / `fui.components.l1` plus
  // its own `group/fui-dialog-title` marker on `heading`. See DrawerHeaderTitle.module.css
  // for the altitude analysis.
  // Thread the composed result instead of discarding it (F1 of the D14 mutation removal). This
  // seam is an ADAPTER, not a widening: it hands DialogTitle a synthetic state whose `root` is
  // this component's `heading` slot, so the two slots the delegate composes have to be mapped
  // back by name. `heading` defaults to `{}` in the destructure above, so a DrawerHeaderTitle
  // that renders no heading must not acquire one here — hence the `undefined` guard. `action`
  // needs no guard: it is passed through unchanged, so an absent action comes back absent.
  const composedTitle = useDialogTitleStyles_unstable({
    components: {
      root: components.heading,
      action: components.action,
    },
    root,
    action,
  });

  // The DialogTitle merge lands HERE, immediately after the call. Under the old mutating contract
  // it could sit at the return, because the delegate wrote onto the very `action` object this hook
  // then wrote again. Now that DialogTitle returns NEW slot objects, merging last would overwrite
  // this hook's `styles.action` write with the delegate's action and silently drop it.
  state = {
    ...state,
    heading: state.heading === undefined ? undefined : composedTitle.root,
    action: composedTitle.action,
  };

  // ARGUMENT ORDER — `styles.root`, marker, consumer className (DECISIONS.md D16.2). The
  // unconditional hashed module class leads so the marker is never `classList[0]`: nwsapi's
  // jsdom `:scope` polyfill builds its anchor from `escape(element.classList[0])` and the
  // `/` survives that escaping into an invalid selector (D15.1). Before D16 the
  // `fui-DrawerHeaderTitle` static held that position.
  state = {
    ...state,
    root: { ...state.root, className: clsx(styles.root, 'group/fui-drawer-header-title', state.root.className) },
  };

  // The `heading` assignment is GONE. Its only library token was the
  // `fui-DrawerHeaderTitle__heading` static — this hook never styled the slot — so what
  // removing it leaves behind is `clsx(state.heading.className)`, an identity on the
  // consumer's own string, i.e. dead code implying a styling relationship that does not
  // exist (CONVERSION_GUIDE, "A slot whose only library token is the static"). `heading` is
  // still styled, by `useDialogTitleStyles_unstable` above.

  // Sub-slots carry no marker, so D16.2 is not in play: the hashed module class simply leads
  // and the consumer className stays last. `styles.action` sits at `fui.components.l2` —
  // this element's base styles come from another component's hook (D2 amendment 2).
  if (state.action) {
    state = { ...state, action: { ...state.action, className: clsx(styles.action, state.action.className) } };
  }

  return state;
};
