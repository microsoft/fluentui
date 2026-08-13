import type { ToolbarBaseState } from '@fluentui/react-toolbar';

export type { ToolbarContextValues, ToolbarSlots, ToolbarBaseProps as ToolbarProps } from '@fluentui/react-toolbar';

export type ToolbarState = ToolbarBaseState & {
  root: {
    /**
     * Data attribute set when the toolbar is vertically oriented.
     */
    'data-vertical'?: string;
  };
};
