import type { Slot } from '@fluentui/react-utilities';
import type { ToolbarRadioGroupState as ToolbarRadioGroupBaseState } from '@fluentui/react-toolbar';

export type { ToolbarRadioGroupProps } from '@fluentui/react-toolbar';

export type ToolbarRadioGroupSlots = {
  root: Slot<'div'>;
};

export type ToolbarRadioGroupState = ToolbarRadioGroupBaseState & {
  /**
   * Whether the toolbar group is in a vertically oriented toolbar.
   */
  vertical?: boolean;
  root: {
    /**
     * Data attribute with the orientation of the toolbar the radio group is in.
     */
    'data-orientation'?: string;
  };
};
