import type {
  ToolbarSlots as ToolbarBaseSlots,
  ToolbarBaseProps,
  ToolbarContextValues as ToolbarBaseContextValues,
  ToolbarBaseState,
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
     * Data attribute to define the focus behavior of the toolbar's children
     */
    focusgroup?: string;
  };
};

export type ToolbarContextValues = ToolbarBaseContextValues;
