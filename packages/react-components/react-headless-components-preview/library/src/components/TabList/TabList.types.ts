import type { TabListBaseState } from '@fluentui/react-tabs';

export type { TabListSlots, TabListBaseProps as TabListProps, TabListContextValues } from '@fluentui/react-tabs';

/**
 * TabList component state
 */
export type TabListState = TabListBaseState & {
  root: {
    /**
     * Data attribute set to reflect the orientation of the tab list. Value is 'vertical' or 'horizontal'.
     */
    'data-orientation'?: 'vertical' | 'horizontal';
  };
};
