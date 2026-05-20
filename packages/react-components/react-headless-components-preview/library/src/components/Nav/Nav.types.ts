import type { NavBaseState } from '@fluentui/react-nav';

export type { NavSlots, NavBaseProps as NavProps, OnNavItemSelectData, NavItemValue } from '@fluentui/react-nav';

export type NavState = NavBaseState & {
  root: NavBaseState['root'] & {
    focusgroup?: string;
  };
};
