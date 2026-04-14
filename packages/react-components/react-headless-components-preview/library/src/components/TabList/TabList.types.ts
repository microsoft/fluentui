import type {
  TabListSlots as TabListBaseSlots,
  TabListBaseProps,
  TabListBaseState,
  TabListContextValues as TabListContextValuesBase,
} from '@fluentui/react-tabs';

/**
 * TabList component slots
 */
export type TabListSlots = TabListBaseSlots;

/**
 * TabList component props
 */
export type TabListProps = TabListBaseProps;

/**
 * TabList component state
 */
export type TabListState = TabListBaseState & {
  root: {
    focusgroup?: string;
  };
};

/**
 * TabList component context values
 */
export type TabListContextValues = TabListContextValuesBase;
