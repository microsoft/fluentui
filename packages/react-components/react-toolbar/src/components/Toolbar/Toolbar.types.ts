import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ToolbarSlots = {
  root: Slot<'div'>;
};

/**
 * Toolbar Props
 */
export type ToolbarProps = ComponentProps<ToolbarSlots> & {
  /**
   * Toolbar can have small or medium size
   *
   * @default medium
   */
  size?: 'small' | 'medium';
};

/**
 * State used in rendering Toolbar
 */
export type ToolbarState = ComponentState<ToolbarSlots> & Required<Pick<ToolbarProps, 'size'>>;

export type ToolbarContextValue = {
  size: ToolbarProps['size'];
};

export type ToolbarContextValues = {
  toolbar: ToolbarContextValue;
};
