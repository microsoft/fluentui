import type { ToolbarGroupState as ToolbarGroupBaseState } from '@fluentui/react-toolbar';

export type { ToolbarGroupProps } from '@fluentui/react-toolbar';

export type ToolbarGroupState = ToolbarGroupBaseState & {
  root: {
    /**
     * Present when the toolbar group is in a vertically oriented toolbar;
     * omitted when it is in a horizontally oriented toolbar.
     */
    'data-vertical'?: string;
  };
};
