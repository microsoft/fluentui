import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type MenuSplitGroupSlots = {
  root: Slot<'div'>;
};

type MenuSplitGroupCommons = {};

/**
 * MenuSplitGroup Props
 */
export type MenuSplitGroupProps = ComponentProps<MenuSplitGroupSlots> & MenuSplitGroupCommons;

/**
 * State used in rendering MenuSplitGroup
 */
export type MenuSplitGroupState = ComponentState<MenuSplitGroupSlots> & MenuSplitGroupCommons;
