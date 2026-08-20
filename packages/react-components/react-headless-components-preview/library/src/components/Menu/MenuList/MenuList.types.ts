import type { MenuListState as MenuListBaseState } from '@fluentui/react-menu';

export type {
  MenuListProps,
  MenuListSlots,
  MenuCheckedValueChangeData,
  MenuCheckedValueChangeEvent,
} from '@fluentui/react-menu';

export type MenuListState = MenuListBaseState & {
  root: {
    focusgroup?: string;
  };
};
