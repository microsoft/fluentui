import * as React from 'react';
import { useMenuPopover_unstable } from './useMenuPopover';
import type { MenuPopoverProps } from './MenuPopover.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Popover intended to wrap `MenuList` and adds styling and interaction support specific to menus
 */
export const MenuPopover: ForwardRefComponent<MenuPopoverProps> = React.forwardRef((props, ref) => {
  const [state, render] = useMenuPopover_unstable(props, ref);
  return render(state);
});

MenuPopover.displayName = 'MenuPopover';
