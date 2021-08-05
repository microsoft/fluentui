import * as React from 'react';
import { useMenuPopover } from './useMenuPopover';
import { useMenuPopoverStyles } from './useMenuPopoverStyles';
import { MenuPopoverProps } from './MenuPopover.types';
import { renderMenuPopover } from './renderMenuPopover';

/**
 * Popover intended to wrap `MenuList` and adds styling and interaction support specific to menus
 */
export const MenuPopover = React.forwardRef<HTMLElement, MenuPopoverProps>((props, ref) => {
  const state = useMenuPopover(props, ref);

  useMenuPopoverStyles(state);
  return renderMenuPopover(state);
});

MenuPopover.displayName = 'MenuPopover';
