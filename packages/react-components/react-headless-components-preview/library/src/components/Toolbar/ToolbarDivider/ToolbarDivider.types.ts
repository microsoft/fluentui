import type { ToolbarDividerBaseState } from '@fluentui/react-toolbar';

export type { ToolbarDividerBaseProps as ToolbarDividerProps } from '@fluentui/react-toolbar';

export type { DividerSlots as ToolbarDividerSlots } from '@fluentui/react-divider';

export type ToolbarDividerState = ToolbarDividerBaseState & {
  root: {
    /**
     * Data attribute with the component's orientation.
     */
    'data-orientation'?: string;
  };
};
