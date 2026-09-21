import type { MenuItemLinkState as MenuItemLinkBaseState } from '@fluentui/react-menu';

export type { MenuItemLinkSlots, MenuItemLinkProps } from '@fluentui/react-menu';

export type MenuItemLinkState = MenuItemLinkBaseState & {
  root: {
    'data-disabled'?: string;
  };
};
