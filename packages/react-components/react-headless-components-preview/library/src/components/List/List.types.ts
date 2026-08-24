import type { ListState as ListBaseState, ListNavigationMode } from '@fluentui/react-list';

export type {
  ListSlots,
  ListProps,
  ListContextValues,
  ListNavigationMode,
  OnListSelectionChangeData,
  ListContextValue,
} from '@fluentui/react-list';

export type ListState = ListBaseState & {
  root: {
    /**
     * Data attribute reflecting the navigation mode. Value is `items` or `composite`, and the
     * attribute is absent when no navigation mode is set.
     */
    'data-navigation-mode'?: ListNavigationMode;
    /**
     * Data attribute set when the list manages selection for its items.
     */
    'data-selectable'?: string;
  };
};
