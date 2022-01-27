import type { ComponentProps, ComponentState, IntrinsicSlotProps } from '@fluentui/react-utilities';

export type MenuSplitGroupSlots = {
  root: IntrinsicSlotProps<'div'>;
};

export type MenuSplitGroupCommons = {};

/**
 * MenuSplitGroup Props
 */
export type MenuSplitGroupProps = ComponentProps<MenuSplitGroupSlots> & MenuSplitGroupCommons;

/**
 * State used in rendering MenuSplitGroup
 */
export type MenuSplitGroupState = ComponentState<MenuSplitGroupSlots> & MenuSplitGroupCommons;
