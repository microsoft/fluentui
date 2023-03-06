import * as React from 'react';
import { useMenuPopover_unstable } from './useMenuPopover';
import { useMenuPopoverStyles_unstable } from './useMenuPopoverStyles';
import { renderMenuPopover_unstable } from './renderMenuPopover';
import type { MenuPopoverProps } from './MenuPopover.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHooks_unstable } from '@fluentui/react-shared-contexts';

/**
 * Popover intended to wrap `MenuList` and adds styling and interaction support specific to menus
 */
export const MenuPopover: ForwardRefComponent<MenuPopoverProps> = React.forwardRef((props, ref) => {
  const state = useMenuPopover_unstable(props, ref);

  useMenuPopoverStyles_unstable(state);

  const { useMenuPopoverStyles_unstable: useCustomStyles } = useCustomStyleHooks_unstable();
  useCustomStyles(state);

  return renderMenuPopover_unstable(state);
});

MenuPopover.displayName = 'MenuPopover';
