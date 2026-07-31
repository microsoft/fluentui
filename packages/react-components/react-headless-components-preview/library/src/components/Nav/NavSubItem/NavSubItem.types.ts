import type { NavSubItemBaseProps, NavSubItemBaseState } from '@fluentui/react-nav';

export type { NavSubItemSlots } from '@fluentui/react-nav';

export type NavSubItemProps = NavSubItemBaseProps;

export type NavSubItemState = NavSubItemBaseState & {
  root: {
    'data-selected'?: string;
  };
};
