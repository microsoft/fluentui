'use client';

/*
 * NOTE on the directive above:
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

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state = {
    ...state,
    root: {
      ...state.root,
      ...rootDataAttributes,
      className: clsx(styles.root, 'group/fui-toolbar-button', state.root.className),
    },
  };

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
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
