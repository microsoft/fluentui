import type {
  MenuBaseProps,
  MenuBaseState,
  MenuContextValue,
  MenuOpenChangeData,
  MenuOpenEvent,
} from '@fluentui/react-menu';

export type MenuProps = MenuBaseProps;
export type MenuState = MenuBaseState;

export type MenuContextValues = {
  menu: MenuContextValue;
};

export type { MenuContextValue, MenuOpenChangeData, MenuOpenEvent };
