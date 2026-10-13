export type { MenuItemSlots, MenuItemProps } from '@fluentui/react-menu';

import type { MenuItemState as MenuItemBaseState } from '@fluentui/react-menu';

export type MenuItemState = MenuItemBaseState & {
  root: {
    'data-disabled'?: string;
    'data-has-submenu'?: string;
    'data-submenu-open'?: string;
  };
};
