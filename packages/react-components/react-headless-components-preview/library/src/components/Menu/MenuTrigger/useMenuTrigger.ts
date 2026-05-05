'use client';

import * as React from 'react';
import { useMenuTriggerBase_unstable } from '@fluentui/react-menu';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useMenuContext } from '../menuContext';
import type { MenuTriggerProps, MenuTriggerState } from './MenuTrigger.types';

/**
 * Returns the state for a MenuTrigger.
 *
 * Delegates to v9's `useMenuTriggerBase_unstable` — the tabster-free variant
 * of `useMenuTrigger_unstable`. The base hook leaves the
 * "submenu-already-open arrow-key focuses first item" path as a no-op when
 * no `focusFirst` callback is supplied; the headless package does not pull
 * `@fluentui/react-tabster` for this, so consumers who need that behavior
 * wire their own focus discovery.
 *
 * **Right-click / openOnContext**: when the parent Menu opens on context
 * menu, the base hook's `onContextMenu` handler calls `setOpen(true)`
 * synchronously. That doesn't cooperate well with native `popover="auto"` —
 * the trailing `pointerup` of the right-click sequence is treated by the
 * browser as an outside click and immediately dismisses the just-opened
 * menu. To match the headless Popover's fix, we override the cloned child's
 * `onContextMenu` to defer `setOpen(true)` until after the trailing
 * `pointerup`, by which point the popover is already in the top layer and
 * the pointerup is no longer "outside".
 */
export const useMenuTrigger = (props: MenuTriggerProps): MenuTriggerState => {
  const baseState = useMenuTriggerBase_unstable(props);
  const openOnContext = useMenuContext(ctx => ctx.openOnContext);
  const setOpen = useMenuContext(ctx => ctx.setOpen);
  const { targetDocument } = useFluent();

  if (!openOnContext || !baseState.children || !targetDocument) {
    return baseState;
  }

  const child = baseState.children;

  const onContextMenuDeferred = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const nativeEvent = event.nativeEvent;
    targetDocument.addEventListener(
      'pointerup',
      () => {
        // Pass the original contextmenu native event through so that
        // `useMenuOpenState`'s `trySetOpen` recognises `e.type === 'contextmenu'`
        // and sets `contextTarget` for positioning.
        setOpen(nativeEvent as unknown as React.MouseEvent<HTMLElement>, {
          open: true,
          type: 'menuTriggerContextMenu',
          event: nativeEvent as unknown as React.MouseEvent<HTMLElement>,
        });
      },
      { once: true, capture: true },
    );
  };

  return {
    ...baseState,
    children: React.cloneElement(
      child as React.ReactElement<{ onContextMenu?: React.MouseEventHandler<HTMLElement> }>,
      {
        onContextMenu: onContextMenuDeferred,
      },
    ),
  };
};
