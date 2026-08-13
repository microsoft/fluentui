export type { MenuItemSlots } from '@fluentui/react-menu';

import type { MenuItemProps as MenuItemBaseProps, MenuItemState as MenuItemBaseState } from '@fluentui/react-menu';

export type MenuItemProps = MenuItemBaseProps;

export type MenuItemState = MenuItemBaseState & {
  root: {
    'data-disabled'?: string;
    'data-has-submenu'?: string;
    'data-submenu-open'?: string;
  };
};
