import type { ToolbarBaseState } from '@fluentui/react-toolbar';

export type { ToolbarSlots, ToolbarBaseProps as ToolbarProps, ToolbarContextValues } from '@fluentui/react-toolbar';

export type ToolbarState = ToolbarBaseState & {
  root: {
    /**
     * Present when the toolbar is vertically oriented; omitted when it is horizontally oriented.
     */
    'data-vertical'?: string;
  };
};
