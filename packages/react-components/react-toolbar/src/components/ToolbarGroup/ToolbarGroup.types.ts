import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ToolbarGroupSlots = {
  root: Slot<'div'>;
};

/**
 * ToolbarButton Props
 */
export type ToolbarGroupProps = ComponentProps<ToolbarGroupSlots>;

/**
 * State used in rendering ToolbarButton
 */
export type ToolbarGroupState = ComponentState<ToolbarGroupSlots>;
