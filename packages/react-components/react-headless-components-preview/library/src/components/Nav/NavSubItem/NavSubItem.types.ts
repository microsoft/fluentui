import type { NavSubItemBaseState } from '@fluentui/react-nav';

export type { NavSubItemSlots, NavSubItemBaseProps as NavSubItemProps } from '@fluentui/react-nav';

export type NavSubItemState = NavSubItemBaseState & {
  root: {
    'data-selected'?: string;
  };
};
