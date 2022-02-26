import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ToolbarDividerSlots = {
  root: NonNullable<Slot<'div'>>;
};

type ToolbarDividerCommons = {
  // TODO Add things shared between props and state here
};

/**
 * ToolbarDivider Props
 */
export type ToolbarDividerProps = ComponentProps<ToolbarDividerSlots> & ToolbarDividerCommons;

/**
 * State used in rendering ToolbarDivider
 */
export type ToolbarDividerState = ComponentState<ToolbarDividerSlots> & ToolbarDividerCommons;
