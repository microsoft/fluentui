import type { ToolbarBaseState } from '@fluentui/react-toolbar';

export type {
  ToolbarSlots,
  ToolbarBaseProps as ToolbarProps,
  ToolbarContextValue,
  ToolbarContextValues,
} from '@fluentui/react-toolbar';

export type ToolbarState = ToolbarBaseState & {
  root: {
    /**
     * Data attribute with the component's orientation.
     */
    'data-orientation'?: string;
  };
};
