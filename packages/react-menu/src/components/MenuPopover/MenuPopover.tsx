import * as React from 'react';
import { useMenuPopover } from './useMenuPopover';
import { useMenuPopoverStyles } from './useMenuPopoverStyles';
import { renderMenuPopover } from './renderMenuPopover';
import type { MenuPopoverProps } from './MenuPopover.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Popover intended to wrap `MenuList` and adds styling and interaction support specific to menus
 */
export const MenuPopover: ForwardRefComponent<MenuPopoverProps> = React.forwardRef((props, ref) => {
  const state = useMenuPopover(props, ref);

  useMenuPopoverStyles(state);
  return renderMenuPopover(state);
});

MenuPopover.displayName = 'MenuPopover';
