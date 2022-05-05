import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ToolbarRadioSlots = {
  root: Slot<'div'>;
};

type ToolbarRadioCommons = {
  // TODO Add things shared between props and state here
};

/**
 * ToolbarRadio Props
 */
export type ToolbarRadioProps = ComponentProps<ToolbarRadioSlots> & ToolbarRadioCommons;

/**
 * State used in rendering ToolbarRadio
 */
export type ToolbarRadioState = ComponentState<ToolbarRadioSlots> & ToolbarRadioCommons;
