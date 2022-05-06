import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ToolbarRadioGroupSlots = {
  root: Slot<'div'>;
};

type ToolbarRadioGroupCommons = {
  // TODO Add things shared between props and state here
};

/**
 * ToolbarRadioGroup Props
 */
export type ToolbarRadioGroupProps = ComponentProps<ToolbarRadioGroupSlots> & ToolbarRadioGroupCommons;

/**
 * State used in rendering ToolbarRadioGroup
 */
export type ToolbarRadioGroupState = ComponentState<ToolbarRadioGroupSlots> & ToolbarRadioGroupCommons;
