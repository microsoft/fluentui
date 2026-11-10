import type { ToolbarDividerBaseState } from '@fluentui/react-toolbar';

export type { ToolbarDividerBaseProps as ToolbarDividerProps } from '@fluentui/react-toolbar';

export type { DividerSlots as ToolbarDividerSlots } from '@fluentui/react-divider';

export type ToolbarDividerState = ToolbarDividerBaseState & {
  root: {
    /**
     * Data attribute reflecting the actual orientation of the divider element.
     * Note: the toolbar divider's orientation is inverted relative to the toolbar's orientation.
     */
    'data-vertical'?: string;
  };
};
