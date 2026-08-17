'use client';

/*
 * NOTE: this file keeps `'use client'` because
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
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
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

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
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

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state = {
    ...state,
    root: { ...state.root, className: clsx(styles.root, drawerHeaderTitleClassNames.root, state.root.className) },
  };

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  if (state.action) {
    state = { ...state, action: { ...state.action, className: clsx(styles.action, state.action.className) } };
  }

  return state;
};
