import type { ToolbarGroupState as ToolbarGroupBaseState } from '@fluentui/react-toolbar';

export type { ToolbarGroupProps } from '@fluentui/react-toolbar';

export type ToolbarGroupState = ToolbarGroupBaseState & {
  root: {
    /**
     * Data attribute set when the toolbar group is in a vertically oriented toolbar.
     */
    'data-vertical'?: string;
  };
};
