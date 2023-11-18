import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ToolbarRadioGroupSlots = {
  root: Slot<'div'>;
};

/**
 * ToolbarButton Props
 */
export type ToolbarRadioGroupProps = ComponentProps<ToolbarRadioGroupSlots>;

/**
 * State used in rendering ToolbarButton
 */
export type ToolbarRadioGroupState = ComponentState<ToolbarRadioGroupSlots>;
