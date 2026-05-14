import type {
  ToolbarGroupProps as ToolbarGroupBaseProps,
  ToolbarGroupState as ToolbarGroupBaseState,
} from '@fluentui/react-toolbar';

export type ToolbarGroupProps = ToolbarGroupBaseProps;

export type ToolbarGroupState = ToolbarGroupBaseState & {
  root: {
    /**
     * Data attribute set when the toolbar group is in a vertically oriented toolbar.
     */
    'data-vertical'?: string;
  };
};
