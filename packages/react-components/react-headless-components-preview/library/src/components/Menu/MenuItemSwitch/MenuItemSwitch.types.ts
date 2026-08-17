import type {
  MenuItemSwitchProps as MenuItemSwitchBaseProps,
  MenuItemSwitchState as MenuItemSwitchBaseState,
  MenuItemSwitchSlots,
} from '@fluentui/react-menu';

export type { MenuItemSwitchSlots };

export type MenuItemSwitchProps = MenuItemSwitchBaseProps;

export type MenuItemSwitchState = MenuItemSwitchBaseState & {
  root: {
    'data-disabled'?: string;
    'data-checked'?: string;
  };
};
