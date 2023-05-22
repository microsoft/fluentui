import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ToolbarGroupSlots = {
  root: NonNullable<Slot<'div'>>;
};

/**
 * ToolbarButton Props
 */
export type ToolbarGroupProps = ComponentProps<Partial<ToolbarGroupSlots>>;

/**
 * State used in rendering ToolbarButton
 */
export type ToolbarGroupState = ComponentState<ToolbarGroupSlots>;
