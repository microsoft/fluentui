import type { ToolbarDividerBaseState } from '@fluentui/react-toolbar';

export type { ToolbarDividerBaseProps as ToolbarDividerProps } from '@fluentui/react-toolbar';

export type ToolbarDividerState = ToolbarDividerBaseState & {
  root: {
    /**
     * Present when the divider is vertically oriented (in a horizontally oriented toolbar);
     * omitted when the divider is horizontally oriented (in a vertically oriented toolbar).
     */
    'data-vertical'?: string;
  };
};
