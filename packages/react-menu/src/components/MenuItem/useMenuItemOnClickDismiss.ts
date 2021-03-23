import * as React from 'react';
import { useMenuContext } from '../../contexts/menuContext';

/**
 * Helper hook that adds menu dismiss to a menu item's onClick handler
 */
export const useMenuItemOnClickDismiss = <T extends React.HTMLAttributes<HTMLElement>>(state: T) => {
  const setOpen = useMenuContext(context => context.setOpen);

  const { onClick: onClickOriginal } = state;
  state.onClick = (e: React.MouseEvent<HTMLElement>) => {
    if (onClickOriginal) {
      onClickOriginal(e);
    }

    setOpen(false);
  };

  return state;
};
