import type { NavItemBaseProps, NavItemBaseState } from '@fluentui/react-nav';

export type { NavItemSlots } from '@fluentui/react-nav';

export type NavItemProps = NavItemBaseProps;

export type NavItemState = NavItemBaseState & {
  root: {
    'data-selected'?: string;
  };
};
