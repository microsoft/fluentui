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
    /**
     * Forward-compat hint for the WICG `focusgroup` HTML attribute. Currently
     * a no-op in shipping browsers; arrow-key navigation is provided by
     * `useArrowNavigation`.
     */
    focusgroup?: string;
  };
};

export type { MenuListSlots, MenuCheckedValueChangeData, MenuCheckedValueChangeEvent };
