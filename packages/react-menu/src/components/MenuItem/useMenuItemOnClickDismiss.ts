import * as React from 'react';
import { useEventCallback } from '@fluentui/react-utilities';
import { useMenuContext } from '../../contexts/menuContext';
import { useMenuTriggerContext } from '../../contexts/menuTriggerContext';

/**
 * Helper hook that adds menu dismiss to a menu item's onClick handler
 */
export const useMenuItemOnClickDismiss = <T extends React.HTMLAttributes<HTMLElement>>(state: T) => {
  const setOpen = useMenuContext(context => context.setOpen);
  const isMenuTrigger = useMenuTriggerContext();

  const { onClick: onClickOriginal } = state;
  state.onClick = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!isMenuTrigger) {
      setOpen(false);
    }

    // Call original onClick after above
    // MenuTrigger will override the click on dismiss behaviour if the menu item is a trigger for a submenu
    if (onClickOriginal) {
      onClickOriginal(e);
    }
  });

  return state;
};
