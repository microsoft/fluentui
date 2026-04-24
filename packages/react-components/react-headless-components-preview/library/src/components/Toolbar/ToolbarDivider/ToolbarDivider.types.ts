import type { ToolbarDividerBaseProps, ToolbarDividerBaseState } from '@fluentui/react-toolbar';

export type ToolbarDividerProps = ToolbarDividerBaseProps;

export type ToolbarDividerState = ToolbarDividerBaseState & {
  root: {
    /**
     * Data attribute reflecting the actual orientation of the divider element.
     * Note: the toolbar divider's orientation is inverted relative to the toolbar's orientation.
     */
    'data-vertical'?: string;
  };
};
