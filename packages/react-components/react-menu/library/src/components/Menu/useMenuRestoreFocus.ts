'use client';

import * as React from 'react';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { useFirstMount } from '@fluentui/react-utilities';
import type { MenuBaseState } from './Menu.types';

/**
 * Restores focus to the trigger after Menu closes unless focus has moved outside
 * the popover. Does not focus the trigger on initial closed mount.
 * Compose with the stable refs returned by a Menu state hook.
 */
export const useMenuRestoreFocus_unstable = (
  state: Pick<MenuBaseState, 'open' | 'menuPopoverRef' | 'triggerRef'>,
): void => {
  const { open, menuPopoverRef, triggerRef } = state;
  const { targetDocument } = useFluent_unstable();
  const firstMount = useFirstMount();

  React.useEffect(() => {
    if (!open && !firstMount) {
      if (
        // Unmounting may leave focus on body; exit motion may leave it in the popover.
        targetDocument?.activeElement === targetDocument?.body ||
        menuPopoverRef.current?.contains(targetDocument?.activeElement ?? null)
      ) {
        triggerRef.current?.focus();
      }
    }
    // firstMount changing must not restore focus after an initial closed mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, menuPopoverRef, triggerRef, targetDocument]);
};
