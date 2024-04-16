import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type MenuSplitGroupSlots = {
  root: Slot<'div'>;
};

/**
 * MenuSplitGroup Props
 */
export type MenuSplitGroupProps = ComponentProps<MenuSplitGroupSlots>;

/**
 * State used in rendering MenuSplitGroup
 */
export type MenuSplitGroupState = ComponentState<MenuSplitGroupSlots>;
