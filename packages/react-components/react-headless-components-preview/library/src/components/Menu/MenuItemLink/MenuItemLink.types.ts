import type {
  MenuItemLinkProps as MenuItemLinkBaseProps,
  MenuItemLinkState as MenuItemLinkBaseState,
  MenuItemLinkSlots,
} from '@fluentui/react-menu';

export type { MenuItemLinkSlots };

export type MenuItemLinkProps = MenuItemLinkBaseProps;

export type MenuItemLinkState = MenuItemLinkBaseState & {
  root: {
    'data-disabled'?: string;
  };
};
