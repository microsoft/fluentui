export type { MenuItemSlots } from '@fluentui/react-menu';

import type { MenuItemProps as MenuItemBaseProps, MenuItemState as MenuItemBaseState } from '@fluentui/react-menu';

export type MenuItemProps = MenuItemBaseProps;

export type MenuItemState = MenuItemBaseState & {
  root: {
    focusgroupstart?: string;
  };
};
