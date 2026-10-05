import type { MenuItemSwitchState as MenuItemSwitchBaseState } from '@fluentui/react-menu';

export type { MenuItemSwitchSlots, MenuItemSwitchProps } from '@fluentui/react-menu';

export type MenuItemSwitchState = MenuItemSwitchBaseState & {
  root: {
    'data-disabled'?: string;
    'data-checked'?: string;
  };
};
