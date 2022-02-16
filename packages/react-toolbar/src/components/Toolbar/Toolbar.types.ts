import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ToolbarSlots = {
  root: Slot<'div'>;
};

export type ToolbarCommons = {
  // TODO Add things shared between props and state here
  size?: 'small' | 'medium';
};

/**
 * Toolbar Props
 */
export type ToolbarProps = ComponentProps<ToolbarSlots> & ToolbarCommons;

/**
 * State used in rendering Toolbar
 */
export type ToolbarState = ComponentState<ToolbarSlots> & ToolbarCommons;

export type ToolbarContextValue = {
  size: ToolbarProps['size'];
};

export type ToolbarContextValues = {
  toolbar: ToolbarContextValue;
};
