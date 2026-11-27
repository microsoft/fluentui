import type { Slot } from '@fluentui/react-utilities';
import type { ToolbarGroupState as ToolbarGroupBaseState } from '@fluentui/react-toolbar';

export type { ToolbarGroupProps } from '@fluentui/react-toolbar';

export type ToolbarGroupSlots = {
  root: Slot<'div'>;
};

export type ToolbarGroupState = ToolbarGroupBaseState & {
  root: {
    /**
     * Data attribute with the component's orientation.
     */
    'data-orientation'?: string;
  };
};
