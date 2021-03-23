import * as React from 'react';
import { useMenuTriggerOpenDescendants } from '../../contexts/menuDescendantsContext';
import { MenuItemState } from '../../components/index';

/**
 * onMouseEnter, performs a check for open submenus through registered menu triggers
 *
 * Closes open menu triggers that are not that specific menu item
 */
export const useCloseSubmenusOnMouseEnter = <T extends MenuItemState>(state: T) => {
  const openTriggers = useMenuTriggerOpenDescendants();
  const { onMouseEnter: onMouseEnterOriginal } = state;
  state.onMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (openTriggers.length > 0) {
      openTriggers.forEach(openTrigger => {
        if (!(state.ref.current as Node)?.contains(openTrigger.element)) {
          openTrigger.dismissMenu();
        }
      });
    }

    onMouseEnterOriginal?.(e);
  };
};
