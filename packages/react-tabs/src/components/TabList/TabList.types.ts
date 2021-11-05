import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';

export type TabListSlots = {
  // TODO Add slots here and to tabListShorthandProps in useTabList.ts
  root: IntrinsicShorthandProps<'div'>;
};

export type TabListCommons = {
  // TODO Add things shared between props and state here
};

/**
 * TabList Props
 */
export type TabListProps = ComponentProps<TabListSlots> & TabListCommons;

/**
 * State used in rendering TabList
 */
export type TabListState = ComponentState<TabListSlots> & TabListCommons;
