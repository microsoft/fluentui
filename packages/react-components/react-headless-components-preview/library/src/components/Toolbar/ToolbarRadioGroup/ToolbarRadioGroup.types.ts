import type { ToolbarRadioGroupState as ToolbarRadioGroupBaseState } from '@fluentui/react-toolbar';

export type { ToolbarRadioGroupProps } from '@fluentui/react-toolbar';

export type ToolbarRadioGroupState = ToolbarRadioGroupBaseState & {
  /**
   * Whether the toolbar group is in a vertically oriented toolbar.
   */
  vertical?: boolean;
  root: {
    /**
     * Present when the toolbar radio group is in a vertically oriented toolbar;
     * omitted when it is in a horizontally oriented toolbar.
     */
    'data-vertical'?: string;
  };
};
