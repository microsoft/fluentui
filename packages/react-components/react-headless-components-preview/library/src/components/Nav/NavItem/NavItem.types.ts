import type { NavItemBaseState } from '@fluentui/react-nav';

export type { NavItemSlots, NavItemBaseProps as NavItemProps } from '@fluentui/react-nav';

export type NavItemState = NavItemBaseState & {
  root: {
    'data-disabled'?: string;
    'data-selected'?: string;
  };
};
