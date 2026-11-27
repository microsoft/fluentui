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
    'data-orientation'?: 'vertical' | 'horizontal';

    /**
     * Data attribute set when the toolbar is vertically oriented.
     * @deprecated Use `data-orientation` instead. Will be removed in a future release.
     */
    'data-vertical'?: string;
  };
};
