import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ToolbarRadioGroupSlots = {
  root: NonNullable<Slot<'div'>>;
};

/**
 * ToolbarButton Props
 */
export type ToolbarRadioGroupProps = ComponentProps<Partial<ToolbarRadioGroupSlots>>;

/**
 * State used in rendering ToolbarButton
 */
export type ToolbarRadioGroupState = ComponentState<ToolbarRadioGroupSlots>;
