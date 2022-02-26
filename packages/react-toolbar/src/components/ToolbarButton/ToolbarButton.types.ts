import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ToolbarButtonSlots = {
  root: Slot<'div'>;
};

type ToolbarButtonCommons = {
  // TODO Add things shared between props and state here
};

/**
 * ToolbarButton Props
 */
export type ToolbarButtonProps = ComponentProps<ToolbarButtonSlots> & ToolbarButtonCommons;

/**
 * State used in rendering ToolbarButton
 */
export type ToolbarButtonState = ComponentState<ToolbarButtonSlots> & ToolbarButtonCommons;
