import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type MenuSplitGroupSlots = {
  root: Slot<'div'>;
};

export type MenuSplitGroupCommonsUnstable = {};

/**
 * MenuSplitGroup Props
 */
export type MenuSplitGroupProps = ComponentProps<MenuSplitGroupSlots> & MenuSplitGroupCommonsUnstable;

/**
 * State used in rendering MenuSplitGroup
 */
export type MenuSplitGroupState = ComponentState<MenuSplitGroupSlots> & MenuSplitGroupCommonsUnstable;
