import type { ToolbarRadioGroupState as ToolbarRadioGroupBaseState } from '@fluentui/react-toolbar';

export type { ToolbarRadioGroupProps } from '@fluentui/react-toolbar';

export type ToolbarRadioGroupState = ToolbarRadioGroupBaseState & {
  /**
   * Whether the toolbar group is in a vertically oriented toolbar.
   */
  vertical?: boolean;
  root: {
    /**
     * Data attribute set when the toolbar radio group is in a vertically oriented toolbar.
     */
    'data-vertical'?: string;
  };
};
