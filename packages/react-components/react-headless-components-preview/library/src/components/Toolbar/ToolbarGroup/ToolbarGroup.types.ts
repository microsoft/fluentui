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
    'data-orientation'?: 'vertical' | 'horizontal';

    /**
     * Data attribute set when the toolbar group is in a vertically oriented toolbar.
     * @deprecated Use `data-orientation` instead. Will be removed in a future release.
     */
    'data-vertical'?: string;
  };
};
