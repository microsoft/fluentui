import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ToolbarSlots = {
  root: Slot<'div'>;
};

type ToolbarCommons = {
  // TODO Add things shared between props and state here
};

/**
 * Toolbar Props
 */
export type ToolbarProps = ComponentProps<ToolbarSlots> & ToolbarCommons;

/**
 * State used in rendering Toolbar
 */
export type ToolbarState = ComponentState<ToolbarSlots> & ToolbarCommons;
