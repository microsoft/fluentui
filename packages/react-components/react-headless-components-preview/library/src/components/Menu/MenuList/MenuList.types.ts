import type {
  MenuListSlots,
  MenuListState as MenuListBaseState,
  MenuCheckedValueChangeData,
  MenuCheckedValueChangeEvent,
} from '@fluentui/react-menu';

export type { MenuListProps } from '@fluentui/react-menu';

export type MenuListState = MenuListBaseState & {
  root: {
    focusgroup?: string;
  };
};

export type { MenuListSlots, MenuCheckedValueChangeData, MenuCheckedValueChangeEvent };
