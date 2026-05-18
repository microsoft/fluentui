import type {
  MenuListProps as MenuListBaseProps,
  MenuListSlots,
  MenuListState as MenuListBaseState,
  MenuCheckedValueChangeData,
  MenuCheckedValueChangeEvent,
} from '@fluentui/react-menu';

export type MenuListProps = MenuListBaseProps;

export type MenuListState = MenuListBaseState & {
  root: {
    focusgroup?: string;
  };
};

export type { MenuListSlots, MenuCheckedValueChangeData, MenuCheckedValueChangeEvent };
