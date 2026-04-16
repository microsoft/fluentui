import type {
  ToolbarSlots as ToolbarBaseSlots,
  ToolbarProps as ToolbarBaseProps,
  ToolbarContextValues as ToolbarBaseContextValues,
  ToolbarState as ToolbarBaseState,
} from '@fluentui/react-toolbar';

export type ToolbarSlots = ToolbarBaseSlots;

export type ToolbarProps = ToolbarBaseProps;

export type ToolbarState = ToolbarBaseState & {
  root: {
    /**
     * Data attribute set when the toolbar is vertically oriented.
     */
    'data-vertical'?: string;
    /**
     * Data attribute reflecting the current size of the toolbar. Value is 'small', 'medium', or 'large'.
     */
    'data-size'?: string;
  };
};

export type ToolbarContextValues = ToolbarBaseContextValues;
